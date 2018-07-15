from flask import request
from flask_restful import Resource
from model.consult import get_result, consult
from database.model import get_doc_by_id

MOCK_QUESTION = {
    'isFromUser': False,
    'message': 'Are you gay?'
}

INIT_MESSAGE = {
    'isFromUser': False,
    'message': 'Bạn muốn tìm một công việc ngắn hạn hay dài hạn?',
    'answers': ['Dài hạn', 'Ngắn hạn']
}

INIT_MESSAGE_2 = {
    'isFromUser': False,
    'message': 'Bạn có bằng cấp gì không?',
    'answers': ['Có', 'Không']
}

INIT_MESSAGE_3 = {
    'isFromUser': False,
    'message': 'Bạn có khả năng lái xe không?',
    'answers': ['Có', 'Không']
}

JOB = {
    "field": ["field 1", "field 2", "field 3"],
    "skills": ["a", "b", "c"],
    "desc": ["desc 1", "desc 2"],
    "req": ["req 1", "req 2"],
    "benefit": ["be a", "be b"]
}

INIT_MESSAGE_4 = {
    'isFromUser': False,
    'predict': True,
    'message': 'Đây là danh sách công việc phù hợp của bạn',
    'jobs': [JOB, JOB, JOB, JOB]
}


class GreetingQuestion(Resource):
    def get(self):
        return INIT_MESSAGE, 200, {'Set-Cookie': 'initial=true'}


class Question(Resource):
    def post(self):
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

