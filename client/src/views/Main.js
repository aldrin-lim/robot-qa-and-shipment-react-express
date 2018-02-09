/**
 * @desc Main Component. Container for all the components. This also process the QA batch process first.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from '../util/http';

class Main extends Component {
  state = {
    loading: true
  }
  componentDidMount = () => {
    // get()
    console.log(this.props)
    this.intialize();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
  }

  // initialize QA Process 
  intialize = async () => {
    let data = await get("robots").then(result => result.data).catch((error) => { console.log(error); return undefined });
    this.setState({ loading: false });
    if(data !== undefined){
      console.log(data)
    } else {
      console.log("failed")
    }
  }
  render() {
    return (
      <div>
        {
          this.state.loading ? 
          "Loading"
          :
          "Main.js"
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(Main);