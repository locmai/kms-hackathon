import json
import os

from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_restful import Api
from question import api as question_api
from resume import api as resource_api
from job_recommendation import api as job_recommendation_api
class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None



app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://192.168.33.70:27017/infection"
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
mongo = PyMongo(app)

api.add_resource(question_api.Question, '/api/question')
api.add_resource(resource_api.CVUpload, '/api/upload')
api.add_resource(question_api.GreetingQuestion, '/api/question/greeting')
api.add_resource(job_recommendation_api.Recommendation,'/api/jobs')

def init_data():
    mongo.db.jobs.drop()
    for filename in os.listdir(os.getcwd()+'/init_data'):
        with open('./init_data/'+filename) as data_file:
            data = json.load(data_file)
            filename, _ = os.path.splitext(filename)
            data.update({'id': filename})
            mongo.db.jobs.insert_one(data)
    # mongo.close()
if __name__ == '__main__':
    # init_data()
    app.run(host='0.0.0.0', port=5000)
