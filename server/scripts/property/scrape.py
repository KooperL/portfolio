#pip3 install beautifulsoup4
#pip3 install requests
#https://realpython.com/beautiful-soup-web-scraper-python/

import requests
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import pandas as pd
import numpy as np
import datetime
import re

import file_upload
##url = 'https://www.realestate.com.au/buy/in-vic/list-1' 

page = 1
dic = {}
upload_dic = {}
max_len = 1

def price_parse(rawprice):
  price = ''
  if '$' not in rawprice:
    return
  if 'million' in rawprice.lower():
    rawprice.replace('million','000000')
  elif 'm' in rawprice.lower():
    rawprice.replace('m','000000')
  if '-' or 'to' in rawprice or '':
    temp = re.split('-|to', rawprice)
    final = []
    for ia in temp:
      this = ''.join(dig for dig in ia if dig.isdigit())
      try:
        final.append(int(this))
      except ValueError:
        continue
    return np.mean(final)
  else:
    return ''.join(dig for dig in rawprice if dig.isdigit())

while page != 82:
  print('Page: {}'.format(page))
  url = 'https://www.property.com.au/buy/in-vic/list-{}'.format(page)
  client = Request(url, headers={'User-Agent': 'Chrome/81.0.4044.138'})
  raw_html = urlopen(client).read()
  soup = BeautifulSoup(raw_html, 'html.parser') 
  container = soup.find('div', {'id':'searchResultsTbl'})
  items = container.findAll('div', {'class':'resultBody'})
  
  for item in items:
    rawprice = item.find('div', {'class': 'propertyStats'}).p.span.text
    price = price_parse(rawprice)
    if not price:
      continue
    if int(price) > 99000000:
      continue
    if int(price) < 9000:
      continue
    
    location = item.find('div', {'class': 'portalLinks'}).p.a.text
    loccall = file_upload.parseCall('google',file_upload.call(location, 'loc-google'))
    #print(location)
    try:
      for i in loccall['results'][0]['address_components']:
        if 'locality' in i['types']:
          suburb = i['long_name']
          suburb = suburb.replace(' ','-').lower()
      # suburb = loccall['data'][0]['locality'].replace(' ','-').lower()

      #print(price, ', ', suburb)
    except IndexError:
      continue

    if suburb in dic.keys():
      dic[suburb].append(price)
      this_len = len(dic[suburb])
      if this_len>max_len:
        max_len = this_len
    else:
       dic[suburb] = [price]
  
  page += 1

  ## Padding
for i in dic.keys():
  this_len = len(dic[i])
  if this_len < max_len:
    [dic[i].append(np.nan) for _ in range(0, max_len-this_len)]

df = pd.DataFrame(dic)

date = str(datetime.date.today())
rawname = date + '_raw_data.csv'

df.to_csv(r'/var/www/app/static/downloads/prop_data/{}'.format(rawname), index=None)
df.to_csv(r'/var/www/app/property/prop_data/{}'.format(rawname), index=None)

file_upload.df_upload(df, date)
