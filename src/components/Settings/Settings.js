import React , { Component } from 'react';
import './Settings.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginAgent } from '../../ducks/reducer'

class Settings extends Component{
  constructor(props){
    super(props)
    this.state = {
      file: null ,
      image: ''
    }
  }

  submitFile = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file' , this.state.file[0])
    axios.post(`/upload/image` , formData , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      this.props.loginAgent(res.data.agent)
    })
    .catch (err => {
      console.log(err)
    })
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files})
  }

  render(){
    return (
    <div className="settings-main">
    <img className='settings-img' 
      src={this.props.pictureUrl + this.props.agent.agent_picture} 
      alt='Agent' />
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Send</button>
      </form>
      <button onClick={()=>(this.props.history.push('/'))}>Return</button>
    </div>)
  }
}

export default connect((state) => state , {loginAgent})(Settings)