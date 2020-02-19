# Writeup Notes

## Introduction

There is considerable demand for the deployment of machine learning models in critical usage scenarios, including patient diagnosis, object detection in self-driving cars, and hurricane prediction models.  In such scenarios, the performance of the predictive model is of paramount importance, as suboptimal performance can mean that lives are lost.  But models fail, sometimes in embarrassingly obvious ways.  In 2017, a self-driving car mistook a pedestrian for a plastic bag causing a fatal accident, and more recently, artificial intelligence models used to discover cancer treatments were picked apart for mistaking basic diagnoses.  In post-mortem analyses, experts are often able to determine what endemic qualities were present in the model that led to their troubling predictions.  But what is needed is the ability to identify these endemic qualities before deployment, and to choose a model that seems to be robust to the deployment scenario of the model.

Visual analytics tools for model selection help domain experts identify issues with robustness by providing affordances for domain experts to explore qualities about the model that may reveal their endemic qualities.  These affordances include visual encodings of the models' predictions on a held out dataset embedded in a data overview or gray-box representations of the decision-making process of the models.  By interacting with the model in the context of the data, domain experts are able to gain some sense of whether the machine learning model matches their mental model of the process going on.  This popular workflow has one critical flaw, however.  It is highly dependent on the data being used to validate the models matching the type of data found when the model is deployed.  As an example, consider an object detection model trained and validated on images only taken from a desert during the day.  No matter how well the model performed on the available data, there would be little guarantee on its performance in the rain or at night.  In machine learning theory, this problem is known as domain mismatch, in which the base assumptions of empirical risk minimization are violated, and no statistical guarantees can be made on the test performance of the model.

In this paper, we propose a user-driven workflow for generating data to enhance the users ability to visually assess robustness of model performance in order to select from a set of trained models.  By intelligently sampling the data space at locations where the models are unsure about their predictions, we are able to demonstrate to the user a model's behavior on unseen data.  And by allowing the user to drive the data generation method, we make use of the domain expert's concept of the distribution of the data the models will see in their deployment scenario.  

Our data generation technique is inspired by active learning techniques in which the user is treated as an oracle to give labels to an unlabeled dataset.  To choose useful data points, we model the informativeness of the dataspace using a bayesian model with a Gaussian process prior that can be conditioned by user input.  

We demonstrate the efficacy of our data generation technique with examples on both real and synthetic datasets.  We also compare our method to other data generation methods in a user study with  _n_ participants.  We find.

We believe that our workflow can be broadly applicable to any model selection tools.  We offer some examples of how our data generation technique can be applied to different types of data including images and text.

## Related Work

### Model selection tools

- Start with aggregate methods (BIC, AIC), robustness checks like... what is it called... cappa?  Cohen?
- Then discuss Squares, Snowcat, BEAMES and Gaggle, etc.
- Finish with example-based approaches, esp. to deep learning, like LSTMVis and What-if tool and Enrico's new thing

### Data generation for model selection

- Talk about active learning, as data generation for 

## Model Selection and Data Generation

## Experiments

## Discussion

## Conclusion

## Uncategorized

- Related work?  In critical usage scenarios, the current solution is to either have humans make the decisions, or use rules-based methods that can be guaranteed to adhere to constraints.  However, these rules-based methods are overly simple, are inhibitively expensive and require excessive time from domain experts, and can only use features that are known by the domain expert.  With so many computer vision algorithms now performing at super human performance, it is clear that statistical methods can find features that domain experts cannot.  