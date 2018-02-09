import React, { Component } from 'react';
import Main from './views/Main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
let store = createStore(reducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
