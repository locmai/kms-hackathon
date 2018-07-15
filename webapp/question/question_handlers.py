def get_answer(message):
    if message != 'Dài hạn' or message != 'Ngắn hạn':
    
    else:
        return {}


class Question(Resource):
    def post(self):
        return_message = json_data['message']
        return_list_message = json_data['list_message']
        return_root = json_data['root']
        cursor, new_message, new_list_message, new_root = consult(
            return_message, return_root, return_list_message)
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
