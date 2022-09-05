import scripts.utils.files as files
import pandas as pd
import numpy as np
import requests
import os
from dotenv import dotenv_values

import scripts.utils.databaseUtils as databaseUtils

appDir = os.getcwd()
config = dotenv_values('.env')

#import pymongo
#from pymongo import MongoClient

#client = MongoClient()#'mongodb://localhost:27018/')
#db = client['vic_properties']
#price_data = db['price_data']
#loc_data = db['loc_data']
raw_data = db['raw_data']

flagged = []
def call(suburb: str = 'mount_eliza',
     calltype: str = 'dist') -> dict:
  if calltype == 'loc-google':
    resp = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?address={suburb}+victoria+australia&key={config["GOOGLE_MAPS_API_KEY"]}')
  elif calltype == 'dist':
    resp = requests.get(f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={suburb}+victoria+australia&destinations=melbourne+victoria+australia&key={config["GOOGLE_MAPS_API_KEY"]}')
    txt = resp.json() #<-----------Broke here, probably a bad suburb
  return txt

def parseCall(struct, loccall):
  dic = {
    'suburb': '',
    'faddr': '',
    'coords': '',
    'postcode': '',
    'shire': '',
  }

  if struct == 'google':
    try:
      for section in loccall['results'][0]['address_components']:
        if 'locality' in section['types']:
          dic['suburb'] = section['long_name'].replace(' ','-').lower()
      dic['faddr'] = loccall['results'][0]['address_components'][0]['long_name']
      dic['coords'] = loccall['results'][0]['geometry']['location']
    except:
      print(f'ERROR RAISED, name/coords, goog')
    try:
      dic['postcode'] = loccall['results'][0]['address_components'][4]['long_name']
      dic['shire'] = loccall['results'][0]['address_components'][1]['long_name']
    except:
      print(f'ERROR RAISED, postcode/shire, goog')
      postcode, shire = None, None
  else:
    try:
      dic['suburb'] = loccall['data'][0]['locality'].replace(' ','-').lower()
      dic['faddr'] = loccall['data'][0]['locality']
      dic['coords'] = {'lat': loccall['data'][0]['latitude'], 'lng': loccall['data'][0]['latitude']}
    except IndexError as e:
      print(f'ERROR RAISED name/coords')
    try:
      dic['postcode'] = loccall['data'][0]['postal_code']
      dic['shire'] = loccall['data'][0]['county']
    except:
      print(f'ERROR RAISED postcode/shire')
      postcode, shire = None, None
  return dic

def df_upload(df, date):  
  global flagged
  if 'Unnamed: 0' in df.columns.values:
    df = df.drop(['Unnamed: 0'], axis=1)
  #print(df.columns.values)
  #test = ['melbourne']
  #for i in test:
  for i in df.columns.values:
    print(i)
    loccall = call(i,'loc')
    if not loccall:
      continue
    nums = df[i]
    try:
      suburbDetails = parseCall('', loccall)
      suburb = suburbDetails['suburb'].replace('_','-')
    except:
      continue
    invalidNumsLarge = nums < 99000000
    nums = nums[invalidNumsLarge]
    invalidNumsSmall = nums > 9900
    nums = nums[invalidNumsSmall]
    mean = (np.nanmean(nums))
    std = (np.nanstd(nums))
    if np.isnan(mean) or mean == 0:
      continue
    mean = int(mean)
    std = int(std)
    if databaseUtils.price_data.find({'suburb': suburb}).count() == 0:
      faddr = suburbDetails['faddr']
      coords = suburbDetails['coords']

      l_mean, l_stds, l_datekey, l_freq = [],[],[],[]
      l_mean.append(mean)
      l_stds.append(std)
      l_datekey.append(date)
      l_freq.append(int(df[i].count()))
      price_dic = {
        'suburb': suburb,
          'pricedata': {
            'means': l_mean,
            'stds': l_stds,
            'datekey': l_datekey,
            'mean_means': int(mean),
            'mean_stds': int(std),
            'count': int(1),
            'frequency': l_freq
          }
      }
      databaseUtils.price_data.insert_one(price_dic)

    else:
      #old_values_cursor = price_data.find({'suburb': i})
      #for result in old_values_cursor:
      #  old_values = result
      try:
        distcc = [i['locdata']['distcc'] for i in databaseUtils.loc_data.find({'suburb': suburb})][0]
      except:
        distcc = 100000
        print(f'SUBURB {suburb} FLAGGED')
        flagged.append([date, suburb])
        continue
      old_values = databaseUtils.price_data.find_one({'suburb': suburb})

      if date in old_values['pricedata']['datekey']:
        continue
      l_datekey = old_values['pricedata']['datekey']
      l_datekey.append(date)
      l_mean = old_values['pricedata']['means']
      l_mean.append(int(mean))
      newmean = int((old_values['pricedata']['mean_means'] + mean)/2)
      x = np.array(range(len(l_mean)))
      mean_grad = list(np.polyfit(x, l_mean, 1))
      newstd = int((old_values['pricedata']['mean_stds'] + std)/2)

      l_stds = old_values['pricedata']['stds']
      l_stds.append(int(std))
      
      std_grad = list(np.polyfit(x, l_stds, 1))
      l_freq = old_values['pricedata']['frequency']
      l_freq.append(int(df[i].count()))
      i_count = int(old_values['pricedata']['count']) + 1
      q_param = {'suburb': i}
      new_values = { '$set': 
        {
          'pricedata': {
            'mean_means': newmean,
            'mean_stds': newstd,
            'datekey': l_datekey,
            'means': l_mean,
            'stds': l_stds,
            'count': int(i_count),
            'frequency': l_freq,
            'mean_gradient': mean_grad,
            'std_gradient': std_grad,
            'desirability': 1/(newmean/(distcc+0.001))
          }  
        }
      }
      databaseUtils.price_data.update_one(q_param, new_values)

def batch():
  dates = files.list_files(f'{appDir}/static/downloads/prop_data/')
  for dfile in dates[1:]:
  #for dfile in [dates[2]]:
    date = dfile[:10]
    df = pd.read_csv(f'{appDir}/static/downloads/prop_data/{date}_raw_data.csv')
    df_upload(df, date)
    print(f'{dfile} successfully added')

if __name__ == '__main__':
    #df = pd.read_csv(f'../prop_data/2021-07-06_raw_data.csv')
    #df_upload(df, '2021-07-06')
    batch()
