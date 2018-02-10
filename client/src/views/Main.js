/**
 * @desc Main Component. Container for all the components. This also process the QA batch process first.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, post } from '../util/http';
import { fetchToBeQA, addToFactorySeconds, removeForQA , addToPassedQA, moveToShipment, removeFromShipment } from './../actions';
import _ from 'lodash';
class Main extends Component {
  state = {
    loading: true,
    isFetchDone: false,
    QAPassed: [],
    factorySecond: []
  }
  componentDidMount = () => {
    // get()
    this.intialize();
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.reduxState)
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
  extinguish = async data => {
    // let to_be_qa = await post('robots/123/extinguish').then(result => result.data).catch((error) => { console.log(error); return undefined });
    data.map( async item => {
      try{
        await post(`robots/${item.id}/extinguish`).then(result => result.data).catch((error) => { console.log(error); return undefined })
        this.props.removeForQA();
      } catch (error) {
        console.log("error", error)
      }
    });
    let newData = await get("robots").then(result => result.data).catch((error) => { console.log(error); return undefined });
    this.recycle(newData);
    console.log("Extinguised", newData);
  }

  // check object if requirements for recycle is met
  isRecylable = data => {
    // Has fewer than 3 or greater than 8 rotors
    let condition1 = data.configuration.numberOfRotors < 3 && data.configuration.numberOfRotors > 8;
    // Has any number of rotors and blue in colour
    let condition2 = data.configuration.Colour === "Blue";

    let condition3 = data.configuration.hasWheels === true && data.configuration.hasTracks === true;

    let condition4 = data.configuration.hasWheels === true && data.statuses.includes("rusty");

    let condition5 = data.configuration.hasSentience === true && data.statuses.includes("loose screws");

    let condition6 = data.statuses.includes("on fire");

    return (condition1 || condition2  || condition3  || condition4  || condition5  || condition6 );

  }

  // Recycle data for step 2
  recycle = async data => {
    let recyclable = data.filter(item => this.isRecylable(item)).map(item => item.id);
    try{
      await post(`robots/recycle`, { data: recyclable }).then(result => result.data).catch((error) => { console.log(error); return undefined });
      await this.segregateRecyclable(recyclable);
    } catch (error) {
      console.log("error", error)
    }
  }


  // check object if fo for factory second
  isForFactorySecond = (data, addToFactorySeconds, addToPassedQA) => {
    if (data.statuses.includes("rusty") || data.statuses.includes("loose screws") || data.statuses.includes("paint scratched")) {
      this.setState({ factorySecond: this.state.factorySecond.concat(data) })
    } else {
      this.setState({ QAPassed: this.state.QAPassed.concat(data) })
    }
  }


  // Segragate recylable data for step 3
  segregateRecyclable = async data => {
    return new Promise(async (resolve, reject) => {
      try{
        let fetch = await get("robots").then(result => result.data).catch((error) => { console.log(error); return undefined });
        console.log("RECYCLE",fetch);
        fetch.map(item => this.isForFactorySecond(item));
        this.pushSegratedToReduxState();
        resolve()
      } catch (e) {
        reject(e);
      }
    })
    // data.map(item => this.isForFactorySecond(item, this.props.addToFactorySeconds, this.props.addToPassedQA));
  }

  pushSegratedToReduxState = () => {
    this.props.addToFactorySeconds(this.state.factorySecond);
    this.props.addToPassedQA(this.state.QAPassed);
    this.setState({ loading: false })
    // 18809253"
  }

  test = () => {
    this.props.moveToShipment("18809253")
  }

  test1 = () => {
    this.props.removeFromShipment("18809253")
  }

  render() {
    return (
      <div>
        {
          this.state.loading ? 
          "Loading"
          :
          <div>
              <button onClick={this.test}> Click</button>
            <button onClick={this.test1}> Return</button>
          </div>
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
    fetchToBeQA: data => dispatch(fetchToBeQA(data)),
    addToFactorySeconds: data => dispatch(addToFactorySeconds(data)),
    addToPassedQA: data => dispatch(addToPassedQA(data)),
    removeForQA: () => dispatch(removeForQA()),
    moveToShipment: id => dispatch(moveToShipment(id)),
    removeFromShipment: id => dispatch(removeFromShipment(id))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);