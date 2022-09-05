import talib
import yfinance as yf
from patterns import candlestick_patterns
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def patterns_list():
    return candlestick_patterns

def data(
        stock='ltr.ax',
        end=(datetime.today()),
        start=(datetime.today() - timedelta(days=30)),):
    return yf.download(stock, end=end.date(), start=start.date())

def pattern(
        pattern_function,
        data: pd.DataFrame=None) -> pd.DataFrame:
    if not data.empty:
        pattern_function = getattr(talib, pattern_function)
        result = pattern_function(data['Open'], data['High'], data['Low'], data['Close'])
        return result

def main():
    aaa = data()
    lst = patterns_list()
    for pt in lst:
        test = pattern(pt, aaa)
        value = lst[pt]
        aaa[value] = test
        #last = test.tail(1).values[0]
    print(aaa)
    plt.savefig(f'/var/www/app/static/images/fuel-{args[0]}{args[1]}{args[3]}.jpg')

if __name__ == '__main__':
    main()
