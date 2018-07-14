from flask import Flask
from flask_restful import Api, Resource
from question import api as question_api
from resume import api as resource_api
from init_data import api as init_api
from flask_cors import CORS


app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

api.add_resource(question_api.Question, '/api/question')
api.add_resource(resource_api.CVUpload, '/api/upload')
api.add_resource(init_api.InitApi,'/api/init')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
