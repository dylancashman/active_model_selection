import React from "react";
 
class BarcodeChart extends React.Component {

  constructor(props) {
    super(props);
    this.store = props.store;
    // this.state = {
    //   calls: this.store.calls
    // };

    this.state = {
      width: props.width,
      height: props.height,
      attrName: props.attrName
      data: props.data
    }

    // this.store.onChange(calls => {
    //   this.setState({ calls: this.store.calls });
    // });
  }
 
  render() {
    return (
      <div className="barcode-chart">
      </div >
    );
  }

}

class Barcodes extends React.Component {
 
  constructor(props) {
    super(props);
    // this.store = props.store;
    // this.state = {
    //   calls: this.store.calls
    // };
 
    // this.store.onChange(calls => {
    //   this.setState({ calls: this.store.calls });
    // });
  }
 
  render() {
    return (
      <div className="barcodes-container">
      </div >
    );
  }
}
 
export default BarCodes;