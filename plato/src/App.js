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
      models: '',
      dp_hist: [],
      dp_index: -1
    };
  }

  get_models(){
    var session = this
    axios.get("http://localhost:5000", {
      })
      .then(function (res) {
          let data = res.data
          session.setState({models: data.models})
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  handleClick() {
    var session = this
    axios.post("http://localhost:5000", {
      })
      .then(function (res) {
          let data = res.data
          const new_models = session.state.models.map(function(model) {
                                var name = model['name']
                                var success = model['success']
                                success.push(data.model_success[name])
                                return {'name': name, 'success': success}
                              });
          console.log(session.state.dp_hist)
          const new_dp_hist = session.state.dp_hist.concat({"age": data.age,
                                                          "hours": data.hours,
                                                          "capital_gain": data.capital_gain,
                                                          "capital_loss": data.capital_loss,
                                                          "education": data.education,
                                                          "label": data.label
                                                        })

          console.log(new_dp_hist)
          session.setState({
                            models: new_models,
                            dp_hist: new_dp_hist,
                            dp_index: new_dp_hist.length - 1
                          })
                        })
      .catch(function (error) {
          console.log(error);
      });
  }

  set_dp_index(i){
    console.log("ah")
    console.log(i)
    this.setState({
      dp_index: i
    })
  }

  render() {
    if (this.state.models === ''){
      this.get_models()
    }
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
            models = {this.state.models}
            set_dp_index={(i) => this.set_dp_index(i)}
          />
          <div id="sidebar">Answers</div>
          <TestServer 
            dp_hist = {this.state.dp_hist}
            dp_index = {this.state.dp_index}
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
  console.log(props)
  var age = ''
  var education = ''
  var hours = ''
  var capital_gain = ''
  var capital_loss = ''
  var label = ''
  if (props.dp_index != -1) {
    age = props.dp_hist[props.dp_index].age
    education = props.dp_hist[props.dp_index].education
    hours = props.dp_hist[props.dp_index].hours
    capital_gain = props.dp_hist[props.dp_index].capital_gain
    capital_loss = props.dp_hist[props.dp_index].capital_loss
    label = props.dp_hist[props.dp_index].label
  }
  return (
    <div>
    <h2>
      Datapoint
    </h2>
    <h4>
      Age: {age}
    </h4>
    <h4>
      Education: {education}
    </h4>
    <h4>
      Hours per week: {hours}
    </h4>
    <h4>
      Capital Gain: {capital_gain}
    </h4>
    <h4>
      Capital Loss: {capital_loss}
    </h4>
    <h4>
      Actual label: {label}
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

  mouseOver(i, event){
    console.log(i, event)
    this.props.set_dp_index(i)
  }

  render() {
    var session = this
    var model_code = ''
    if (this.props.models !== ''){
      model_code = this.props.models.map((model) => {
        var string_success = ''
        string_success = model.success.map((check, index) => {
          if (check == 'True'){
            return <div style={{ display:'inline-block'}} key={index} onMouseOver={session.mouseOver.bind(session, index)}> {String.fromCharCode(9989)} </div>
          } else {
            return <div style={{ display:'inline-block'}} key={index} onMouseOver={session.mouseOver.bind(session, index)}> {String.fromCharCode(10060)} </div>
          }
        })
        return <div> <div style={{ display:'inline-block'}}>{model.name}</div> {string_success} </div>;
      });
    }

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

