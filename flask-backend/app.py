from flask import Flask, request
import pickle
import pandas as pd
import json
import instantiate_models

app = Flask(__name__)

training_df = pd.read_csv('../backend_testing/adult_data/adult.csv', sep='\s*,\s*',
                          usecols=['education-num', 'capital-gain', 'capital-loss', 'hours-per-week', 'age',
                                   'label'], engine='python')

instantiate_models.create_models()

m1 = pickle.load(open('../m1.p', 'rb'))
m2 = pickle.load(open('../m2.p', 'rb'))
clf_l1 = pickle.load(open('../clf_l1_LR.p', 'rb'))
clf_l2 = pickle.load(open('../clf_l2_LR.p', 'rb'))
distance_knn = pickle.load(open('../distance_knn.p', 'rb'))
entropy_dt = pickle.load(open('../entropy_dt.p', 'rb'))
gini_dt = pickle.load(open('../gini_dt.p', 'rb'))
nb_1 = pickle.load(open('../nb_1.p', 'rb'))
nb_2 = pickle.load(open('../nb_2.p', 'rb'))
uniform_knn = pickle.load(open('../uniform_knn.p', 'rb'))

@app.route('/', methods = ["GET", "POST"])
def random_ml():
    datapoint = training_df.sample()
    m1_predict = m1.predict(datapoint.drop(columns=('label')))
    m2_predict = m2.predict(datapoint.drop(columns=('label')))
    clf_l1_predict = clf_l1.predict(datapoint.drop(columns=('label')))
    clf_l2_predict = clf_l2.predict(datapoint.drop(columns=('label')))
    d_knn_predict = distance_knn.predict(datapoint.drop(columns=('label')))
    e_dt_predict = entropy_dt.predict(datapoint.drop(columns=('label')))
    gini_dt_predict = gini_dt.predict(datapoint.drop(columns=('label')))
    nb_1_predict = nb_1.predict(datapoint.drop(columns=('label')))
    nb_2_predict = nb_2.predict(datapoint.drop(columns=('label')))
    uniform_knn_predict = uniform_knn.predict(datapoint.drop(columns=('label')))
    return json.dumps({'m1': m1_predict[0],
                       'm2': m2_predict[0],
                       'clf_l1': clf_l1_predict[0],
                       'clf_l2': clf_l2_predict[0],
                       'distance_knn': d_knn_predict[0],
                       'entropy_dt': e_dt_predict[0],
                       'gini_dt': gini_dt_predict[0],
                       'nb_1': nb_1_predict[0],
                       'nb_2': nb_2_predict[0],
                       'uniform_knn': uniform_knn_predict[0],
                       'age': str(datapoint.iloc[0]['age']),
                       'education': str(datapoint.iloc[0]['education-num']),
                       'hours': str(datapoint.iloc[0]['hours-per-week']),
                       'capital_gain': str(datapoint.iloc[0]['capital-gain']),
                       'capital_loss': str(datapoint.iloc[0]['capital-loss']),
                       'label': str(datapoint.iloc[0]['label'])})


if __name__ == '__main__':
    app.run()
