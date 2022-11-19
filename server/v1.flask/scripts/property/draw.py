#import pymongo
#from pymongo import MongoClient
from itertools import count
import pandas as pd
import datetime
import numpy as np
import numpy.polynomial.polynomial as poly
from heapq import nlargest
import math
import matplotlib.pyplot as plt
from scipy.stats import sem
import scripts.utils.databaseUtils as databaseUtils
import scripts.property.stats as stats


def highest_des(num=5):
  rankedSuburbs = []
  for i in databaseUtils.price_data.find({ 'pricedata.desirability': { '$exists': True } }).sort('pricedata.desirability',-1).limit(num):
    rankedSuburbs.append({
      'suburb': i['suburb'],
      'meanMeans': i['pricedata']['mean_means'],
      'distcc': [a['locdata']['distcc'] for a in databaseUtils.loc_data.find({'suburb''':i['suburb']})][0],
      'count': i['pricedata']['count'],
      'meanGradient': int(i['pricedata']['mean_gradient'][0]),
      'desirability': round(i['pricedata']['desirability'],3)
    })
  return rankedSuburbs

def state_stats():
  data = [result['pricedata']['mean_means'] for result in databaseUtils.price_data.find({},{'pricedata':1})]
  median = np.median(data)
  Q1 = np.percentile(data, 25, interpolation = 'midpoint')
  Q3 = np.percentile(data, 75, interpolation = 'midpoint')
  IQR = Q3 - Q1
  values = {
    'Min': int(min(data)),
    'Q1': int(Q1),
    'median': int(median),
    'Q3': int(Q3),
    'Max': int(max(data)),
    'IQR': int(IQR)
  }
  return values

def query_sub(suburb: str) -> list:
  if databaseUtils.price_data.find({'suburb': suburb}).count() == 0:
    raise RuntimeError('No suburb found')

  result = None
  for cursor in databaseUtils.price_data.find({'suburb': suburb}):
    result = cursor

  means = result['pricedata']['means']
  stds = result['pricedata']['stds']
  dates = result['pricedata']['datekey']
  mmean_values = result['pricedata']['mean_means']
  mstd_values = int(sem(stds))
  count = result['pricedata']['count']
  try:
    std_grad = result['pricedata']['mean_gradient']
    gradient = result['pricedata']['mean_gradient']
    desirability = round(result['pricedata']['desirability'],3)
  except:
    std_grad = [0,0]
    gradient = [0,0]
    desirability = None

  raw_dates = map(lambda x: datetime.datetime.strptime(x, "%Y-%m-%d"), dates)
  datekey = zip(raw_dates,means)
  sorted_dates = sorted(datekey, key=lambda x: x[0])
  sorted_dates = [list(x) for x in sorted_dates]
  for a,i in enumerate(sorted_dates):
    temp = i[0].strftime('%Y-%m-%d')
    sorted_dates[a][0] = temp

  distcc = None
  for cursor in databaseUtils.loc_data.find({'suburb': suburb}):
    distcc = cursor['locdata']['distcc']

  values = {
    'mean': mmean_values,
    'distance': distcc,
    'spread': mstd_values,
    'listingsCaptured': count,
    'linearGradient': int(gradient[0]),
    'desirability': desirability
  }
  return values

