import React, { Component } from 'react';

class Cell extends Component {
  state = {
    result: [] // output data to be rendered in UI
  }
  componentWillMount = () => {
    // manipulate props to be readable as UI
    const result =  Object.keys(this.props.data).map((item) => {
      item = this.props.data[item];
      if(Array.isArray) {
        // if field is array, return as string
        return item.toString();
      } else {
        // return actual data
        return item;
      }
    });
    this.setState({ result });
  }
  render = () => {
    return this.state.result.map((item, i) => (
      <td key={i}>{item}</td>
    ))
  }
}

export default Cell;