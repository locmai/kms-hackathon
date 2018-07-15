ALLOWED_EXTENSIONS = set(['raw', 'mp3', 'wave'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
