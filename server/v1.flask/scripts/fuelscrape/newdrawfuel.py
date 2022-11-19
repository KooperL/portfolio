import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import numpy as np
from scipy.optimize import leastsq, curve_fit
from sklearn import preprocessing, svm, model_selection
#from sklearn.model_selection import cross_validate
import os
from sklearn.linear_model import LinearRegression


def table():
  fairp = 125.0
  conn = sqlite3.connect(f'{os.getcwd()}/../data/database.db')
  rows = list(conn.execute(f'SELECT * FROM fuelpricesDB ORDER BY id DESC LIMIT 3'))
  maxp = rows[0][0]
  minp = rows[0][2]
  averagep = rows[0][4]
  rgood = ((int(minp)+int(maxp))/2)/averagep
  m = (averagep-rows[2][4])/(3-1)
  appeal = 0
  appeal += 3*(rgood>1)
  appeal += 3*(m>0)
  appeal += 4*(averagep<fairp)
  buy = f'{"Buy"*(appeal>6)}{"Wait"*(appeal<=6)}'
  values = [averagep, (f'Relatively {"good"*(rgood>1)}{"bad"*(rgood<=1)}'), (f'{"Un"*(averagep>fairp)}fairly priced'), (f'{"Ascending"*(m>0)}{"Descending"*(m<=0)}'),buy]
  return values


def draw(*args):
  conn = sqlite3.connect(f'{os.getcwd()}/../data/database.db')
  rows = conn.execute(f'SELECT * FROM fuelpricesDB ORDER BY id DESC LIMIT {args[0]}')
  draw.df = {
      'date':[],
      'minp':[],
      'maxp' :[],
      'averagep':[],
      'wholesalep':[],}
  for row in rows:
    dateobj = datetime.strptime(row[1], "%Y-%m-%d %H:%M:%S.%f")
    parseddate = f'{dateobj.date()} {dateobj.hour}'
    draw.df['date'].insert(0,parseddate)
    draw.df['minp'].insert(0,row[2])
    draw.df['maxp'].insert(0,row[3])
    draw.df['averagep'].insert(0,row[4])
    draw.df['wholesalep'].insert(0,row[5])
  
  if args[3] == 'averagep' and len(args) == 5:
    plt.plot(draw.df['date'], draw.df['averagep'], color='green', label='average', linestyle='solid')
    test_prices = conn.execute(f'SELECT averageprice FROM fuelpricesDB ORDER BY id DESC LIMIT 1000')
    test_data = []
    for i in test_prices:
      test_data.append(float(i[0]))
    g = 10
    x = list(draw.df['date'])
    X = np.array(range(len(test_data)))
    y = test_data[::-1]
    #y = preprocessing.scale(y)
    x_train, x_test, y_train, y_test = model_selection.train_test_split(X,y,test_size=0.1)
    #clf = LinearRegression()
    clf = svm.SVR(kernel='rbf', C=100, gamma=0.1, epsilon=.1)
    clf.fit(x_train.reshape(-1, 1),y_train)
    accuracy = clf.score(x_test.reshape(-1,1), y_test)
    forecast_x = np.array(range(X[-1]+1, X[-1]+1+g))
    forecast_y = clf.predict(forecast_x.reshape(-1,1))
    #plt.plot(list(range(len(x),len(x)+g)), forecast_y, color='green', linestyle='dashed', label='prediction')
    acc = float('{:,.3f}'.format(accuracy))
    plt.text(plt.xlim()[0], plt.ylim()[1], f' Insufficient training data (a={acc})', fontsize=12, verticalalignment='top') #bbox=props)
    
    xpoly = list(range(1,len(draw.df['date'])+g))
    n=15
    m = np.polyfit(list(range(0,len(X)+g)), np.append(test_data, forecast_y), n)
    ypoly = []
    for xx in xpoly:
      func = m[n]
      for ia,ib in enumerate(range(n-1,-1,-1)):
        func += m[ia]*(xx+2)**((ib+1))
      ypoly.append(func)  
    plt.plot(xpoly[:-n][::-1], ypoly[:-n], label='poly fit', linestyle='dashed')

  else:
    for i in args[3:-1]:
      plt.plot(draw.df['date'], draw.df[i], label=i, linestyle='solid')

  steps = range(0,args[0])
  step = []
  labels = []
  for i in list(steps)[::int(args[0]/5)]:
    step.append(i)
    labels.append(draw.df['date'][i])
  

  plt.grid(color='g', linestyle='-', linewidth=0.1)
  plt.legend(loc='upper right')
  plt.xticks(rotation=15)
  plt.ylabel('Cents (c)')
  #plt.gca().invert_xaxis()
  plt.xticks(step, labels)
  plt.savefig(f'/var/www/app/static/images/fuel-{args[0]}{args[1]}{args[3]}.jpg')
  plt.close()
  return f'fuel-{args[0]}{args[1]}{args[3]}.jpg'


if __name__ == '__main__':
  draw(100,0,-1,'minp','maxp','averagep','wholesalep',None) # Most recent 5
  draw(60,0,-1,'averagep',None) # Most recent 30

