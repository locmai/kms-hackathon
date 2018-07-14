from flask_restful import Resource

INIT_MESSAGE = {

    'type': 'text_question',
    'message': 'Hello gay?',
}


class InitApi(Resource):
    def get(self):
        return INIT_MESSAGE
