import json

import fastText
model_file = './model/ft_train.bin'
number_of_labels = 3

with open('./model/class_label.json','r',encoding = 'utf-8') as f:
    class_label = json.load(f)
model = fastText.load_model(model_file)

def predict_field(text):
    res = []
    tmp = model.predict(text,number_of_labels)
    labels = tmp[0]
    prob = tmp[1]
    for i,label in enumerate(labels):
        # if prob[i] > 0.05:
        res.append(label.replace('__label__','').replace('_',' '))
    return res


def intersect(a, b):
    return list(set(a) & set(b))

def getListJD(text,field):
    if (field not in class_label.keys()):
        return []
    return class_label[field]

def retrieval_jd(text,fields):
    list_jd = []
    best_jd = getListJD(text,fields[0])
    for i in range(1,len(fields)):
        list_jd = getListJD(text,fields[i])
        # if len(list_jd)>0:
        best_jd = best_jd + list_jd

    return best_jd[:5]

def predict_field_jd(text):
    text = text.replace("\n"," ")    
    fields = predict_field(text)
    jd_idx = retrieval_jd(text,fields)
    
    return fields,jd_idx

# s = 'Em '
# t = predict_field(s)
# print(t)
# jd_idx = retrieval_jd(s,t)
# print(jd_idx)
