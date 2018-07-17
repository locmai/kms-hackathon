import os

from flask_restful import Resource, reqparse
from werkzeug.datastructures import FileStorage
from .validation import allowed_file
from database.mongo_helpers import get_doc_by_id
from model.utils import infer, extract_feature
from model.pdf2text import pdf_to_text
from model.fastText_predict import predict_field_jd
from flask import request
UPLOAD_FOLDER = 'resources'

parser = reqparse.RequestParser()
parser.add_argument('file', type=FileStorage, location='files')


class CVUpload(Resource):
    decorators = []

    def post(self):
        data = parser.parse_args()
        print("==============")
        if data['file'] == "":
            return {
                'data': '',
                'message': 'No file found',
                'status': 'error'
            }
        resume = data['file']
        print(resume)
        if allowed_file(resume.filename):
            if resume:
                # filename = resume.filename
                filename = "resume.pdf"
                data_path = os.path.join(UPLOAD_FOLDER, filename)
                resume.save(data_path)
                resume_text = pdf_to_text(data_path)
#                resume_txt_path = os.path.join(UPLOAD_FOLDER, 'resume.txt')
#                with open(, 'w', encoding='utf-8') as f:
#                    f.write(resume_text)
                # vec = extract_feature(resume_txt_path)
                fields, jd_id = predict_field_jd(resume_text)
                return get_doc_by_id(jd_id)
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
