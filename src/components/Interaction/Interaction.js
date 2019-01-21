import React, { Component } from 'react';
import './Interaction.css';
import axios from 'axios'
import { connect } from 'react-redux'
import Begin from './Begin/Begin';
import Finalize from './Finalize/Finalize';
import { targetCustomer , targetTicket } from '../../ducks/reducer'

class Interaction extends Component{
  constructor(props){
    super(props)
    this.state = {
      newInteraction: {
        inte_flag: 1 ,
        inte_ticket: 0,
        inte_task: null,
        inte_agent: this.props.agent.agent_id,
        inte_body: '' ,
        inte_title: '' ,
      } ,
      newTicket: {
        tick_agent: this.props.agent.agent_id,
        tick_customer: this.props.targetCustomerInfo ,
        tick_title: '' ,
        tick_reference: null ,
      } ,
      view: 'Begin' ,
      customers: [] ,
    }
  }

  // NEW TICKET SHOULD BE INVOKED WHILE CREATING THE INTERACTION, IF THE TICKET SLOT IS EMPTY //

  async componentDidMount(){
    try{
      let res = axios.get('/load/cust_name , cust_id/customer')
      this.setState({customers: res.data})
    } catch (error) {
      console.log(error.message)
    }
  }



  update = (column , newVal) => {
    this.setState({newInteraction: {...this.state.newInteraction , [column]: newVal}})
  }

  targetCustomer = async (e) => {
    let res = await axios.get(`/target/customer?id=${e.target.value}`)
    this.props.targetCustomer(res.data)
  }
  
  targetTicket = async (e) => {
    e.persist()
    if(e.target.value != 0){
      let res = await axios.get(`/target/ticket?id=${e.target.value}`)
      this.props.targetTicket(res.data)
      console.log(this.props.targetTicketInfo)
      this.setState({newInteraction:{...this.state.newInteraction , inte_ticket: +e.target.value}})
    } else {
      this.props.targetTicket(this.state.newTicket)
      this.setState({newInteraction:{...this.state.newInteraction , inte_ticket: +e.target.value}})
    }
  } 

  view = () => {
    switch (this.state.view){
      case 'Begin':
        return (<Begin update={this.update} customers={this.props.customers} targetCustomer={this.targetCustomer} targetTicket={this.targetTicket} next={this.next} />)
      case 'Finalize':
        return (<Finalize update={this.update} />)
      default :
        return (<>Something went wrong! Please refresh.</>)
    }
  }

  next = () => {
    switch (this.state.view){
      case 'Begin' :
        return this.setState({view: 'Finalize'})
      case 'Finalize' :
        return this.setState({view: 'Begin'})
      default :
        return this.setState({view: 'Begin'})
    }
  }

  render(){
    return (
      <div className="inte-main">
      <button onClick={() => console.log(this.state.newInteraction)}>DEBUG See Interaction</button>
      {this.view()}
      </div>
    )
  }
}

function mapStateToProps(state){
  const { agent , customers , targetCustomerInfo , targetTicketInfo } = state
  return {
    agent ,
    customers , 
    targetCustomerInfo ,
    targetTicketInfo
  }
}

export default connect(mapStateToProps , { targetCustomer , targetTicket })(Interaction)