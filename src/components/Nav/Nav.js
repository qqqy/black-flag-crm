import React from 'react';
import './Nav.css';
import { connect } from 'react-redux';
import { loginAgent } from '../../ducks/reducer';
import { Link } from 'react-router-dom'

function Nav(props){
  const {agent_name , agent_email , agent_company } = props.agent
  return (
    <div className="nav-main">
    <img src={props.pictureUrl + props.agent.agent_picture} alt={agent_name} />
    <p>{agent_name}</p>
    <p>{agent_email}</p>
    <p>{agent_company}</p>
    <button
      onClick={props.logout}
    >Logout</button>
    <Link to='/settings'>
    <button>Settings</button>
    </Link>
    </div>
  )
}

function mapStateToProps(state){
  const { agent , pictureUrl } = state
  return {
    agent ,
    pictureUrl ,
  }
}

export default connect(mapStateToProps , { loginAgent })(Nav)