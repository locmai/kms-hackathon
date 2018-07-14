from flask import request
from flask_restful import Resource
from flask import make_response
QUESTION = {
    'type': 'multiple_choice',
    'message': 'Are you gay?',
    'answer':
        ['Yes',
         'No']
}


TMP_QUESTION = {
    'type': 'text_question',
    'message': 'Are you gay?',
    'choices': ['Có', 'Không']
}

INIT_MESSAGE = {

    'type': 'text_question',
    'message': 'Xin chào bạn, bạn muốn tìm kiếm việc làm ngắn hạn hay dài hạn',
    'choices': ['Ngắn hạn', 'Dài hạn']
}


class GreetingQuestion(Resource):
    def get(self):
        return INIT_MESSAGE, 200, {'Set-Cookie': 'initial=true'}


class Question(Resource):
    def get(self):
        return QUESTION

    def post(self):
        json_data = request.get_json(force=True)
        return_message = json_data['message']
        return {
            'may_vua_moi_send': return_message
        }
