import pickle
from sklearn.metrics.pairwise import cosine_similarity
import os.path as osp
import os
import numpy as np
import random


def consult():
    VOCAB_DIR = osp.join((os.getcwd(), 'model', 'vocabulary_org_1.txt'))
    TREE_DIR = osp.join(os.getcwd(), 'model', 'Tree_org.p')
    class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None


    root = pickle.load(open(TREE_DIR, "rb"))
    vocab = [line.rstrip() for line in open(VOCAB_DIR, "r").readlines()]
    sysrand = random.SystemRandom()

    labels_path = osp.join(os.getcwd(), 'model', 'labels.p')
    jd_feats_path = osp.join(os.getcwd(), 'model', 'data.p')
    jd_feats = pickle.load(open(jd_feats_path, 'rb'))
    job_label = pickle.load(open(labels_path, 'rb'))


    while root.label == -1:
        left = root.left
        right = root.right
        idxleft = np.argsort(left.data)[::-1]
        idxright = np.argsort(right.data)[::-1]
        keyterms = []
        for i in range(len(idxleft)):
            if idxleft[i] != idxright[i]:
                keyterms.append(idxleft[i])
            if len(keyterms) > 4: break
        terms = vocab[sysrand.choice(keyterms)]
        vocab.remove(terms)
        question = "Do you know \"{}\" ?".format(terms)
        
        reply = input("Y or N? ")
        if (reply == "Y"):
            root = left
        else: root = right

    label = root.label
    index = np.where(job_label == label)[0]

    return index

