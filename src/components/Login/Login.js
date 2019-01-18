import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginAgent} from '../../ducks/reducer'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: 't',
      password: 't',
    }
    this.login = this.login.bind(this)
  }

  async login(){
    const res = await axios.post('/auth/login' , this.state).catch(()=>alert('Incorrect Username or Password'))
    this.props.loginAgent(res.data)
    this.props.history.push("/")
  }

  render() {
    return (
      <div className="login-main">
        <div className="login-box">
          <div className="login-logo-box">
          <h1 className="logo">BlackFlag</h1>
          </div>
          <div className="login-inputs-box">
            <div className="login-strip username">
              <p>Email</p>
              <input
                onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <div className="login-strip password">
              <p>Password</p>
              <input
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </div>
            <button 
              className="login-btn"
              onClick={this.login}
            >Login</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {agent} = state
  return {agent}
}

export default connect(mapStateToProps , {loginAgent})(Login)