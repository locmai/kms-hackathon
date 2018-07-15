import os

from flask_restful import Resource, reqparse
from werkzeug.datastructures import FileStorage
from .validation import allowed_file

UPLOAD_FOLDER = 'resources'

parser = reqparse.RequestParser()
parser.add_argument('file', type=FileStorage, location='files')


class AudioUpload(Resource):
    decorators = []

    def post(self):
        data = parser.parse_args()

        if data['file'] == "":
            return {
                'data': '',
                'message': 'No file found',
                'status': 'error'
            }
        resume = data['file']

        if allowed_file(resume.filename):
            if resume:
                # filename = resume.filename
                filename = "audio.raw"
                resume.save(os.path.join(UPLOAD_FOLDER, filename))
                return {
                    'code': '200',
                    'message': 'File uploaded',
                    'status': 'success'
                }
            return {
                'code': '500',
                'message': 'Something when wrong',
                'status': 'error'
            }
        return {
            'code': '400',
            'message': 'File type not allowed',
            'status': 'error'
        }
