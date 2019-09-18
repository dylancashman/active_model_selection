# Active Model Selection

Please see attached PDF for formal description of project.

The goal of this project is to demonstrate that active learning techniques can be applied to model selection by domain experts.  One way they can "feel out" models and make a judgment on which trained model to use is for them to see how the models make predictions on data that they have a nuanced understanding of.  Our plan is to use active learning of both existing training data as well as unseen training data to help the user understand how the models behave at various parts of the data space.

We'll generate new points using Gaussian processes, which are flexible generative models that can be conditioned - if a doctor says, give me 5 imaginary patients who all weigh 300 pounds and smoke half a pack a day, the GP should be able to sample those.  

