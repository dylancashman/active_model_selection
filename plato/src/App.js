import React, { Component } from 'react';
import logo from './logo.svg';
import x from './/img/x.svg';
import './App.css';
import {  Grid, Row, Col, Jumbotron, Button,
          FormGroup, ControlLabel, FormControl,
          HelpBlock, Form, ButtonGroup,
          Accordion, Panel } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Session/>
      </div>
    );
  }
}

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m1 : '',
      m2 : '',
      clf_l1: '',
      clf_l2: '',
      distance_knn: '',
      entropy_dt: '',
      gini_dt: '',
      nb_1: '',
      nb_2: '',
      uniform_knn: '',
      datapoint : '',
      age: '',
      hours: '',
      capital_gain: '',
      capital_loss: '',
      education: '',
      label: ''
    };
  }

  handleClick() {
    var session = this;
    axios.post("http://localhost:5000", {
        /*requested : this.state.random_click*/
      })
      .then(function (res) {
          console.log(res)
          let data = res.data
          console.log(session.state)
          session.setState({m1: data.m1, 
                            m2: data.m2, 
                            clf_l1: data.clf_l1, 
                            clf_l2: data.clf_l2, 
                            distance_knn: data.distance_knn,
                            entropy_dt: data.entropy_dt,
                            gini_dt: data.gini_dt,
                            nb_1: data.nb_1,
                            nb_2: data.nb_2,
                            uniform_knn: data.uniform_knn,
                            age: data.age,
                            hours: data.hours,
                            capital_gain: data.capital_gain,
                            capital_loss: data.capital_loss,
                            education: data.education,
                            label: data.label});
                          })
      .catch(function (error) {
          console.log(error);
      });
  }

  render() {
    return (
      <div id="session">
        <div id="my-container">
          <div id="header">
            Plato
          </div>
          <Dataview/>
          <ModelSelector
            onClick={() => this.handleClick()}
            predictVar = 'isHOF'
            features = {{'careerRBI': 2200,
              'careerHR': 400,
              'numChampionships': 2,
              'position': "SS"
            }}
          />
          <ModelViewer
            models = {[
              { 'name': "Random Forest", 'paramString': "∂=0.4", "performanceNum": 0.674, "performanceString": "Accuracy: 0.67" },
              { 'name': "Random Forest", 'paramString': "∂=0.2", "performanceNum": 0.633, "performanceString": "Accuracy: 0.63" },
              { 'name': "SVM", 'paramString': "C=1.0", "performanceNum": 0.593, "performanceString": "Accuracy: 0.59" },
              { 'name': "kNN", 'paramString': "k=5", "performanceNum": 0.548, "performanceString": "Accuracy: 0.55" },
              { 'name': "SVM", 'paramString': "C=0.5", "performanceNum": 0.519, "performanceString": "Accuracy: 0.52" },
              { 'name': "kNN", 'paramString': "k=6", "performanceNum": 0.518, "performanceString": "Accuracy: 0.52" },
              { 'name': "SVM", 'paramString': "C=0.4", "performanceNum": 0.474, "performanceString": "Accuracy: 0.47" }
            ]}
          />
          <div id="sidebar">Answers</div>
          <TestServer 
            m1={this.state.m1}
            m2={this.state.m2}
            clf_l1={this.state.clf_l1}
            clf_l2={this.state.clf_l2}
            distance_knn={this.state.distance_knn}
            entropy_dt={this.state.entropy_dt}
            gini_dt={this.state.gini_dt}
            nb_1={this.state.nb_1}
            nb_2={this.state.nb_2}
            uniform_knn={this.state.uniform_knn}
            age={this.state.age}
            education={this.state.education}
            capital_loss={this.state.capital_loss}
            capital_gain={this.state.capital_gain}
            hours={this.state.hours}
            label={this.state.label}
          />
        </div>
      </div>
    );
  }
}

// Instead of disabled form field, have the state
// change to make it plain text but disabled styling
function DatasetName(props) {
  if (props.datasetChosen) {
    return (
      <FormGroup
        controlId="datasetName"
      >
        <Col componentClass={ControlLabel} sm={4}>Dataset Name</Col>
        <Col sm={8}>
          <FormControl.Static>OpenML Baseball</FormControl.Static>
        </Col>
      </FormGroup>
    );
  } else {
    return (
      <FormGroup
        controlId="datasetName"
      >
        <Col componentClass={ControlLabel} sm={4}>Dataset Name</Col>
        <Col sm={8}>
          <FormControl
            type="text"
            value="val"
            placeholder="Enter text"
            disabled="true"
          />
        </Col>
      </FormGroup>
    );
  }
}

function DataTask(props) {
  return (
    <FormGroup controlId="formDataTask">
      <Col componentClass={ControlLabel} sm={4}>Data Task</Col>
      <Col sm={8}>
        <FormControl componentClass="select" placeholder="select">
          <option value="select">Classification</option>
          <option value="other">Regression</option>
        </FormControl>
      </Col>
    </FormGroup>
  );
}

function PredictionVar(props) {
  return (
    <FormGroup controlId="formPredictionVar">
      <Col componentClass={ControlLabel} sm={4}>Predicting</Col>
      <Col sm={8}>
        <FormControl componentClass="select" placeholder="select">
          <option value="select">isHOF</option>
          <option value="other">careerRBI</option>
        </FormControl>
      </Col>
    </FormGroup>
  );
}

