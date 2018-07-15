from flask import request
from flask_restful import Resource
from model.consult import get_result, consult
from database.model import get_doc_by_id

INIT_MESSAGE = {
    'isFromUser': False,
    'message': 'Bạn muốn tìm một công việc ngắn hạn hay dài hạn?',
    'answers': ['Dài hạn', 'Ngắn hạn']
}

class GreetingQuestion(Resource):
    def get(self):
        return INIT_MESSAGE, 200, {'Set-Cookie': 'initial=true'}


class Question(Resource):
    def post(self,json_data):
        return_message = json_data['message']
        return_list_message = json_data['list_message']
        return_root = json_data['root']
        cursor, new_message, new_list_message, new_root = consult(
            return_message, return_list_message, return_root)
        if cursor.label != -1:
            return {
                get_doc_by_id(get_result(cursor.label))
            }
        else:
            return {
                'isFromUser': False,
                'message': new_message,
                'list_message': new_list_message,
                'root': new_root
            }

