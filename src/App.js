import React, { Component } from 'react';
import './reset.css';
import './App.css';
import routes from './routes'

class App extends Component {

  componentDidMount(){
    document.title = "BlackFlag CRM"
  }
  
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
