from flask import request
from flask_restful import Resource
from model.consult import get_result, consult
from database.mongo_helpers import get_doc_by_id
from model.fastText_predict import predict_field_jd
# from model.Tree import Tree


class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None



INIT_MESSAGE = {
    'isFromUser': False,
    'message': 'Bạn có muốn được tư vấn?',
    'answers': ['Tư vấn', 'Tìm việc'],
    'root':[]
}

SECOND_MESSAGE = {
    'isFromUser': False,
    'message': 'Bạn đã có sẵn CV?',
    'answers': ['Có', 'Không']
}

UPLOAD_MESSAGE = {
    'isFromUser': False,
    'message': 'Hãy tải CV của bạn lên'
}

SEND_MESSAGE = {
    'isFromUser': False,
    'message': 'Hãy mô tả bản thân bạn vào hộp thư!'
}


class GreetingQuestion(Resource):
    def get(self):
        return INIT_MESSAGE, 200, {'Set-Cookie': 'initial=true'}


class Question(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        return_message = json_data['message']
        return_list_message = json_data['list_message']
        return_root = json_data['root']
        if return_message == 'Tư vấn':
            cursor, new_message, new_list_message, new_root = consult(
            return_message, return_list_message, return_root)    
        if return_message == 'Tìm việc':
            return SECOND_MESSAGE
        if return_message == 'Có':
            return UPLOAD_MESSAGE
        if return_message == 'Không':
            return SEND_MESSAGE
        if return_message not in ['Có','Không','Tìm việc','Tư vấn','Có biết', 'Không biết']:
            fields, id = predict_field_jd(return_message)
            # res = []
            # for i in range(len(id)):
                # res.append(str(id[i]))
            return get_doc_by_id(id)
        cursor, new_message, new_list_message, new_root = consult(
            return_message, return_list_message, return_root)
        # print(cursor.label, new_list_message, new_root)
        if cursor.label != -1:
            return get_doc_by_id(get_result(cursor.label))
        else:
            if new_message == '' and cursor.label == -1:
                new_list_message = []
                new_root = [] 
                return{
                    'isFromUser' : False, 
                    'message': "Bạn quá tài giỏi, làm gì cũng được",
                    'list_message': new_list_message,
                    'answers': ['Có biết', 'Không biết'],
                    'root': new_root
                }
            else:
                return {
                    'isFromUser': False,
                    'message': new_message,
                    'list_message': new_list_message,
                    'answers': ['Có biết', 'Không biết'],
                    'root': new_root
                }

