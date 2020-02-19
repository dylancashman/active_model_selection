# 2020-01-08

Documents still to do

- screenshots with walkthrough of behavior
- consent script
- demographic survey
- likert-scale questions for experience with analytics, machine learning, data science, or visualization

Title of study: Data generation and visualization on model selection for predictive machine learning models.

Short title: Data generation, visualization, and model selection.

Brief description: In this study, we will be studying the effect of various techniques of generating artificial data on the models chosen for predicting on held-out data.  Traditional machine learning model selection compares aggregate measures calculated on a hold out set.  Previous research has shown that visualizations of model predictions can help users compare models and choose a superior model than just using aggregate measures alone.  This study builds on this previous research by comparing an additional technique, in which a generative Bayesian model is used to generate artificial data, demonstrate how a set of machine learning models would predict on that artificial data, and allow the user to select their model based on this artificial data.

Participants would access our system through a web interface, and be asked to select a small number of predictive machine learning models out of a set of dozens and rank them.  In order to make their ranking, they will have the opportunity to have the system generate artificial data to help them make their choice.  We will vary the types of data that the models are trained on for different participant groups.

The first hypothesis is that if the data used to train the models comes from a different distribution than the held-out data, then generating artificial data will help participants choose models that performs better on the held-out data.  For example, if we are training a classification model that predicts whether a baseball player will be elected into the hall of fame, and we train all of the models on just second basemen, we predict that the artificial data will help choose a model that predicts better on outfielders than the model that has the highest accuracy on second basemen.

The second hypothesis is that if the data used to train is from the same distribution as the held-out data, then we will perform no worse; the participants will choose models that perform as well as the model with the best accuracy on the training data.

2.0	Background / Literature Review / Rationale for the study:

Briefly (500 words or fewer) describe:

The relevant current context of the study and gaps in current knowledge.

Provide the scientific or scholarly background for, rationale for, and significance of the proposed research based on the existing literature and how it will add to existing knowledge.

Previous research has shown that visualizations of model predictions can help users compare models and choose a superior model than just using aggregate measures alone (Cashman 2019).  This is in contrast to the firmly-entrenched belief of empirical risk minimization, in which a model that performs well on validation data should perform well on held-out data.  Learning theory (Kearns and Vazirani 1994) tells us one explanation could be that the held-out data comes from a different distribution than the data used for training the models or calculating aggregate metrics.  If this is the case, expert users may be able to extrapolate whether a given machine learning model is overfitting the distribution of the training data, or if it is a robust model that will perform well on their concept of the held-out data.  The previous research showed some evidence of this, but it was unclear what led to the improved model selection.  In this work, we explicitly show the user how the model would perform on out-of-sample data by generating artificial data using generative Bayesian models.

3.0 Participant Population

Describe generally the population(s) or individuals that will be included in your study.
Briefly describe the criteria (such as age range, gender, language, etc.) that define who will be included or excluded in your study sample.

In order to fairly assess whether the visualization helped users pick better machine learning models, we need to find a participant population that has some analytical knowledge, knows the dataset well, and has incentive to generate a good predictive model.  We plan to post the experiment to the online message board reddit.com/r/baseball, a message board which typically has around 5000 concurrent users at any given time.  The members of this message board are often very interested in analytics because of the statistical revolution of the last 10-15 years in baseball.  The experiment will ask participants to choose the model that will most effectively predict whether a player will be inducted into the hall of fame, a common discussion topic among baseball fans.  They will likely have intimate knowledge of the dataset, which is a publicly-available list of players and their career stats.  The recruitment text is attached as a separate document.

6.0 Procedures Involved:

Describe the study design.

Provide a description of all research procedures and activities. This should be exhaustive enough that an equally qualified researcher could recreate the research based on the information provided. 

Describe the study timelines including: the duration of an individual participant’s participation in the study and the overall anticipated duration of the project. If your study has more than one phase or multiple methods, please clearly map out the different phases/explain how the methods relate within the overall research plan. Insert diagrams, if helpful.
Briefly describe the measures that will be used to collect data about participants. Describe what data will be collected and how it will be collected at all measurement/data collection time-points.
(Note: All surveys, interview guides, and data collection forms should be submitted as part the complete application. Do not incorporate these documents into the protocol.)

Describe the data analysis plan, including any statistical procedures as applicable.

