from pymongo import MongoClient
from bson.json_util import dumps
from .model import job_schema_parser
import glob
import json
# filenames = glob.glob('./init_data/*.json')

file_path='./output_json/*.json'
filenames = glob.glob(file_path)
# skill = []
all_data = []
for i,filename in enumerate(filenames):
    fin = open(filename,'r',encoding = 'utf-8').read()
    data = json.loads(fin)
    # tmp = data['field']
    # skill = skill + tmp.split('/')
    all_data.append(data)

def get_doc_by_id(list_id):
    # print(list_id)
    res = []
    for id in list_id:
        # print(id)
        # tmp = int(id)
        res.append(all_data[int(id)])

    return res

def get_doc_by_id2(list_id):
    client = MongoClient('mongodb://192.168.33.70:27017')
    db = client['infection']
    lst_result = [(db['jobs'].find({'id': id})) for id in list_id]

    #print([item for item in lst_result[1]][0]['skill'])
    for item in lst_result:
        print(item[0]['skill'])
    #db.close()
    return [job_schema_parser(doc[0]) for doc in lst_result]