function TestServer(props) {
  return (
    <div>
    <h2> Predictions </h2>
    <h4>
      M1: {props.m1}
    </h4>
    <h4>
      M2: {props.m2}
    </h4>
    <h4>
      CLF l1 LR: {props.clf_l1}
    </h4>
    <h4>
      CLF l2 LR: {props.clf_l2}
    </h4>
    <h4>
      Distance KNN: {props.distance_knn}
    </h4>
    <h4>
      Entropy DT: {props.entropy_dt}
    </h4>
    <h4>
      NB 1: {props.nb_1}
    </h4>
    <h4>
      NB 2: {props.nb_2}
    </h4>
    <h4>
      Gini DT: {props.gini_dt}
    </h4>
    <h4>
      Uniform KNN: {props.uniform_knn}
    </h4>
    <h2>
      Datapoint
    </h2>
    <h4>
      Age: {props.age}
    </h4>
    <h4>
      Education: {props.education}
    </h4>
    <h4>
      Hours per week: {props.hours}
    </h4>
    <h4>
      Capital Gain: {props.capital_gain}
    </h4>
    <h4>
      Capital Loss: {props.capital_loss}
    </h4>
    <h4>
      Actual label: {props.label}
    </h4>
    </div>
  );
}

function VariableChoice(props) {
  return (
    <FormGroup controlId="formVariableChoice">
      <Col componentClass={ControlLabel} sm={4}>Using</Col>
      <Col sm={8}>
        <ReactTags
          tags={props.tags}
          suggestions={props.suggestions}
          handleDelete={props.handleDelete.bind(this)}
          handleAddition={props.handleAddition.bind(this)}
          autoresize={false}
          autofocus={false}
          minQueryLength={0}
          placeholder='Add New Feature'
        />
      </Col>
    </FormGroup>
  )
}

class Dataview extends React.Component {
  constructor() {
    super();
    this.state = {
      datasetChosen: true,
      totalTags: [
        { id: 1, name: "careerRBI" },
        { id: 2, name: "careerHR" },
        { id: 3, name: "careerOBP" },
        { id: 4, name: "careerBB" },
        { id: 5, name: "position" },
        { id: 6, name: "numChampionships," },
        { id: 7, name: "fieldingPct" },
        { id: 8, name: "numSeasons" }
      ],
      tags: [
        { id: 1, name: "careerRBI" },
        { id: 2, name: "careerHR" }
      ],
      suggestions: [
        { id: 3, name: "careerOBP" },
        { id: 4, name: "careerBB" },
        { id: 5, name: "position" },
        { id: 6, name: "numChampionships," },
        { id: 7, name: "fieldingPct" },
        { id: 8, name: "numSeasons" }
      ]

    }
  }
  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    const suggestions = this.state.suggestions.slice(0)
    suggestions.splice(0,0,tags[i])
    tags.splice(i, 1)
    this.setState({ tags, suggestions })
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag);
    const suggestions = this.state.suggestions.slice(0);
    const delIndex = suggestions.findIndex(e => e.id === tag.id);
    console.log("tag is ");
    console.log(tag.id);
    // console.log(newSuggestions);
    suggestions.splice(delIndex,1)
    // const newSuggestions = suggestions.slice(delIndex,1)
    this.setState({ tags, suggestions })
    // this.setState({ tags, newSuggestions })
  }


  render() {
    return (
      <div id="dataview">
        <fieldset>
          <legend>Dataset</legend>
          <Form horizontal>
            <DatasetName
              datasetChosen={this.state.datasetChosen}
            />
          </Form>
          <Form horizontal>
            <DataTask
              datasetChosen={this.state.datasetChosen}
            />
          </Form>
          <Form horizontal>
            <PredictionVar
              datasetChosen={this.state.datasetChosen}
            />
          </Form>
          <Form horizontal>
            <VariableChoice
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              handleDelete={(i) => this.handleDelete(i)}
              handleAddition={(i) => this.handleAddition(i)}
            />
          </Form>
        </fieldset>
      </div>
    );
  }
}
//<FormControl.Feedback />
//<HelpBlock>Validation is based on string length.</HelpBlock>

class ModelSelector extends React.Component {
  render() {
    const features = this.props.features
    console.log(this.props.features);
    var proposedPoint = Object.keys(features).map(function(key){
                        // return <li className="tight" eventKey={key}>{key + ": " + features[key]}</li>;
                        return <div className="tight" eventKey={key}>{key + ": " + features[key]}</div>;
                      })
    return (
      <div id="model_selector">
        <fieldset>
          <legend>Active Model Selection</legend>
          <p>For the following data point</p>
          {proposedPoint}
          <p>What value do you expect for the attribute <strong>{this.props.predictVar}</strong>?</p>
          <ButtonGroup className="userLabel">
            <Button >Yes</Button>
            <Button >No</Button>
            <Button >Not Sure</Button>
            <Button onClick={this.props.onClick}>Random Datapoint</Button>
          </ButtonGroup>
        </fieldset>
      </div>
    );
  }
}
          // <ul className="tight">{ proposedPoint }</ul>

class ModelViewer extends React.Component {

  render() {
    var iter = 0;
    const model_code = this.props.models.map(function(model) {
      iter+=1;
      return <Panel header={model.name + ", " + model.paramString + ": " + model.performanceString} eventKey={iter}>Info</Panel>;
// { 'name': "Random Forest", 'paramString': "∂=0.4", "performanceNum": 0.674, "performanceString": "Accuracy: 0.67" },

    });

    return (
      <div id="model_viewer">
        <fieldset>
          <legend>Models</legend>
          <Accordion>
            {model_code}
          </Accordion>
        </fieldset>
      </div>
    );
  }
}
export default App;

