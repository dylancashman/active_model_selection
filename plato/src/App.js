import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import logo from './logo.svg';
import x from './/img/x.svg';
import './App.css';
import * as d3 from "d3";
import {  Grid, Row, Col, Jumbotron, Button,
          FormGroup, ControlLabel, FormControl,
          HelpBlock, Form, ButtonGroup,
          Accordion, Panel } from 'react-bootstrap';
import ReactTags from 'react-tag-autocomplete';
import axios from 'axios';
import Nouislider from 'react-nouislider';
import "nouislider/distribute/nouislider.css";
import * as path from 'path';
import AttributesSummary from './components/AttributesSummary';

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
      dp_index: -1,
      rawData: [],
      predictionData: '',
      mins: [],
      maxes: [],
      pca: [],
      mds: [],
      tsne: [],
      transformExtremes: [],
      slider_values: []
    };
    this.slider_handler = this.slider_handler.bind(this)
  }

  slider_handler(slider_values) {
    this.setState({
      slider_values: slider_values
    })
  }

  get_models(){
    var session = this
    axios.get("http://localhost:5000", {
      })
      .then(function (res) {
          let data = res.data
          // console.log(data.ground_truth)
          session.setState({models: data.models,
                            rawData: data.rawData,
                            mins: data.mins,
                            maxes: data.maxes,
                            pca: data.pca,
                            mds: data.mds,
                            tsne: data.tsne,
                            transformExtremes: data.transformExtremes,
                            predictionData: data.ground_truth
                          })
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  handleClick() {
    var session = this
    axios.post("http://localhost:5000", {
        slider_values: session.state.slider_values
      })
      .then(function (res) {
          let data = res.data
          const new_models = session.state.models.map(function(model) {
                                var name = model['name']
                                var success = model['success']
                                success.push(data.model_success[name])
                                return {'name': name, 'success': success}
                              });
          const new_dp_hist = session.state.dp_hist.concat({"age": data.age,
                                                          "hours": data.hours,
                                                          "capital_gain": data.capital_gain,
                                                          "capital_loss": data.capital_loss,
                                                          "education": data.education,
                                                          "label": data.label
                                                        })

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
    this.setState({
      dp_index: i
    })
  }

  componentDidMount() {
    this.get_models()
  }
  
  render() {
    const currState = this.state
    const session = this
    if (currState.rawData.length !== 0) {
      return (
        <div id="session">
          <div id="my-container">
            <div id="header">
              Plato
            </div>
            <Scatterplot 
              id="scatterplot"
              rawData={currState.rawData}
              predictionData={currState.predictionData}
              mins={currState.mins}
              maxes={currState.maxes}
              pca={currState.pca}
              mds={currState.mds}
              tsne={currState.tsne}
              transformExtremes={currState.transformExtremes}
              slider_values={currState.slider_values}
              slider_handler={session.slider_handler}
            />
            <ModelSelector
              onClick={() => this.handleClick()}
              predictVar = 'Yearly Salary'
              features = {{'Age': 60,
                'Education': 9,
                'Hours per week': 45,
                'Capital Gain': 0,
                'Capital Loss': 0
              }}
            />
            <ModelViewer id="dataview"
              models = {currState.models}
              set_dp_index={(i) => this.set_dp_index(i)}
            />
            <TestServer id="sidebar"
              dp_hist = {currState.dp_hist}
              dp_index = {currState.dp_index}
            />
          </div>
        </div>
      );
    }
    else {
      return (
          <ReactLoading type="spin" color="black"/>
      );
    }
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
  var age = ''
  var education = ''
  var hours = ''
  var capital_gain = ''
  var capital_loss = ''
  var label = ''
  if (props.dp_index !== -1) {
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
    var proposedPoint = Object.keys(features).map(function(key){
                        // return <li className="tight" eventKey={key}>{key + ": " + features[key]}</li>;
                        return <div className="tight" key={key}>{key + ": " + features[key]}</div>;
                      })
    return (
      <div id="model_selector">
        <fieldset>
          <legend>Active Model Selection</legend>
          <p>For the following data point</p>
          {proposedPoint}
          <p>What value do you expect for the attribute <strong>{this.props.predictVar}</strong>?</p>
          <ButtonGroup className="userLabel">
            <Button >&lt;=50K</Button>
            <Button >&gt;50K</Button>
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
    this.props.set_dp_index(i)
  }

  render() {
    var session = this
    var model_code = ''
    if (this.props.models !== ''){
      model_code = this.props.models.map((model, index_m) => {
        var string_success = ''
        string_success = model.success.map((check, index) => {
          if (check === 'True'){
            return <div style={{position: "relative", left: "2%", display:"inline-block"}} key={index} onMouseOver={session.mouseOver.bind(session, index)}> {String.fromCharCode(9989)} </div>
          } else {
            return <div style={{position: "relative", left: "2%", display:"inline-block"}} key={index} onMouseOver={session.mouseOver.bind(session, index)}> {String.fromCharCode(10060)} </div>
          }
        })
        return <div style = {{textAlign: "left"}} key={index_m}> 
                  <h4 style={{display: 'inline-block', fontWeight: 'bold'}}>{model.name} 
                      <div style= {{display: 'inline-block', position: "absolute", left: "50%", verticalAlign: "bottom"}}> {string_success} </div> 
                  </h4> 
                </div>;
      });
    }

    return (
      <div id="model_viewer">
        <fieldset>
          <legend>Models</legend>
          <div>
            {model_code}
          </div>

        </fieldset>
      </div>
    );
  }
}

class Scatterplot extends Component {
  constructor(props) {
    super(props);
    var rawData = JSON.parse(props.rawData)
    var predictionData = JSON.parse(props.predictionData)
    // console.log(predictionData)
    var margin = {top: 20, right: 20, bottom: 30, left: 40}
    var width = 460 - margin.left - margin.right
    var height = 300 - margin.top - margin.bottom
    var possibleDimensions = Object.keys(rawData[Object.keys(rawData)[0]])
    var xDim = possibleDimensions[0]
    var yDim = possibleDimensions[1]
    var xScale = d3.scale.linear().range([0, width])
    var yScale = d3.scale.linear().range([height, 0])
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5)
    var yAxis = d3.svg.axis().scale(yScale).orient("right").ticks(5)
    var maxes = JSON.parse(props.maxes)
    var mins = JSON.parse(props.mins)
    var pcaData = JSON.parse(props.pca)
    var mdsData = JSON.parse(props.mds)
    var tsneData = JSON.parse(props.tsne)
    var transformExtremes = JSON.parse(props.transformExtremes)
    var slider_values = {};
    for (var i = 0; i < possibleDimensions.length; i++){
      slider_values[possibleDimensions[i]] = [mins[possibleDimensions[i]], maxes[possibleDimensions[i]]]
    }
    props.slider_handler(slider_values)

    this.state = {
      rawData: rawData,
      predictionData: predictionData,
      pcaData: pcaData,
      mdsData: mdsData,
      tsneData: tsneData,
      margin: margin,
      width: width,
      height: height,
      possibleDimensions: possibleDimensions,
      xDim: xDim,
      yDim: yDim,
      projectionOptions: ['axis_aligned', 'pca', 'mds', 'tsne'],
      currProjectionOption: 'axis_aligned',
      xScale: xScale,
      xAxis: xAxis,
      yScale: yScale,
      yAxis: yAxis,
      mins: mins,
      maxes: maxes,
      transformExtremes: transformExtremes,
      slider: 0,
      slider_values: slider_values
    };
  }

  componentDidMount() {
    this.initializeProjections()
    this.initializeDimensions()
    this.redrawScatterplots()
    // this.createSliders()
  }

  buildScatterPlot(containerElement, data, modelPredictions, groundTruth, fullData) {
      var svgWidth, svgHeight, scatterXScale, scatterXAxis, scatterYScale, scatterYAxis;
      svgWidth = this.state.width;
      svgHeight = this.state.height;
      scatterXScale = this.state.xScale;
      scatterXAxis = this.state.xAxis;
      scatterYScale =this.state.yScale;
      scatterYAxis = this.state.yAxis;

      var scatterContainer = d3.select(containerElement)

      function colorScale (d) {
        return groundTruth[d.id] === 1 ? "green" : "red";
      }

      // We destroy any existing SVGs since we're going to rebuild it.
      scatterContainer.select('svg').remove()

      // Add the svg
      var svg = d3.select(containerElement)
          .append('svg')

      svg.attr("width", svgWidth + this.state.margin.left + this.state.margin.right)
          .attr("height", svgHeight + this.state.margin.top + this.state.margin.bottom)
          .append("g")
              .attr("transform", "translate(" + this.state.margin.left + "," + this.state.margin.top + ")");

      // Add the axes
      var xAxisContainer = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + svgHeight + ")")
          .call(scatterXAxis)
              .append("text")
              .attr("class", "label")
              .attr("x", svgWidth)
              .attr("y", -6)
              .style("text-anchor", "end");

      // y-axis
      var yAxisContainer = svg.append("g")
          .attr("class", "y axis")
          .call(scatterYAxis)
              .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("y", 18)
              .attr("dy", ".71em")
              .style("text-anchor", "end");
      if (this.state.currProjectionOption === 'axis_aligned') {
          xAxisContainer.text(this.state.xDim)
          yAxisContainer.text(this.state.yDim)
      }

      if (this.state.currProjectionOption === 'axis_aligned') {
        var slider_rect = svg.append("rect")
          .attr("x", scatterXScale(this.state.slider_values[this.state.xDim][0]))
          .attr("y", scatterYScale(this.state.slider_values[this.state.yDim][1]))
          .attr("width", scatterXScale(this.state.slider_values[this.state.xDim][1]) - scatterXScale(this.state.slider_values[this.state.xDim][0]))
          .attr("height", scatterYScale(this.state.slider_values[this.state.yDim][0]) - scatterYScale(this.state.slider_values[this.state.yDim][1]))
          .style("fill", "blue")
          .style("opacity", 0.15);
      }
      // draw dots into the scatterplot
      // Here, you can add event listeners that create the tooltips
      // HINT: If you add an event to each point, in the event, you will
      // have access to the ID of the point being hovered over.
      // You can find the information you need for the tooltip by using that
      // ID and looking in the variable "fullData"
      // BEGIN SOLUTION

      var tooltip = d3.select("#dataset-svg").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

      // tooltip mouseover event handler
      var session = this
      var tipMouseover = function(d) {
          var dPoint = session.state.rawData[d.id];
          var html  = ""
          session.state.possibleDimensions.forEach(element => html += element + ": " + dPoint[element] + "<br/>")

          tooltip.html(html)
              .style("left", (d3.event.pageX + 15) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
              .style("opacity", 1) // started as 0!

      };
      // tooltip mouseout event handler
      var tipMouseout = function(d) {
          tooltip.transition()
              .style("opacity", 0); // don't care about position!
      };
      svg.selectAll(".dot")
          .data(data)
          .enter().append("circle")
              .attr("class", "dot")
              .attr("r", 2.5)
              .attr('fill', d => colorScale(d))
              .attr('fill-opacity', .5)
              .attr('transform', function (d) {return ('translate(' + scatterXScale(Math.floor(d.x)) + ', ' + scatterYScale(Math.floor(d.y)) + ')' ) })
              .attr('pointer-events', 'all')
              .on("mouseover", tipMouseover)
              .on("mouseout", tipMouseout);
      // END SOLUTION
  }
  /* END SCATTERPLOT CODE */

  /* BEGIN SUPPORT CODE */
  initializeProjections() {
      var optionSlots = d3.select('#projection-select')
          .selectAll('div.proj')
          .data(this.state.projectionOptions)
          .enter()
          .append('div')

      var session = this
      optionSlots
              .append('input')
              .attr('type', 'radio')
              .attr('name', 'projection')
              .attr('value', (d) => d)
              .property("checked", function(d){ return d === session.state.currProjectionOption; })

      optionSlots
              .append('label')
              .attr('for', (d) => d)
              .text((d) => d)

      d3.selectAll("input[name='projection']")
          .on("change", function(d) {
              session.setState({index: this.value});
              session.setState({currProjectionOption: session.state.index});
              session.redrawScatterplots();
          })

  }

  initializeDimensions() {
      // Fill in the possible dimensions into the select lists
      var session = this
      d3.select('#x-axis-select')
          .selectAll('option')
          .data(session.state.possibleDimensions)
          .enter()
              .append('option')
              .text((d) => d)
              .attr('value', (d,i) => i)
              .property("selected", function(d){ return d === session.state.xDim; })

      d3.select('#y-axis-select')
          .selectAll('option')
          .data(session.state.possibleDimensions)
          .enter()
              .append('option')
              .text((d) => d)
              .attr('value', (d,i) => i)
              .property("selected", function(d){ return d === session.state.yDim; })

      d3.select("#x-axis-select")
      .on("change", function(d) {
          session.setState({index: this.value});
          session.setState({xDim: session.state.possibleDimensions[session.state.index]});
          session.redrawScatterplots();
      })

      d3.select("#y-axis-select")
      .on("change", function(d) {
          session.setState({index: this.value});
          session.setState({yDim: session.state.possibleDimensions[session.state.index]});
          session.redrawScatterplots();
      })

  }

  calculateScales(scatterplotData) {
      if (this.state.currProjectionOption === 'axis_aligned') {
          var xPadding = (this.state.maxes[this.state.xDim] - this.state.mins[this.state.xDim]) * .05
          var yPadding = (this.state.maxes[this.state.yDim] - this.state.mins[this.state.yDim]) * .05
          this.state.xScale.domain([this.state.mins[this.state.xDim] - xPadding, this.state.maxes[this.state.xDim] + xPadding])
          this.state.yScale.domain([this.state.mins[this.state.yDim] - yPadding, this.state.maxes[this.state.yDim] + yPadding])                
      } else {
          var transformExtremes = this.state.transformExtremes
          var currProjectionOption = this.state.currProjectionOption
          var xPadding = (JSON.parse(transformExtremes[currProjectionOption][1])['x'] - JSON.parse(transformExtremes[currProjectionOption][0])['x']) * .05
          var yPadding = (JSON.parse(transformExtremes[currProjectionOption][1])['y'] - JSON.parse(transformExtremes[currProjectionOption][0])['y']) * .05

          this.state.xScale.domain([JSON.parse(transformExtremes[currProjectionOption][0])['x'] - xPadding, JSON.parse(transformExtremes[currProjectionOption][1])['x'] + xPadding])
          this.state.yScale.domain([JSON.parse(transformExtremes[currProjectionOption][0])['y'] - yPadding, JSON.parse(transformExtremes[currProjectionOption][1])['y'] + yPadding])          
      }
  }

  parseData(data) {
      // Different accessor functions based on if it's axis-aligned or not
      var session = this
      var projAccessor = function (k) {
          var projData;
          if (session.state.currProjectionOption === 'pca') {
              projData = session.state.pcaData;
          } else if (session.state.currProjectionOption === 'mds') {
              projData = session.state.mdsData;
          } else if (session.state.currProjectionOption === 'tsne') {
              projData = session.state.tsneData;
          }
          return {id: parseInt(k), x: parseFloat(projData['x'][k]), y: parseFloat(projData['y'][k])}
      }
      var axisAlignedAccessor = function(k) { return {id: parseInt(k), x: data[k][session.state.xDim], y: data[k][session.state.yDim]} }

      var scatterplotData;
      if (this.state.currProjectionOption === 'axis_aligned') {
          scatterplotData = Object.keys(data).map(axisAlignedAccessor)            
      } else {                
          scatterplotData = Object.keys(data).map(projAccessor)            
      }
      return scatterplotData;
  }

  redrawScatterplots() {
      var scatterplotData = this.parseData(this.state.rawData)
      this.calculateScales(scatterplotData);
      // Render the data svg
      this.buildScatterPlot('#dataset-svg', scatterplotData, [], this.state.predictionData, this.state.rawData)
  }
  
  // createSliders() {
  //   var slider = this.state.possibleDimensions.map((pd) => {
  //     var session = this;
  //      return(
  //       <div key={pd}>
  //         <p> {pd} </p>
  //           <Nouislider
  //             id = {pd}
  //             range={{min: this.state.mins[pd], max: this.state.maxes[pd]}}
  //             start={[this.state.mins[pd], this.state.maxes[pd]]}
  //             onSlide={function(value, render, values) {
  //                         var slider_values = session.state.slider_values;
  //                         slider_values[this.options.id] = values;
  //                         session.props.slider_handler(slider_values);
  //                         session.setState({slider_values: slider_values})
  //                         session.redrawScatterplots()
  //                     }}
  //             tooltips
  //           />
  //         <br></br>
  //       </div>
  //     )
  //   })
  //   this.setState({slider: slider})
  // }
  
  render(){
    return (
      <div id="scatterplot"> 
        <div id='dataset-svg'>
        </div>
        <div>
          <div className='data-control-container' style={{display:"inline-block", verticalAlign:"top", align:"left"}}>
              <p>
                  X-axis: 
                  <select name="x-axis" id="x-axis-select" style={{display:"inline-block", position:"relative", top: "-50%"}}>
                  </select>
              </p>
              <p>
                  Y-axis:
                  <select name="y-axis" id="y-axis-select" style={{display:"inline-block", position:"relative", top: "-50%"}}>
                  </select>
              </p>
          </div>
          <div className='separator' style={{display:"inline-block", height:"10px", width:"20px"}}>
          </div>
          <div className='data-control-container' id='projection-select' style={{display:"inline-block", align:"right"}}>
          </div>
        </div>
        <div className='dataset-description-container'>
          <AttributesSummary></AttributesSummary>
        </div>
        <div className='models-container'>
            <ul>
            </ul>
        </div>
      </div>
    );
  }
}
export default App;

