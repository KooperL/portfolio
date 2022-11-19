import pymongo
from pymongo import MongoClient
from dotenv import dotenv_values
config =  dotenv_values('../.env')
import urllib.parse

username = urllib.parse.quote_plus(config['MONGO_USERNAME'])
password = urllib.parse.quote_plus(config['MONGO_PASSWORD'])
client = MongoClient('mongodb://%s:%s@localhost:%s/' % (username, password, config['MONGO_PORT']))

db = client['vic_properties']
price_data = db['price_data']
loc_data = db['loc_data']
#db1 = client['mongo_database']
#prop_data = db1['prop_data']

def test(suburb='melbourne', call='loc'):
    melb = {'suburb': suburb}
    #for i in price_data.find(melb):
    if call=='loc':
        for i in loc_data.find(melb):
            aaa = i
    elif call=='price':
        for i in price_data.find(melb):
            aaa = i
    return aaa

def call(query={}, call='loc'):
    #for i in price_data.find(melb):
    z = []
    if call=='loc':
        for i in loc_data.find(query):
            z.append(i)
    elif call=='price':
        for i in price_data.find(query):
            z.append(i)
    return z

def prune_dic(dic, key):
    temp = dic
    del temp[key]
    return temp

def wipe():
    #price_data.delete_many({})
    #loc_data.delete_many({})
    return

if __name__ == '__main__':
    # NEVER call wipe() here
    aaa = call({'suburb': 'melbourne'}, 'price')
    print(aaa[0])
    # RUN with the arg -i to stay in interpreter
    print('EG: prop_data = db[\'prop_data\']')
