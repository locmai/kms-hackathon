import pickle
from sklearn.metrics.pairwise import cosine_similarity
import os.path as osp
import os
import numpy as np
import random


class Tree(object):
    def __init__(self):
        self.left = None
        self.right = None
        self.label = -1
        self.data = None
        self.kmeans = None


def create_question(root, store, state_list):
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
    print(store)
    while terms in store:
        keyterms.remove(index)
        index = sysrand.choice(keyterms)
        terms = vocab[index]
    if index not in store:
        store.append(index)
    else:
        root = left
        state_list.append(1)
    return root, terms, store, state_list


def jump(store, state_list):
    TREE_DIR = "../Clustering/Tree_org.p"
    root = pickle.load(open(TREE_DIR, "rb"))
    for i in range(len(state_list)):
        if state_list[i] == 1:
            root = root.left
        else: root = root.right
    cursor, terms, store, state_list = create_question(root, store, state_list)
    question = None
    if terms != None:
        question = "Do you know \"{}\" ?".format(terms)
    return cursor, question, store, state_list


def consult(message, store, state_list):
    VOCAB_DIR = osp.join((os.getcwd(), 'model', 'vocabulary_org_1.txt'))

    vocab = [line.rstrip() for line in open(VOCAB_DIR, "r").readlines()]

    labels_path = osp.join(os.getcwd(), 'model', 'labels.p')
    jd_feats_path = osp.join(os.getcwd(), 'model', 'data.p')
    jd_feats = pickle.load(open(jd_feats_path, 'rb'))
    job_label = pickle.load(open(labels_path, 'rb'))

    cursor, question, store, state_list = jump(root, store, state_list)
    return cursor, question, store, state_list


def get_result(label):
    index = np.where(job_label == label)[0]
    return index

