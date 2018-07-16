import pickle
from sklearn.metrics.pairwise import cosine_similarity
import os.path as osp
import os
import numpy as np
import random
# from Tree_ import Tree

class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None


def create_question(root, store, state_list):
    if root.left == None or root.right == None:
        terms = None
        return root, terms, store, state_list
    VOCAB_DIR = osp.join(os.getcwd(), 'model', 'vocabulary_org.txt')
    vocab = [line.rstrip() for line in open(VOCAB_DIR, "r").readlines()]

    sysrand = random.SystemRandom()
    left = root.left
    right = root.right
    idxleft = np.argsort(left.data)[::-1]
    idxright = np.argsort(right.data)[::-1]
    keyterms = []
    for i in range(len(idxleft)):
        if idxleft[i] != idxright[i]:
            keyterms.append(idxleft[i])
        if len(keyterms) > 8:
            break
    index = sysrand.choice(keyterms)
    terms = vocab[index]
    while terms in store:
        keyterms.remove(index)
        index = sysrand.choice(keyterms)
        terms = vocab[index]
    if index not in store:
        store.append(int(index))
    if len(keyterms) == 0:
        while root.label == -1:
            root = left
            state_list.append(1)
        terms = None
    return root, terms, store, state_list


def jump(store, state_list):
    TREE_DIR = os.path.join(os.getcwd(), 'model', 'Tree_org.p')
    root = pickle.load(open(TREE_DIR, "rb"))
    for i in range(len(state_list)):
        if state_list[i] == 1:
            if root.left == None:
                return root, '', store, state_list
            else: root = root.left
        else: 
            if root.right == None:
                return root, '', store, state_list
            else: root = root.right
    # if root.label != -1:
    #     root = pickle.load(open(TREE_DIR, 'rb'))
    cursor, terms, store, state_list = create_question(root, store, state_list)
    question = ''
    if terms != None:
        question = "Bạn có am hiểu \"{}\" ?".format(terms)
    return cursor, question, store, state_list


def consult(message, store, state_list):
    cursor, question, store, state_list = jump(store, state_list)
    return cursor, question, store, state_list


def get_result(label):
    labels_path = osp.join(os.getcwd(), 'model', 'labels.p')
    # jd_feats_path = osp.join(os.getcwd(), 'model', 'data.p')
    # jd_feats = pickle.load(open(jd_feats_path, 'rb'))
    job_label = pickle.load(open(labels_path, 'rb'))
 
    index = np.where(job_label == label)[0]
    index = index.tolist()
    # index = [str(idx) for idx in index]
    res = []
    for i in index:
        res.append(i)
    return res

