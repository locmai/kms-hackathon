from pymongo import MongoClient
from bson.json_util import dumps
from .model import job_schema_parser

client = MongoClient('mongodb://localhost:27017/')

db = client['infection']


def get_doc_by_id(list_id):
    lst_result = [(db['jobs'].find({'id': id})) for id in list_id]
    #print([item for item in lst_result[1]][0]['skill'])
    for item in lst_result:
        print(item[0]['skill'])

    return [job_schema_parser(doc[0]) for doc in lst_result]
