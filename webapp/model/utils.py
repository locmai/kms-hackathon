import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import os.path as osp
import os

class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None


def extract_feature(data_path):
    data_path = os.path.join(os.getcwd(), data_path)
    vectorizer = pickle.load(open(os.path.join(os.getcwd(), 'model', "encoder.p"), 'rb'))
    print(data_path)
    vec = vectorizer.fit_transform([data_path])
    vec = np.asarray(vec.sum(axis=0)).ravel()
    return vec


def infer(vec):
    cluster_path = osp.join(os.getcwd(), 'model','Tree.p')
    labels_path = osp.join(os.getcwd(), 'model','labels.p')
    jd_feats_path = osp.join(os.getcwd(), 'model','data.p')

    jd_feats = pickle.load(open(jd_feats_path, 'rb'))
    job_label = pickle.load(open(labels_path, 'rb'))
    root = pickle.load(open(cluster_path, 'rb'))

    while root.label == -1:
        ans = root.kmeans.predict([test_data])
    if ans == 1:
        root = root.right
    else:
        root = root.left


    label = root.label
    index = np.where(job_label == label)[0]
    result = []

    for idx in index:
        feat = [jd_feats[idx]]
        test_feat = [test_data]
        result.append((cosine_similarity(feat, test_feat)[0][0], idx))
    from functools import cmp_to_key
    ans = sorted(result, key=lambda a: a[0], reverse=False)
    ans = [str(ans[i][1]) for i in range(len(ans)) if ans[i][0] > 0]
    return ans
