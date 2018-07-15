from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

db = client['infection']

def get_doc_by_id(list_id):
    docs = [db['jobs'].find({'id': id }) for id in list_id]
    print(docs[0])
    return [db['jobs'].find({'id': id }) for id in list_id]

