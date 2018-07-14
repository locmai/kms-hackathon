from flask import Flask
from flask_restful import Api, Resource
from question import api as question_api
from resume import api as resource_api

app = Flask(__name__)
api = Api(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

api.add_resource(question_api.QuestionList, '/api/question')
api.add_resource(question_api.Question, '/api/question/<question_id>')
api.add_resource(resource_api.CVUpload, '/api/upload')

if __name__ == '__main__':
    app.run(debug=True)
