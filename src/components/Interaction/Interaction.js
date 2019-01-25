import React, { Component } from 'react';
import './Interaction.scss';
import axios from 'axios'
import { connect } from 'react-redux'
import Begin from './Begin/Begin';
import Finalize from './Finalize/Finalize';
import { targetCustomer, targetTicket , loadDisplay } from '../../ducks/reducer'
import { Link , withRouter } from 'react-router-dom'

class Interaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newInteraction: {
        inte_flag: 1,
        inte_ticket: 0,
        inte_task: null,
        inte_agent: this.props.agent.agent_id,
        inte_body: '',
        inte_title: '',
      },
      newTicket: {
        tick_agent: this.props.agent.agent_id,
        tick_customer: this.props.targetCustomerInfo.cust_id,
        tick_title: '',
        tick_reference: null,
      },
      newCustomer: {
        cust_name: '' ,
        cust_email: '' ,
        cust_phone: null,
        cust_ip: null,
      },
      view: 'Begin',
      customers: [],
    }
  }

  // NEW TICKET SHOULD BE INVOKED WHILE CREATING THE INTERACTION, IF THE TICKET SLOT IS EMPTY //

  async componentDidMount() {
    try {
      let res = axios.get('/load/cust_name , cust_id/customer')
      this.setState({ customers: res.data })
    } catch (error) {
      console.log(error.message)
    }
  }

  update = (column, newVal , type = 'newInteraction') => {
    if (this.state.newInteraction.inte_ticket == 0 && column === 'inte_title') { this.setState({ newTicket: { ...this.state.newTicket, tick_title: newVal } }) }
    this.setState({ [type]: { ...this.state[type], [column]: newVal } })
  }

  targetCustomer = async (e) => {
    e.persist()
    if (e.target.value !== "0"){
      let res = await axios.get(`/target/customer?id=${e.target.value}`)
      this.props.targetCustomer(res.data)
      this.setState({ newTicket: { ...this.state.newTicket, tick_customer: +res.data.cust_id } })
    } else {
      this.props.targetCustomer({test: 'test'})
    }
    console.log(`targetCustomer is now ` , this.props.targetCustomerInfo)
  }

  targetTicket = async (e) => {
    e.persist()
    if (e.target.value !== "0") {
      let res = await axios.get(`/target/ticket?id=${e.target.value}`)
      this.props.targetTicket(res.data)
      this.setState({ newInteraction: { ...this.state.newInteraction, inte_ticket: +e.target.value } })
    } else {
      this.props.targetTicket(this.state.newTicket)
      this.setState({ newInteraction: { ...this.state.newInteraction, inte_ticket: +e.target.value } })
    }
    console.log(this.props.targetTicketInfo)
  }

  view = () => {
    switch (this.state.view) {
      case 'Begin':
        return (<Begin update={this.update} customers={this.props.customers} targetCustomer={this.targetCustomer} targetTicket={this.targetTicket} next={this.next} />)
      case 'Finalize':
        return (<Finalize update={this.update} new={this.new} />)
      default:
        return (<>Something went wrong! Please refresh.</>)
    }
  }

  next = () => {
    switch (this.state.view) {
      case 'Begin':
        return this.setState({ view: 'Finalize' })
      case 'Finalize':
        return this.setState({ view: 'Begin' })
      default:
        return this.setState({ view: 'Begin' })
    }
  }

  new = async () => {
    if (!this.props.targetCustomerInfo.cust_id){
      try {
        let res = await axios.put('/new/customer' , this.state.newCustomer)
        // console.log(`Customer Created: ${res.data}`)
        this.setState({newTicket: {...this.state.newTicket, tick_customer: res.data.cust_id}})
      } catch (error) {
        return console.log('Failed to create new customer: ' , error.message)
      }
    }
    if (this.state.newInteraction.inte_ticket == 0) {
      try {
        let res = await axios.put('/new/ticket', this.state.newTicket)
        this.setState({ newInteraction: { ...this.state.newInteraction, inte_ticket: res.data.tick_id } })
      } catch (error) {
        return console.log(`Failed to create new ticket: ${error.message}`)
      }
      // console.log("Should be First")
    }
    try {
      let res = await axios.put('/new/interaction', this.state.newInteraction)
      if(this.props.match.path === "/"){
        console.log("Updating Search with" , res.data)
        const newDisplay = this.props.display.slice()
        newDisplay.unshift(res.data)
        this.props.loadDisplay(newDisplay)
      }
      // console.log("Should be second")
      // Try using withRouter here sometime.
      // this.props.history.push(`/info/interaction/${res.data.inte_id}`)
      this.next()
    } catch (error) {
      return console.log(error.message)
    }
    alert('Interaction Successfully Created!')
    // const regex = RegExp(/search/)
    // if(regex.test(this.props.location.pathname)){
    //   console.log('Updating Search Results')
    //   let res = await axios.get('/load/display')
    //   this.props.loadDisplay(res.data)
    // }
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <Link to="/">
          <h1
            className="logo"
            >BlackFlag</h1>
        </Link>
      <div className="inte-main">
      {/* <div>
        <button 
          onClick={() => console.log('inte: ' , this.state.newInteraction, 'tick: ' , this.state.newTicket, 'cust: ' , this.state.newCustomer)}
          >DEBUG See Interaction
        </button>
          </div> */}
        {this.view()}
      </div>
        </>
    )
  }
}

function mapStateToProps(state) {
  const { agent, customers, targetCustomerInfo, targetTicketInfo , display } = state
  return {
    agent,
    customers,
    targetCustomerInfo,
    targetTicketInfo,
    display,
  }
}

export default withRouter(connect(mapStateToProps, { targetCustomer, targetTicket , loadDisplay })(Interaction))