/**
 * @desc Main Component. Container for all the components. This also process the QA batch process first.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, post } from '../util/http';
import { fetchToBeQA } from './../actions';
class Main extends Component {
  state = {
    loading: true,
    isFetchDone: false
  }
  componentDidMount = () => {
    // get()
    this.intialize();
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.reduxState.to_be_qa.length > 0) this.extinguish(nextProps.reduxState.to_be_qa)
  }

  // initialize QA Process 
  intialize = async () => {

    let data = await get("robots").then(result => result.data).catch((error) => { console.log(error); return undefined });
    

    // step 1 fetch
    if(data !== undefined){
      this.props.fetchToBeQA(data);
      this.setState({ isFetchDone: true });
    } else {
    }
  }

  // iterate through all data then check if extinguisahble
  extinguish = async (data) => {
    // let to_be_qa = await post('robots/123/extinguish').then(result => result.data).catch((error) => { console.log(error); return undefined });
    data.map( async (item) => {
      try{
        await post(`robots/${item.id}/extinguish`).then(result => result.data).catch((error) => { console.log(error); return undefined })
        
      } catch (error) {
        console.log("error", error)
      }
    });
    let newData = await get("robots").then(result => result.data).catch((error) => { console.log(error); return undefined });
    this.recycle(newData);
  }

  recycle = (data) => {
    console.log(data)
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
    reduxState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchToBeQA: data => dispatch(fetchToBeQA(data))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);