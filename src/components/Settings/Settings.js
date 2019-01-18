import React , { Component } from 'react';
import './Settings.css'
import { connect } from 'react-redux'
import axios from 'axios'

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
      console.log(res)
    })
    .catch (err => {
      console.log(err)
    })
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files})
  }

  render(){
    if(!this.props.agent.agent_id){this.props.history.push('/login')}
    return (
    <div className="settings-main">
    <img className='settings-img' src='' alt='Agent' />
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Send</button>
      </form>
    </div>)
  }
}

export default connect((state) => state)(Settings)