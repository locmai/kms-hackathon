def job_schema_parser(json_string):
    pass
    return {
        "description": json_string['description'],
        "field": json_string['field'],
        "requirement": json_string['requirement'],
        "benefit": json_string['phuc-loi'],
        "skill": json_string['skill']
    }