If doing online research, include the URL where the data collection will occur. 

If the study involves more than one condition, please describe the differences in procedures or measures for each of the conditions.

We have developed a visual analytics application that enables a user to select from a set of pre-trained machine learning models.  We will start with open source baseball data that is publicly available online.  This data will consist of the career batting numbers of baseball players in Major League Baseball, along with a label of whether they made the hall of fame or not. The data will be split into a training dataset, a validation dataset, and a held-out dataset for evaluation.  A number of machine learning models will be trained using the training dataset, and participants will be asked to select from a set of these machine learning models.

Participants will be recruited through the message board reddit.com/r/baseball.  If they click the link to participate in the study, they will first be brought to a consent form.  They will electronically sign the consent form and then be brought to our application.  First, they will be asked to fill out a demographic survey (see attached).  They will then be asked to answer some questions about their experience with analytics, machine learning, data science, and visualization (see attached).  Then, they will be brought to our application.  

Our application (see attached screenshots) will allow them to explore the validation dataset using scatterplots.  It will also show them a list of machine learning models, along with their aggregate metrics calculated on the validation dataset.  Lastly, the system will iteratively generate data points that it thinks will be informative to help the user make their model selection.  Each generated point will be shown to the user, and the user will guess if that artificial player will make the hall of fame.  Then, the system will display the predictions made by the models.  The system will show a certain number of data points to the user and then ask them to choose their top five models to complete the task.  All participants will be walked through a set of interactions before they have control of the system via a tutorial they click through.

There are two conditions that we will be testing, differing in what data the machine learning models are trained and what data the users see.  These two conditions will be compared against a baseline condition.  The baseline condition represents traditional model selection, in which the top five models selected would be the top five models by accuracy.  The first condition, seen by half of the participants, is whether they will choose more accurate models on heldout data than the baseline if both the participants and the baseline only see models trained on a "bad" set of data (just second basemen).  These models will then be tested on the full distribution of players in the held-out set, and the performance of models chosen by the user vs. those chosen by the baseline will be compared.  The second condition tested, seen by the other half of the participants, will mirror the first condition, except the models will be trained on the full distribution of players.  In essence, we are testing what the effect of viewing the artificial data is in two cases; where the available data is similar to the data the models will be tested on, and where the available data is different than the data the models will be tested on.

Once the participants have chosen their top 5 models, they will be brought to a page explaining the experiment, thanking them for their participation.  We expect that participation will take 30-60 minutes, and participants will not be compensated for their time.

We will report a one-tailed T test between zero and the difference in accuracy of the best model selected by the participant and the baseline model's accuracy for both conditions.  We anticipate that when the training dataset is only 2nd baseman, this value will be significantly positive, and when the training dataset is the full dataset, this test will confirm the null hypothesis.  We will also report precision at top k, a metric commonly used in machine learning for ranking tasks that measures the precision of the top 5 models chosen (by both baseline and participant) against the true top performing 5 models for the held out data.  We will also analyze whether experience with analytics, machine learning, data science, or visualization have effect on these metrics, using ANOVA.

In addition to recording the top 5 models from each participant, we will record interactions with the system to make a qualitative analysis to understand the efficacy of various features in the tool.

Because the study will be shared online, we want to be wary of participants sharing answers and tactics.  To get around this, we make effort to have the user experience of each participant be slightly different.  This means that rather than only train the two dozen models that a single participant will use, we will train around 100 models and subsample from that set for each participant.  In addition, we will also subsample the validation set that the users see so that they also have different sets of data points to interact with.  This will not effect our data collection or analysis.  During data collection, we will also take efforts to prevent the same participant from participating multiple times.  To do this, we will store a cookie in the participant's browser's local storage that will expire one month after they first participate.  This cookie will be checked when the page first loads, and if the participant has already participated, they will see a message explaining that they are only allowed to participate one time.  This information will only live on the participant's browser and we will not use cookies to keep track of any other information. 

In order to generate artificial data, we will use a generative bayesian model with a gaussian process prior.  This method will choose points that are most disagreed upon by the list of models, i.e. it will choose data points that maximize the shannon entropy of the set of predictions of the models viewed by the user.

10.0 Consent

