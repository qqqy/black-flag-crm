import React from 'react';
import './Nav.css';
import { connect } from 'react-redux'

function Nav(props){
  const {agent_name , agent_email , agent_company } = props.agent
  return (
    <div className="nav-main">
    <p>{agent_name}</p>
    <p>{agent_email}</p>
    <p>{agent_company}</p>
    </div>
  )
}

function mapStateToProps(state){
  const { agent } = state
  return {
    agent
  }
}

export default connect(mapStateToProps)(Nav)