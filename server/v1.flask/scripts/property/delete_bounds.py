import json
import file_upload
from database import *
import file_upload

def suburb_correction(suburb) -> str:
    pass

def stats():
    pass

#def perimeter_data():
# Following doesn't work in distance matrix
errors = {'mount_buffalo': 356, 'french_island': 623, 'snake_island': 2444, 'lake_wellington': 2525, 'elizabeth_island': 2565}
flagged = []

data = json.load(open('features.json'))
distccs = [365000, None, None, 277000, None]
#for a, ia in enumerate(list(errors.items())):  #<----------------- err
#    i = data['features'][ia[1]]
for a,i in enumerate(data['features']):
    suburb = i['properties']['vic_loca_2'].lower().replace(' ','-')
    bounds = i['geometry']['coordinates'][0][0]
#    if suburb in errors:
#        print(a, suburb)

    if loc_data.find({'suburb': suburb}).count() == 0:
        loccall = file_upload.parseCall('google', file_upload.call(suburb,'loc-google'))

        try: # {'mount_buffalo': 356, 'french_island': 623, 'snake_island': 2444, 'lake_wellington': 2525, 'elizabeth_island': 2565}
            distcall = file_upload.call(suburb,'dist')
            distcc = distcall['rows'][0]['elements'][0]['distance']['value']
        except:
            flagged.append(suburb)
            continue
        loc_dic = {
            'suburb': loccall['suburb'],
            'locdata': {
                'faddr': loccall['faddr'],
                'postcode': loccall['postcode'],
                'shire': loccall['shire'],
                'coords': loccall['coords'],
                'distcc': int(distcc),
                },
            'bounds': bounds,
            }

        if loccall['postcode'] == None:
            loc_dic['flagged'] = 1
        loc_data.insert_one(loc_dic)
        print(f'Added: ({i})')

    else:
        # old_values = loc_data.find_one({'suburb': suburb})
        # #old_values['locdata']['bounds'] = bounds
        # q_param = {'suburb': suburb}
        # new_values = { '$set': { 'bounds': bounds } }
        # loc_data.update_one(q_param, new_values)
        # if old_values['locdata']['postcode'] == None:
        #     loc_data.update_one(q_param, { '$set': { 'flagged': 1 } })
        # print(f'Updated: {suburb}')
        continue
    #print(test())'''

# TODO post code lte 3000 || None  to manually fix
