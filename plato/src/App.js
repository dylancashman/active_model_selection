import React, { Component } from 'react';
import logo from './logo.svg';
import x from './img/x.svg';
import './App.css';
import {  Grid, Row, Col, Jumbotron, Button, 
          FormGroup, ControlLabel, FormControl, 
          HelpBlock, Form, ButtonGroup,
          Accordion, Panel } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';

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
  render() {
    return (
      <div id="session">
        <div id="my-container">
          <div id="header">
            Plato
          </div>
          <Dataview/>
          <ModelSelector
            predictVar = 'isHOF'
            features = {{
              'careerRBI': 2200,
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
            <Button>Yes</Button>
            <Button>No</Button>
            <Button>Not Sure</Button>
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
