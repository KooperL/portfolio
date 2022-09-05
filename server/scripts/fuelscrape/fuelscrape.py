from urllib.request import Request, urlopen
import json
import datetime
import sqlite3
import newdrawfuel
import os
# crontab -e
# 0 9,16 * * */var/www/app/fuelscrape.py


def scrape():
    a = datetime.datetime.now()
    #today = '\'{}\''.format(str(a).translate({45:32}))
    today = f'\'{a}\''
    conn = sqlite3.connect(f'{os.getcwd()}/data/database.db')

    #url = 'https://www.accc.gov.au/consumers/petrol-diesel-lpg/petrol-price-cycles'
    #url = 'https://www.racv.com.au/on-the-road/driving-maintenance/fuel-prices.html'
    
    url = 'https://www.racv.com.au/bin/racv/fuelprice'
    client = Request(url, headers={'User-Agent': 'Chrome/81.0.4044.138'}) # Opens up a client, disguised as chrome
    raw_json = json.loads(urlopen(client).read())

    wholesale_price = float(raw_json['WholesaleTodayAveragePrice'])#.translate({ 39 : None,  })
    todays_price = raw_json['TodaysPrice']['CustomRegionsAvgHighLow'][0]

    average = todays_price['AvgPrice']
    low = todays_price['LowPrice']
    high = todays_price['HighPrice']
    conn.execute("INSERT INTO fuelpricesDB (date,minprice,maxprice,averageprice,wholesaleprice) \
            VALUES ({}, {}, {}, {}, {} )".format(today,low,high,average,wholesale_price))

    conn.commit()
    conn.close()

scrape()
newdrawfuel.draw(100,0,-1,'minp','maxp','averagep','wholesalep',None)
newdrawfuel.draw(60,0,-1,'averagep',None)
