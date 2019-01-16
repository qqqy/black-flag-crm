import React , { Component } from 'react';
import './Dashboard.css'
import { connect } from 'react-redux'

class Dashboard extends Component{

  render(){
    if(!this.props.agent.agent_id){this.props.history.push('/login')}
    console.log(this.props)
    return (
    <div className="dashboard-main">
      This is Dashboard
    </div>)
  }
}

export default connect((state) => state)(Dashboard)