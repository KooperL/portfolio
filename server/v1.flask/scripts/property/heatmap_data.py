'''import pymongo
from pymongo import MongoClient

client = MongoClient()#'mongodb://localhost:27018/')
db = client['vic_properties']
price_data = db['price_data']
loc_data = db['loc_data']
'''
#f=open('heatmapoutput.txt', 'w')

## python myscript.py > myoutput.txt

#melb = {'suburb': 'melbourne'}
#test = price_data.find(melb)
test = {'suburb':'melbourne'}
for i in loc_data.find():
    result = i
    suburb = result['suburb']
    coords = result['locdata']['coords']
    lat = coords['lat']
    lng = coords['lng']
    for a in price_data.find({'suburb':suburb}):
        price_result = a
        meanprice = price_result['pricedata']['mean_means']
    print(f'''{{location: new google.maps.LatLng(
                        parseFloat({lat}),
                        parseFloat({lng})),
                        weight:{meanprice}
                        }},\n''')
