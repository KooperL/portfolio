# import pymongo
# from pymongo import MongoClient
# import pandas as pd
# import datetime
# import numpy as np
# import numpy.polynomial.polynomial as poly
# from heapq import nlargest
# import math
# import matplotlib.pyplot as plt

# # import scripts.property.files as files
# import scripts.property.databaseUtils as databaseUtils

# def highest_des(num=5):
#   highest = [i for i in databaseUtils.price_data.find({ 'pricedata.desirability': { '$exists': True } }).sort('pricedata.desirability',1).limit(num)]
#   '''for i in highest:
#     highest.append([
#     i,
#     int(np.nanmean(mean_data.find_one()[i])),
#     locdata.distcc[i],
#     round(1-1/(np.nansum(count_data.find_one()[i])),3),
#     int(linreg_data.find_one()[i][0][1]),
#     round(float(des_data.find_one()[i]),3)])'''
#   return highest



# def state_stats():
#   data = [result['pricedata']['mean_means'] for result in databaseUtils.price_data.find({},{'pricedata':1})]
#   median = np.median(data)
#   Q1 = np.percentile(data, 25, interpolation = 'midpoint') 
#   Q3 = np.percentile(data, 75, interpolation = 'midpoint') 
#   IQR = Q3 - Q1
#   return {
#     'Min': int(min(data)),
#     'Q1': int(Q1),
#     'median': int(median),
#     'Q3': int(Q3),
#     'Max': int(max(data)),
#     'IQR': int(IQR)
#   }

# if __name__ =='__main__':
#   pass
