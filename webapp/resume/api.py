import os

from flask_restful import Resource, reqparse
from werkzeug.datastructures import FileStorage
from .validation import allowed_file
from database.mongo_helpers import get_doc_by_id
from model.utils import infer,extract_feature

UPLOAD_FOLDER = 'resources'

parser = reqparse.RequestParser()
parser.add_argument('file', type=FileStorage, location='files')


class CVUpload(Resource):
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
                filename = "resume.pdf"
                data_path = os.path.join(UPLOAD_FOLDER, filename)
                resume.save(data_path)
                
                vec = extract_feature(data_path)

                return get_doc_by_id(infer(vec))
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
