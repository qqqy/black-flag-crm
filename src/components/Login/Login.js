import React, { Component } from 'react';
import './Login.scss'
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
          <div id="login-logo-box">
          <h1 className="logo">BlackFlag</h1>
          <h2 className="subtitle">Visual Customer Relations Manager</h2>
          <img src="https://s3.us-east-2.amazonaws.com/black-flag-project/default/logoFlag.svg" alt="A Black Flag" />
          </div>
          <div className="login-inputs-box">
            <div className="login-strip username">
              {/* <p>Email</p> */}
              <input
                onChange={(e) => this.setState({email: e.target.value})}
                placeholder="Email"
              />
            </div>
            <div className="login-strip password">
              {/* <p>Password</p> */}
              <input
                onChange={(e) => this.setState({password: e.target.value})}
                placeholder="Password"
                type="password"
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