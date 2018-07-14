from flask import request
from flask_restful import Resource

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
}

class Question(Resource):
    def get(self):
        return QUESTION

    def post(self):
        json_data = request.get_json(force=True)
        return_message = json_data['message']
        return {
            'may_vua_moi_send': return_message
        }