'''
def hist_recent(df):
  step = 50000
  price_bins = {}
  #for i in range(0,int(df.max(axis=1)[1]),step):
  for i in range(0,1500000,step):
    price_bins[i] = []
  for bin in price_bins:
    for suburb in df.columns[:-1]:
      if ((int(bin)-step)<int(df[suburb].values)<=int(bin)):
        price_bins[bin].append(suburb)
  counts = []
  for bin in price_bins:
    counts.append(len(price_bins[bin]))
  bins = []
  for bin in list(price_bins.keys()):
    bins.append(str(bin))
  fig, ax = plt.subplots()
  ax.bar(bins, counts)
  myLocator = mticker.MultipleLocator(5)
  ax.xaxis.set_major_locator(myLocator)
  plt.ylabel('Frequency')
  plt.xlabel('Price ($)')
  plt.xticks(rotation=15)
  plt.title('Freq. dist. of current listing prices')
  plt.gcf().subplots_adjust(bottom=0.15)
  plt.xlim(0, 1500000)
  #plt.show()
  plt.savefig(f'/var/www/app/static/images/prop_data/prop_gen_hist.jpg')
  ##int_list = []
  ##[int_list.append(int(i)) for i in list(df.values[0])[:-1]]
  ##fig, ax = plt.subplots()
  ##ax.hist(int_list)
  ##myLocator = mticker.MultipleLocator(500000)
  ##ax.xaxis.set_major_locator(myLocator)
  ##plt.show()


def histogram():
  means = mean_data.find_one()
  old_means = np.array([])
  new_means = np.array([])
  bins = range(50000,1500000,50000)
  del means['_id']
  del means['date_index']
  del means['data_type']
  for sub in means:
    old = means[sub][0]
    new = means[sub][:-3]
    try:
      if not 50000<int(old)<1500000 and 50000<int(new)<1500000: continue
    except:
      continue
    old_means = np.append(old_means, old)
    new_means = np.append(new_means, new)
  fig, ax = plt.subplots()
  ax.hist(old_means, bins, alpha=0.5, label='Old', color='grey')
  ax.hist(new_means, bins, alpha=0.5, label='New', color='black')
  #myLocator = mticker.MultipleLocator(5)
  #ax.xaxis.set_major_locator(myLocator)
  plt.legend(loc='upper right')
  plt.ylabel('Frequency')
  plt.xlabel('Mean Price ($AUD)')
  plt.xticks(rotation=15)
  plt.title('Freq. dist. of current listing prices')
  plt.gcf().subplots_adjust(bottom=0.15)
  plt.savefig(f'/var/www/app/static/images/prop_data/prop_hist.jpg')

def prop_regress():
  #sns.regplot(x="id", y="pulse" ,data=data)
  means = mean_data.find_one()
  del means['_id']
  del means['date_index']
  del means['data_type']
  mindist = int(locdata.distcc[min(locdata.distcc)])
  maxdist = int(locdata.distcc[max(locdata.distcc)])
  x = range(mindist,maxdist)
  combined_values = np.empty([len(locdata.distcc),2])
  for index,sub in enumerate(locdata.distcc):
    try:
      combined_values[index][0] = int(np.nanmean(means[sub]))
    except:
      combined_values[index][0] = np.nan
    combined_values[index][1] = locdata.distcc[sub]
    delete_track = 0
    for ia,i in enumerate(combined_values):
      try:
        int(i[0] + int(i[1]))
      #if not i[0].isdigit() or i[1].isdigit():#if 0 in np.isfinite(i):
      except:
        combined_values = np.delete(combined_values,ia-delete_track,0)
        delete_track += 1
      kmeans = KMeans(n_clusters=4)
      kmeans.fit(combined_values)
      centroids = kmeans.cluster_centers_
      label = kmeans.labels_
      colours = ['g.','r.','b.','k.']
      for ia,i in enumerate(combined_values):
        plt.plot(i[1], i[0], colours[label[ia]])
      plt.scatter(centroids[:,1], centroids[:,0])
      cluster_data = {
        0:[],
        1:[],
        2:[],
        3:[]}
      for ia,i in enumerate(combined_values):
        cluster_data[label[ia]].append(i)
      for ia,i in enumerate(cluster_data):
        values = cluster_data[i]
        X,Y=[],[]
        for ib in values:
          X.append(int(ib[0]))
          Y.append(int(ib[1]))
        x = list(range(min(X),max(X),1500))
        m,c = np.polyfit(X, Y, 1)
        y = list(map(lambda x:(x*m)+c, x))
        plt.plot(y, x, colours[ia], label=f'Cluster: {ia}')
      plt.legend(loc='upper right')
      plt.xlim(0, 350000)
      plt.ylim(0, 1500000)
      plt.ylabel('p mean Price ($AUD)')
      plt.xlabel('Dist. from city center (m)')
      plt.savefig(f'/var/www/app/static/images/prop_data/prop_datapoints.jpg')
'''
if __name__ =='__main__':
  query_sub('melbourne')
