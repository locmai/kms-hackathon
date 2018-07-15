import pickle
import numpy as np
import os
import os.path as osp
from sklearn.metrics.pairwise import cosine_similarity


JD_FEAT_DIR = "Result"
class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None


def load_jd_feature():
    feat_list = []
    for jdf_dir in os.listdir(JD_FEAT_DIR):
        path = osp.join(JD_FEAT_DIR, jdf_dir)
        feat = np.load(open(path, "rb"))
        feat_list.append(feat)
    jd_feat_arr = np.array(feat_list)
    return jd_feat_arr


test_data = np.load(open('test.npy', 'rb'))
cluster_path = osp.join(os.getcwd(), '..', 'Clustering', 'Tree.p')
labels_path = osp.join(os.getcwd(), '..', 'Clustering', 'labels.p')
jd_feats_path = osp.join(os.getcwd(), '..', 'Clustering', 'data.p')
kmeans_path = osp.join(os.getcwd(), '..', 'Clustering', 'kmeans.p')

kmeans = pickle.load(open(kmeans_path, 'rb'))
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
label = kmeans.predict([test_data])
index = np.where(job_label == label)[0]
result = []
vocab = [line.rstrip().lower() for line in open('vocabulary_1.txt', 'r').readlines()]

for idx in index:
    feat = [jd_feats[idx]]

    # feat = test_data
    # xxx = []
    # for i in range(len(jd_feats[idx])):
    #     xxx.append((vocab[i], jd_feats[idx][i]))
    # sorted_scores = sorted(xxx, key=lambda x:x[1], reverse=True)
    # for i in range(len(sorted_scores)):
    #     if sorted_scores[i][1] > 0:
    #         print(sorted_scores[i][0], sorted_scores[i][1])

    test_feat = [test_data]
    result.append((cosine_similarity(feat, test_feat)[0][0], idx))     


def comp(a, b):
    return a < b 

from functools import cmp_to_key
ans = sorted(result, key=lambda a: a[0], reverse=False)

print(ans)
print(label)
print(index)


