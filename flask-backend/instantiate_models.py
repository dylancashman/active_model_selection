def create_models():

    # Loading data
    TRAINING_SET_CT = 50
    VALIDATION_SET_CT = 20
    NROWS = TRAINING_SET_CT + VALIDATION_SET_CT
    print("CREATING MODELS")
    import pandas as pd
    import numpy as np
    import pickle

    training_df = pd.read_csv('../backend_testing/adult_data/adult.csv', sep='\s*,\s*', nrows=NROWS, usecols=['education-num', 'capital-gain', 'capital-loss', 'hours-per-week', 'age', 'label'])

    training_labels = training_df['label'][:TRAINING_SET_CT]
    training_predictors = training_df.drop(columns=('label'))[0:TRAINING_SET_CT]

    val_labels = training_df['label'][TRAINING_SET_CT:]
    val_predictors = training_df.drop(columns=('label'))[TRAINING_SET_CT:]

    print("STARTING TO TRAIN THEM")
    # training_df

    # Build random models
    model_dict = {}

    # We build 10 models each of:
    #  - logistic regression
    #  - SVM
    #  - kNN
    #  - Decision Tree
    #  - Naive Bayes

    # Logistic regression
    # https://scikit-learn.org/stable/auto_examples/linear_model/plot_logistic_l1_l2_sparsity.html#sphx-glr-auto-examples-linear-model-plot-logistic-l1-l2-sparsity-py
    from sklearn.linear_model import LogisticRegression

    for i, C in enumerate(np.logspace(0, 1, num=5)):
        # turn down tolerance for short training time
        clf_l1_LR = LogisticRegression(C=C, penalty='l1', tol=0.01)
        clf_l2_LR = LogisticRegression(C=C, penalty='l2', tol=0.01)
        clf_l1_LR.fit(training_predictors, training_labels)
        clf_l2_LR.fit(training_predictors, training_labels)

        coef_l1_LR = clf_l1_LR.coef_.ravel()
        coef_l2_LR = clf_l2_LR.coef_.ravel()

        # coef_l1_LR contains zeros due to the
        # L1 sparsity inducing norm

        sparsity_l1_LR = np.mean(coef_l1_LR == 0) * 100
        sparsity_l2_LR = np.mean(coef_l2_LR == 0) * 100

        #     print("C=%.2f" % C)
        #     print("Sparsity with L1 penalty: %.2f%%" % sparsity_l1_LR)
        #     print("score with L1 penalty: %.4f" % clf_l1_LR.score(predictors, labels))
        #     print("Sparsity with L2 penalty: %.2f%%" % sparsity_l2_LR)
        #     print("score with L2 penalty: %.4f" % clf_l2_LR.score(predictors, labels))

        model_dict["logreg_c%.2f_l1" % C] = clf_l1_LR
        pickle.dump(clf_l1_LR, open('../clf_l1_LR.p', 'wb'))
        model_dict["logreg_c%.2f_l2" % C] = clf_l2_LR
        pickle.dump(clf_l2_LR, open('../clf_l2_LR.p', 'wb'))

    #  SVM
    # https://scikit-learn.org/stable/auto_examples/svm/plot_iris.html#sphx-glr-auto-examples-svm-plot-iris-py
    from sklearn import svm

    for i, C in enumerate(np.logspace(0, 1, num=5)):
        m1 = svm.SVC(kernel='linear', C=C)
        m2 = svm.SVC(kernel='rbf', gamma=0.7, C=C)

        m1.fit(training_predictors, training_labels)
        m2.fit(training_predictors, training_labels)
        print("m1 score", m1.score(training_predictors, training_labels))
        print("m2 score", m2.score(training_predictors, training_labels))

        model_dict["svm_c%.2f_linear" % C] = m1
        pickle.dump(m1, open('../m1.p', 'wb'))
        model_dict["svm_c%.2f_rbf" % C] = m2
        pickle.dump(m2, open('../m2.p', 'wb'))

    # kNN
    # https://scikit-learn.org/stable/auto_examples/neighbors/plot_classification.html#sphx-glr-auto-examples-neighbors-plot-classification-py
    from sklearn import neighbors

    for i in range(5):
        k = 2 + (2 * i)
        uniform_knn = neighbors.KNeighborsClassifier(k, weights='uniform')
        distance_knn = neighbors.KNeighborsClassifier(k, weights='distance')
        uniform_knn.fit(training_predictors, training_labels)
        distance_knn.fit(training_predictors, training_labels)
        print("uniform_knn score", uniform_knn.score(training_predictors, training_labels))
        print("distance_knn score", distance_knn.score(training_predictors, training_labels))

        model_dict["knn_k%.2f_uniform" % k] = uniform_knn
        pickle.dump(uniform_knn, open('../uniform_knn.p', 'wb'))
        model_dict["knn_k%.2f_distance" % k] = distance_knn
        pickle.dump(distance_knn, open('../distance_knn.p', 'wb'))
    # Decision Tree
    # https://scikit-learn.org/stable/auto_examples/tree/plot_iris.html#sphx-glr-auto-examples-tree-plot-iris-py
    from sklearn import tree

    for i in range(5):
        max_depth = 2 + i
        gini_dt = tree.DecisionTreeClassifier(criterion='gini', max_depth=max_depth)
        entropy_dt = tree.DecisionTreeClassifier(criterion='entropy', max_depth=max_depth)

        gini_dt.fit(training_predictors, training_labels)
        entropy_dt.fit(training_predictors, training_labels)
        print("gini_dt score", gini_dt.score(training_predictors, training_labels))
        print("entropy_dt score", entropy_dt.score(training_predictors, training_labels))

        model_dict["dt_d%.2f_gini" % max_depth] = gini_dt
        pickle.dump(gini_dt, open('../gini_dt.p', 'wb'))
        model_dict["dt_d%.2f_entropy" % max_depth] = entropy_dt
        pickle.dump(entropy_dt, open('../entropy_dt.p', 'wb'))

    # Naive Bayes
    # https://scikit-learn.org/stable/modules/naive_bayes.html#gaussian-naive-bayes
    from sklearn import naive_bayes

    for i, smoothing in enumerate(np.logspace(1e-10, 1e-7, num=5)):
        nb_1 = naive_bayes.GaussianNB(priors=(0.8, 0.2))
        nb_2 = naive_bayes.GaussianNB(priors=(0.2, 0.8))

        nb_1.fit(training_predictors, training_labels)
        nb_2.fit(training_predictors, training_labels)
        print("nb_1 score", nb_1.score(training_predictors, training_labels))
        print("nb_2 score", nb_2.score(training_predictors, training_labels))

        model_dict["nb1_s%.2f" % smoothing] = nb_1
        pickle.dump(nb_1, open('../nb_1.p', 'wb'))
        model_dict["nb2_s%.2f" % smoothing] = nb_2
        pickle.dump(nb_2, open('../nb_2.p', 'wb'))

if __name__ == '__main__':
    create_models()
