# 2020-02-18

## My list

- Scatter plot
	- Better axes
	- Change out axis selector for label
	- Change brush to very opaque gray
	- Add animation for state of current point
	- Add projection selector
		- Gray out axis selectors if PCA / MDS / whatever
	- Add the click and drag region
- Parallel coords / bar code plots
	- Make bar code block
	- Make component
	- Add cross-linking for highlighting / selecting (unique ids, monitor in vuex)
	- Add brushes for selection
	- Add vertical buttons for lock, uniform, and gaussian
- Generate point region
	- Align point predictions with parallel axes
	- Generate point button
	- Add slider
	- Add animation for new point
- Model selection
	- Add two resolutions
	- Add mini scatterplot at middle res
	- Material icons
	- Add multiple accuracy headers
	- Figure out multiple resolutions for how many points you try out
	- Have models be click and draggable
- Organization
	- Move to side bar for logo
	- Organize regions

## Low level


The study is going to be online, so I need to do a lot of things.

- Make it look much nicer
- Add in several methods for generating points
- Put the machine learning models in the front end
- Add in instrumentation that writes to a database
- Write a flask server that takes in the data, and test it out.  Or I could make it a rails app, that might be the easiest.
- Figure out how to generate enough random models on the data.

## Make it look nicer

- Change to parallel coordinates with brushes for the sliders
- Move things around for gestalt
- 

## Methods for generating points

- Random
- ... needs more thought

## Put the ML models on the front end

- Need to do research on this.  I know there's tensorflow.js, but that's mostly for deep learning models, right?

## Figure out how to generate enough random models on the data

- I think I've seen a paper that does this.  I think it used some sort of bayesian model (naive bayes?).  Or I could just make a hyperparameter mesh for different learning algorithms.  Ideally, I'd have a different set show up for each person.

## Server to take in data

- Let's just do a rails app that writes out to basic rails tables.  Can use the same rails version as ADAPT, and ask them to open up a DNS record for it.