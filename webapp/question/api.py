from flask_restful import Resource

QUESTION = [
    {
        'question_id':'1',
        'type': 'multiple_choice',
        'message': 'Are you gay?',
        'answer':
            ['Yes',
             'No']
    },
    {
        'question_id':'2',
        'type': 'text_question',
        'message': 'Are you gay?',
    }
]


class Question(Resource):
    def get(self, question_id):
        return QUESTION[question_id]


class QuestionList(Resource):
    def get(self):
        return QUESTION