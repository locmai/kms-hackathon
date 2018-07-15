from flask import request
from flask_restful import Resource

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


STUB_DATA = [INIT_MESSAGE_2, INIT_MESSAGE_3, INIT_MESSAGE_4]
GLOBAL_COUNT = 0


class Question(Resource):
    def get(self):
        return MOCK_QUESTION

    def post(self):
        global GLOBAL_COUNT
        json_data = request.get_json(force=True)
        return_message = json_data['message']
        import time
        print(return_message)
        time.time()
        return_msg = STUB_DATA[GLOBAL_COUNT]
        GLOBAL_COUNT = GLOBAL_COUNT + 1 if GLOBAL_COUNT < 2 else 0
        return return_msg
