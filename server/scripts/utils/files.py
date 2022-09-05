from os import listdir
from os.path import isfile, join
def list_files(path):
    #path = '/var/www/app/prop_data/'
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
    return onlyfiles
