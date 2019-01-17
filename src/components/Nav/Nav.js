import React from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { loginAgent } from '../../ducks/reducer';

function Nav(props){
  console.log(props)
  const {agent_name , agent_email , agent_company } = props.agent
  return (
    <div className="nav-main">
    <p>{agent_name}</p>
    <p>{agent_email}</p>
    <p>{agent_company}</p>
    <button
      onClick={props.logout}
    >Logout</button>
    </div>
  )
}

function mapStateToProps(state){
  const { agent } = state
  return {
    agent
  }
}

export default connect(mapStateToProps , { loginAgent })(Nav)