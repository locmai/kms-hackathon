from flask_restful import Resource
from database.mongo_helpers import get_doc_by_id

class Recommendation(Resource):
    def get(self, list_id):
        return get_doc_by_id(list_id)