Describe how consent will be obtained. 
If consent will not be obtained, please provide a rationale for why you are not obtaining consent. Please review the HRP-410 – CHECKLIST – Waiver or Alteration of Consent Process to ensure you have provided sufficient information for the IRB to make a determination.
If obtaining consent using a written consent document, describe:
	Where the consent process will take place.
	Any process to ensure ongoing consent if appropriate. This may include reconsent for longitudinal studies or if there are multiple stages to a project over time.
	The details of the consent process including:
	The role of the individuals listed in the application as being involved in the consent process.
	The amount of time that will be devoted to the consent discussion (in order to ensure participants’ understanding of the study and procedures).
	Steps that will be taken to ensure the participants’ understanding of the study and procedures.
	Steps that will be taken to minimize the possibility of coercion or undue influence.
Describe whether and how consent of the participant will be documented in writing.

If you will document consent in writing, you must use the Tufts SBER IRB Consent Template to create the consent document or script.

If your study invokes GDPR, please include the GDPR specific language in the consent template. 
If you will obtain consent, but not document consent in writing, please provide a rationale for why you are not obtaining written consent. Review HRP-411 – CHECKLIST – Waiver of Written Documentation of Consent to ensure that you have provided sufficient information for the IRB to determine if your research is eligible for a waiver of written consent. 
 If you will not obtain consent or the consent process will be altered (e.g., required information will not be disclosed, research involves incomplete disclosure or deception), you must provide a rationale explaining why you are not obtaining consent or why you are altering the consent process. Review the HRP-410 – CHECKLIST – Waiver or Alteration of Consent Process to ensure you have provided sufficient information for the IRB to determine if your research is eligible for a waiver or alteration of consent.. 

Non-English Speaking Participants
If there are Non-English speaking participants who will be enrolled, describe the process to ensure that the oral and written information provided to those participants will be in the language with which they are most comfortable speaking or writing. Indicate the language that will be used by those obtaining consent. 

If you will be using a translator during recruitment, consent, data collection, or data analysis specify how you will identify an appropriate translator and what the provisions will be for protecting the confidentiality of participants. 

Short-Form Consent Process
For protocol utilizing a standard written consent process: If the protocol will allow for unexpected enrollment of non-English speakers, people with limited literacy or vision, or participants who cannot otherwise read written consent materials, this should be included in this section. The IRB must approve the use of the Short Form process and Short Form before it can be utilized in a study. The short form process involves a third-party witness to the consent process.


Participants who are not yet adults (minors under 18 years of age):
	Describe whether parental permission will be obtained 
	Describe the process for assent of the participants (for minors aged 7-17).
	For research conducted outside of the state, provide information that describes which persons have not attained the legal age for consent procedures involved in the research, under the applicable law of the jurisdiction in which research will be conducted. One method of obtaining this information is to have a legal counsel or authority review your protocol along the definition of “children” in HRP-013 – SOP – Legally Authorized Representatives, Children, and Guardians.

Cognitively Impaired Adults:
Describe the process to determine whether an individual is capable of consent. 

Adults Unable to Consent:
	List the individuals from whom permission will be obtained in order of priority. (E.g., durable power of attorney for health care, court appointed guardian for health care decisions, spouse, and adult child.)
	For research conducted in the state, review HRP-013 – SOP – Legally Authorized Representatives, Children, and Guardians to be aware of which individuals in the state meet the definition of “legally authorized representative.”
	For research conducted outside of the state, provide information that describes which individuals are authorized under applicable law to consent on behalf of a prospective participant to their participation in the procedure(s) involved in this research. One method of obtaining this information is to have a legal counsel or authority review your protocol along the definition of “legally authorized representative” in HRP-013 – SOP – Legally Authorized Representatives, Children, and Guardians.

Certificate of Confidentiality:
	If your study involves the use of a Certificate of Confidentiality, please describe that here. Please note, if your study is funded by the National Institute of Health (NIH), your grant already includes, and in all likelihood requires, the use of a Certificate of Confidentiality. Language describing the Certificate of Confidentiality must be included in the consent form (see consent form template for exact language).

-----

Consent will be obtained through the web via a consent form (see attached) that potential participants will view when they first click the link to our study given out in the recruitment text.  There are no foreseeable risks to participating.  Participants are told in both the recruitment script and the consent text that they must be 18 or over, located in the United States, and fluent in English.  This is a standard method for receiving consent for experiments that take place on the web.