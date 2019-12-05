from flask import Flask, request
import sklearn
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.manifold import MDS

import pickle
import pandas as pd
import json
import instantiate_models

app = Flask(__name__)

training_df = pd.read_csv('../backend_testing/adult_data/adult.csv', sep='\s*,\s*',
                          usecols=['education-num', 'capital-gain', 'capital-loss', 'hours-per-week', 'age',
                                   'label'], engine='python')

#instantiate_models.create_models()
models = []

m1 = pickle.load(open('../m1.p', 'rb'))
models.append({'name': 'm1', 'model': m1, 'success': []})
m2 = pickle.load(open('../m2.p', 'rb'))
models.append({'name': 'm2', 'model': m2, 'success': []})
clf_l1 = pickle.load(open('../clf_l1_LR.p', 'rb'))
models.append({'name': 'clf_l1', 'model': clf_l1, 'success': []})
clf_l2 = pickle.load(open('../clf_l2_LR.p', 'rb'))
models.append({'name': 'clf_l2', 'model': clf_l2, 'success': []})
distance_knn = pickle.load(open('../distance_knn.p', 'rb'))
models.append({'name': 'distance_knn', 'model': distance_knn, 'success': []})
entropy_dt = pickle.load(open('../entropy_dt.p', 'rb'))
models.append({'name': 'entropy_dt', 'model': entropy_dt, 'success': []})
gini_dt = pickle.load(open('../gini_dt.p', 'rb'))
models.append({'name': 'gini_dt', 'model': gini_dt, 'success': []})
nb1 = pickle.load(open('../nb_1.p', 'rb'))
models.append({'name': 'nb1', 'model': nb1, 'success': []})
nb2 = pickle.load(open('../nb_2.p', 'rb'))
models.append({'name': 'nb2', 'model': nb2, 'success': []})
uniform_knn = pickle.load(open('../uniform_knn.p', 'rb'))
models.append({'name': 'uniform_knn', 'model': uniform_knn, 'success': []})

@app.route('/', methods = ["GET"])
def get_models():
    shorter = training_df[:200]
    droppedData = training_df.drop(columns=('label'))[:200]
    rawData = droppedData.to_json(orient='index')
    mins = droppedData.min().to_json()
    maxes = droppedData.max().to_json()
    transformData = droppedData[droppedData.columns]
    transformExtremes = {}

    pca = PCA(n_components=2)
    pca_results = pca.fit_transform(transformData)
    pcadf = pd.DataFrame(data=pca_results[0:, 0:], columns=['x', 'y'])
    transformExtremes["pca"] = [pcadf.min().to_json(), pcadf.max().to_json()]
    pcaJson = pcadf.to_json()

    mds = MDS(n_components=2)
    mds_results = mds.fit_transform(transformData)
    mdsdf = pd.DataFrame(data=mds_results[0:, 0:], columns=['x', 'y'])
    transformExtremes["mds"] = [mdsdf.min().to_json(), mdsdf.max().to_json()]
    mdsJson = mdsdf.to_json()

    tsne = TSNE(n_components=2, perplexity=10)
    tsne_results = tsne.fit_transform(transformData)
    tsnedf = pd.DataFrame(data=tsne_results[0:, 0:], columns=['x', 'y'])
    transformExtremes["tsne"] = [tsnedf.min().to_json(), tsnedf.max().to_json()]
    tsneJson = tsnedf.to_json()

    print(shorter['label'])
    print(shorter.sample()['label'])
    shorter['gt'] = (shorter['label'] == shorter.loc[0, 'label']).astype(int)
    ground_truth = shorter['gt'].to_json()

    models_init = [{key:value for (key, value) in model.items() if key not in ['model']} for model in models]
    return json.dumps({'models': models_init,
                       'rawData': rawData,
                       'mins': mins,
                       'maxes': maxes,
                       'pca': pcaJson,
                       'mds': mdsJson,
                       'tsne': tsneJson,
                       'transformExtremes': json.dumps(transformExtremes),
                       'ground_truth': ground_truth
                       })


@app.route('/', methods = ["GET", "POST"])
def get_predictions():
    sv = request.json['slider_values']
    slider_df = training_df[(training_df['age'] >= sv['age'][0]) & (training_df['age'] <= sv['age'][1]) &
                            (training_df['education-num'] >= sv['education-num'][0]) & (training_df['education-num'] <= sv['education-num'][1]) &
                            (training_df['capital-gain'] >= sv['capital-gain'][0]) & (training_df['capital-gain'] <= sv['capital-gain'][1]) &
                            (training_df['capital-loss'] >= sv['capital-loss'][0]) & (training_df['capital-loss'] <= sv['capital-loss'][1]) &
                            (training_df['hours-per-week'] >= sv['hours-per-week'][0]) & (training_df['hours-per-week'] <= sv['hours-per-week'][1])
                            ]
    datapoint = slider_df.sample()
    predictions = {}
    for model in models:
        predict_success = (model['model'].predict(datapoint.drop(columns=('label'))) == datapoint.iloc[0]['label'])
        predictions[model['name']] = str(predict_success[0])

    return json.dumps({'model_success': predictions,
                       'age': str(datapoint.iloc[0]['age']),
                       'education': str(datapoint.iloc[0]['education-num']),
                       'hours': str(datapoint.iloc[0]['hours-per-week']),
                       'capital_gain': str(datapoint.iloc[0]['capital-gain']),
                       'capital_loss': str(datapoint.iloc[0]['capital-loss']),
                       'label': str(datapoint.iloc[0]['label'])
                        })


if __name__ == '__main__':
    app.run()
