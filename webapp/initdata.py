import os
import json
def init_data():
    for filename in os.listdir(os.getcwd()+'/init_data'):
        print(filename)
        with open('./init_data/'+filename) as data_file:
            data = json.load(data_file)
            print(data)
			
init_data()