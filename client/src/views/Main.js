/**
 * @desc Main Component. Container for all the components. This also process the QA batch process first.
 */

import React, { Component } from 'react';
import { get, post } from '../util/http';

class Main extends Component {
  componentDidMount = () => {
    // get()
    this.intialize();
  }

  // initialize QA Process 
  intialize = async () => {
    let data = await get("robots").then(result => result);
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Main;