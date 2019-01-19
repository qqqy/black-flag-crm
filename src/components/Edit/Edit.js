import React, { Component } from 'react';
import './Edit.css';
import axios from 'axios'
import { connect } from 'react-redux'
import { loadEditTarget , targetInteraction } from '../../ducks/reducer'
import InteractionLayout from './InteractionLayout/InteractionLayout';

class Edit extends Component{
  constructor(props){
    super(props)
    this.state = {
      target: {},
    }
  }

  async componentDidMount(){
    console.log('Edit Props:' , this.props)
    const { type , id } = this.props.match.params
    // try {
    //   axios.get
    // }
  }

  saveEdit = async () => {
    const { type } = this.props.match.params
    let res = await axios.patch('/save/' + type , this.state.target )
    this.props.targetInteraction(res.data)
    this.props.history.goBack()
  }

  setTarget = (e) => {
    this.setState({target: {...this.props.editTarget , inte_body: e.target.value}})
  }
  
  render(){
    return (
      <div className="edit-main">
        <input onChange={this.setTarget} defaultValue={this.props.editTarget.inte_body} />
        <button onClick={this.saveEdit}>save</button>
        <div className="edit-title"></div>
        <div className="edit-body"></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { editTarget } = state
  return {
    editTarget
  }
}

export default connect(mapStateToProps , {loadEditTarget , targetInteraction})(Edit)