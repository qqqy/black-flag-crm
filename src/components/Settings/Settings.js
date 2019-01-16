import React , { Component } from 'react';
import './Settings.css'
import { connect } from 'react-redux'

class Settings extends Component{

  render(){
    if(!this.props.agent.agent_id){this.props.history.push('/login')}
    return (
    <div className="settings-main">
      This is Settings
    </div>)
  }
}

export default connect((state) => state)(Settings)