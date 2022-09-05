import talib
import yfinance as yf
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import mplfinance as mpf

def patterns_list():
    candlestick_patterns = {
        'CDL2CROWS':'Two Crows',
        'CDL3BLACKCROWS':'Three Black Crows',
        'CDL3INSIDE':'Three Inside Up/Down',
        'CDL3LINESTRIKE':'Three-Line Strike',
        'CDL3OUTSIDE':'Three Outside Up/Down',
        'CDL3STARSINSOUTH':'Three Stars In The South',
        'CDL3WHITESOLDIERS':'Three Advancing White Soldiers',
        'CDLABANDONEDBABY':'Abandoned Baby',
        'CDLADVANCEBLOCK':'Advance Block',
        'CDLBELTHOLD':'Belt-hold',
        'CDLBREAKAWAY':'Breakaway',
        'CDLCLOSINGMARUBOZU':'Closing Marubozu',
        'CDLCONCEALBABYSWALL':'Concealing Baby Swallow',
        'CDLCOUNTERATTACK':'Counterattack',
        'CDLDARKCLOUDCOVER':'Dark Cloud Cover',
        'CDLDRAGONFLYDOJI':'Dragonfly Doji',
        'CDLENGULFING':'Engulfing Pattern',
        'CDLEVENINGDOJISTAR':'Evening Doji Star',
        'CDLEVENINGSTAR':'Evening Star',
        'CDLGAPSIDESIDEWHITE':'Up/Down-gap side-by-side white lines',
        'CDLGRAVESTONEDOJI':'Gravestone Doji',
        'CDLHAMMER':'Hammer',
        'CDLHANGINGMAN':'Hanging Man',
        'CDLHARAMI':'Harami Pattern',
        'CDLHARAMICROSS':'Harami Cross Pattern',
        'CDLHIGHWAVE':'High-Wave Candle',
        'CDLHIKKAKE':'Hikkake Pattern',
        'CDLHIKKAKEMOD':'Modified Hikkake Pattern',
        'CDLHOMINGPIGEON':'Homing Pigeon',
        'CDLIDENTICAL3CROWS':'Identical Three Crows',
        'CDLINNECK':'In-Neck Pattern',
        'CDLINVERTEDHAMMER':'Inverted Hammer',
        'CDLKICKING':'Kicking',
        'CDLKICKINGBYLENGTH':'Kicking - bull/bear determined by the longer marubozu',
        'CDLLONGLINE':'Long Line Candle',
        'CDLMARUBOZU':'Marubozu',
        'CDLMATCHINGLOW':'Matching Low',
        'CDLMATHOLD':'Mat Hold',
        'CDLMORNINGDOJISTAR':'Morning Doji Star',
        'CDLMORNINGSTAR':'Morning Star',
        'CDLONNECK':'On-Neck Pattern',
        'CDLPIERCING':'Piercing Pattern',
        'CDLRICKSHAWMAN':'Rickshaw Man',
        'CDLRISEFALL3METHODS':'Rising/Falling Three Methods',
        'CDLSEPARATINGLINES':'Separating Lines',
        'CDLSHOOTINGSTAR':'Shooting Star',
        'CDLSHORTLINE':'Short Line Candle',
        'CDLSPINNINGTOP':'Spinning Top',
        'CDLSTALLEDPATTERN':'Stalled Pattern',
        'CDLSTICKSANDWICH':'Stick Sandwich',
        'CDLTAKURI':'Takuri (Dragonfly Doji with very long lower shadow)',
        'CDLTASUKIGAP':'Tasuki Gap',
        'CDLTHRUSTING':'Thrusting Pattern',
        'CDLTRISTAR':'Tristar Pattern',
        'CDLUNIQUE3RIVER':'Unique 3 River',
        'CDLUPSIDEGAP2CROWS':'Upside Gap Two Crows',
        'CDLXSIDEGAP3METHODS':'Upside/Downside Gap Three Methods'
        }
    return candlestick_patterns

def data(
        stock='ltr.ax',
        end=(datetime.today()),
        start=(datetime.today() - timedelta(days=200)),):
    return yf.download(stock, end=end.date(), start=start.date())

def pattern(
        pattern_function,
        data: pd.DataFrame=None) -> pd.DataFrame:
    if not data.empty:
        pattern_function = getattr(talib, pattern_function)
        result = pattern_function(data['Open'], data['High'], data['Low'], data['Close'])
        return result

def main():
    stock_data = data()
    mas = pd.DataFrame()
    pattern_data = pd.DataFrame()
    pattern_list = patterns_list()

    for pt in pattern_list:
        pt_name = pattern_list[pt]
        pattern_data[pt_name] = pattern(pt, stock_data)
        
    mas['Date'] = stock_data.index
    mas = mas.set_index('Date')
    mas['close'] = stock_data['Close']
    mas['100EMA'] = stock_data['Close'].ewm(span=100, adjust=False).mean()
    mas['20EMA'] = stock_data['Close'].ewm(span=20, adjust=False).mean()
   
    fig, ax = plt.subplots() 
    ax.plot(mas['100EMA'][100:], c='r',label='100 MA')
    ax.plot(mas['20EMA'][100:], c='b',label='20 MA')
    ax.plot(mas['close'][100:], c='r',linestyle='--', label='Raw close')
    plt.xticks(rotation=20)
    plt.legend()
    plt.savefig('/var/www/app/static/images/stocks.jpg',)# facecolor='white', transparent=True)
    print(pattern_data)

if __name__ == '__main__':
        main()
