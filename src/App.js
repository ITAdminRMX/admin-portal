import React, { Component } from 'react';

// import logo from './logo.svg';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';
import 'flexlayout-react/style/light.css';

import FirstLayout from './flexlayout/test1';

import TodoStore from './mobx/todoStore';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <FirstLayout />
      </div>
    );
  }
}

export default App;
