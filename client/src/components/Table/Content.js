import React, { Component } from 'react';
import Cell from './Cell';

// Component for Rendering Table Row
class Content extends Component {
  state = {
    contents: this.props.contents
  }

  // if object does have property from header, return
  returnFilteredData = (data) => {
    let result = {};
      this.props.headers.map((header) => {
        header = header.toLowerCase();
        if(data) Object.assign(result, { [header]: data[header] });
        return null; // to prevent warning
      });
    return result;
  }

  rowOnClick = (data) => {
    this.props.rowOnClick(data)
  }
  render() {
    this.returnFilteredData()
    return (
      <tbody>
        {
          this.state.contents.map((item, i) => (
            <tr onClick={this.rowOnClick.bind(this, item)} key={i}>
              <Cell data={this.returnFilteredData(item)} />
            </tr>
          ))
        }
      </tbody>
    );
  }
}

export default Content;