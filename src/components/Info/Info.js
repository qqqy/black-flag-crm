import React, { Component } from 'react'
import './Info.scss'
import { Link, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { targetCustomer, targetTicket, targetInteraction, loadDisplay, loadEditTarget } from '../../ducks/reducer'
import axios from 'axios'
import Flag from '../Flag/Flag';
import parseDate from '../../lib/parseDate'

class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true ,
    }

    this.ticketView = this.ticketView.bind(this)
    this.customerView = this.customerView.bind(this)
    this.interactionView = this.interactionView.bind(this)
  }

  componentDidMount() {
    this.loadUp()
  }

  componentDidUpdate(oldProps) {
    const { id: oldId, type: oldType } = oldProps.match.params
    const { id: newId, type: newType } = this.props.match.params
    if (oldId !== newId || oldType !== newType) {
      this.loadUp()
      // console.log(oldId , newId)
    }
  }

  async loadUp() {
    console.log(this.props)
    const { id, type } = this.props.match.params
    let functionName = findFunction()
    function findFunction() {
      switch (type) {
        case 'customer':
          return 'targetCustomer';
        case 'ticket':
          return 'targetTicket';
        case 'interaction':
          return 'targetInteraction';
        default: return 'targetCustomer'
      }
    }
    try {
      let res = await axios.get(`/subload/${type}?id=${id}`)
      this.props.loadDisplay(res.data)
      let newRes = await axios.get(`/target/${type}?id=${id}`)
      this.props[functionName](newRes.data)
    } catch (err) {
      alert("info 53" , err.message)
      this.props.history.goBack()
    }
    if(this.props.display.length > 0){this.setState({loading: false})}
  }

  customerView() {
    let list = this.props.display.map((inte, i) => {
      return (
        <div className="card" key={i}>
          <Flag id={inte.inte_flag} />
          <div className="card-info">
            <div onClick={() => this.props.history.push(`/edit/interaction/${inte.inte_flag}`)}>Edit Interaction</div>
            {/* <div onClick={() => this.props.history.push(`/info/agent/${inte.inte_agent}`)}>View</div> */}
          </div>
          <div className="card-content">
            <p className="title">{inte.inte_title}</p>
            <p>{parseDate(inte.inte_date)}</p>
            <p>{inte.inte_body}</p>
          </div>
        </div>
      )
    })
    const { cust_name, cust_email, cust_phone } = this.props.targetCustomerInfo
    return (
      <>
        <div>
          {cust_name} , {cust_email} , {cust_phone}
        </div>
        <div>
          {list}
        </div>
      </>
    )
  }

  ticketView() {
    let list = this.props.display.map((inte, i) => {
      return (<div key={i}>{inte.inte_flag} , {inte.inte_title} , {inte.inte_date} , {inte.inte_agent}</div>)
    })
    const { tick_id, tick_customer, tick_agent, tick_resolved } = this.props.targetTicketInfo
    return (
      <>
        <div>
          {tick_id} , {tick_customer} , {tick_agent} , {tick_resolved}
        </div>
        <div>
          {list}
        </div>
      </>
    )
  }

  interactionView() {
    const { inte_id, inte_title, inte_ticket, inte_body } = this.props.targetInteractionInfo
    return (
      <>
        <div>
          {inte_id} , {inte_title} , {inte_ticket}
        </div>
        <div>
          <p>{inte_body}</p>
        </div>
        <button onClick={() => this.edit(this.props.targetInteractionInfo)}>edit</button>
      </>
    )
  }

  edit = (targetObject) => {
    this.props.loadEditTarget(targetObject)
    const { type, id } = this.props.match.params
    this.props.history.push(`/edit/${type}/${id}`)
  }

  render() {
    if(this.state.loading){return (<div>Loading...</div>)}
    return (
      <div className="info-main">
      <Switch>
          <Route path='/info/customer/:id' render={this.customerView} />
          <Route path='/info/ticket/:id' render={this.ticketView} />
          <Route path='/info/interaction/:id' render={this.interactionView} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { display, targetCustomerInfo, targetTicketInfo, targetInteractionInfo , flags } = state
  return {
    display,
    targetCustomerInfo,
    targetTicketInfo,
    targetInteractionInfo ,
    flags ,
  }
}

const actions = {
  targetCustomer,
  targetTicket,
  targetInteraction,
  loadDisplay,
  loadEditTarget,
}

export default connect(mapStateToProps, actions)(Info)