import React, { Component } from 'react'
import './Info.scss'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { targetCustomer, targetTicket, targetInteraction, loadDisplay, loadEditTarget } from '../../ducks/reducer'
import axios from 'axios'
import Flag from '../Flag/Flag';
import parseDate from '../../lib/parseDate'

class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
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
    // This probably doesn't need to come back, but I liked it, so I'm keeping it. //
    // if(+newId !== this.props[this.indexType().target][this.indexType().id] && this.props[this.indexType().target][this.indexType().id]){
    //   console.log(+newId , this.props[this.indexType().target][this.indexType().id])
    //   this.props.history.push('/info/customer/' + this.props[this.indexType().target][this.indexType().id])
    // }
  }

  // indexType = () => {
  //   switch (this.props.match.params.type){
  //     case 'customer' :
  //       return {target: 'targetCustomerInfo' , id: 'cust_id' , function: 'targetCustomer'};
  //     case 'ticket' :
  //       return {target: 'targetTicketInfo' , id: 'tick_id' , function: 'targetTicket'};
  //     case 'agent' :
  //       return {target: 'targetAgentInfo' , id: 'agent_id' , function: 'targetAgent'};
  //     case 'interaction' :
  //       return {target: 'targetInteractionInfo' , id: 'inte_id' , function: 'targetInteraction'}
  //     default : alert('Type not recognized! info, indexType'); return null;
  //   }
  // }

  async loadUp() {
    // console.log(this.props)
    const { id, type } = this.props.match.params
    // if(!type || !id){
    //   alert("URL Invalid, returning to search view...")
    //   this.props.history.goBack()
    //   return null
    // }
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
      if (typeof res.data.map === "function"){
        this.props.loadDisplay(res.data)
      } else {
        console.log(`Format Incorrect! Expected array, recieved "${res.data}"`)
        this.props.history.goBack()
      }
      let newRes = await axios.get(`/target/${type}?id=${id}`)
      this.props[functionName](newRes.data)
    } catch (err) {
      console.log('Error in Info loadUp: ' , err.message)
      // alert("info 53", err.message)
      // this.props.history.goBack()
    }
    if (this.props.display.length > 0) { this.setState({ loading: false }) }
  }

  customerView() {
    let list = typeof this.props.display === "object" ? this.props.display.map((inte, i) => {
      return (
        <div className="card" key={i} onClick={() => this.props.history.push(`/edit/interaction/${inte.inte_id}`)}>
          <Flag id={inte.inte_flag} />
          {/* <div className="card-info">
            <div onClick={() => this.props.history.push(`/edit/interaction/${inte.inte_flag}`)}>Edit Interaction</div>
            {/* <div onClick={() => this.props.history.push(`/info/agent/${inte.inte_agent}`)}>View</div> */}
          {/* </div> */}
          <div className="card-content">
            <p className="title">{inte.inte_title}</p>
            <p>{parseDate(inte.inte_date)}</p>
            <p>{inte.inte_body}</p>
          </div>
        </div>
      )
    })
    :
    <>{this.props.history.goBack()}</>

    const { cust_name, cust_email, cust_phone } = this.props.targetCustomerInfo
    return (
      <>
        <div className="info-bar">
          <div className="card-content">
            <p className="title"> {cust_name}</p>
          </div>
          <div className="card-info">
            <div>{cust_email}</div>
            <div>{cust_phone}</div>
          </div>
        </div>
        <div className="deck">
          {list}
        </div>
      </>
    )
  }

  // ticketView() {
  //   let list = this.props.display.map((inte, i) => {
  //     return (<div key={i}>{inte.inte_flag} , {inte.inte_title} , {inte.inte_date} , {inte.inte_agent}</div>)
  //   })
  //   const { tick_id, tick_customer, tick_agent, tick_resolved } = this.props.targetTicketInfo
  //   return (
  //     <>
  //       <div>
  //         {tick_id} , {tick_customer} , {tick_agent} , {tick_resolved}
  //       </div>
  //       <div>
  //         {list}
  //       </div>
  //     </>
  //   )
  // }

  ticketView = () => {
    let list = this.props.display.map((inte, i) => {
      return (
        <div className="card" key={i} onClick={() => this.props.history.push(`/edit/interaction/${inte.inte_id}`)}>
          <Flag id={inte.inte_flag} />
          <div className="card-content">
            <p className="title">{inte.inte_title}</p>
            <p>{parseDate(inte.inte_date)}</p>
            <p>{inte.inte_body}</p>
          </div>
        </div>
      )
    })

    const { tick_title , cust_name , tick_id , agent_name } = this.props.targetTicketInfo
    return (
      <>
        <div className="info-bar">
          <div className="card-content">
            <p className="title"> {tick_title}</p>
          </div>
          <div className="card-info">
            <div>Client: {cust_name}</div>
            <div>Ticket: {tick_id}</div>
            <div>Agent: {agent_name}</div>
          </div>
        </div>
        <div className="deck">
          {list}
        </div>
      </>
    )
  
  }

  interactionView() {
    const { inte_id, inte_title, inte_ticket, inte_body, inte_flag, inte_date } = this.props.targetInteractionInfo
    return (
      <div className="interaction-view-main">
        <div className="card override">
          <div className="flag">
            <Flag id={inte_flag}/>
          </div>
          <div className="card-content">
            <p className="title" >{inte_title}</p>
            <p>{parseDate(inte_date)}</p>
            <button className="large edit-btn" onClick={() => this.edit(this.props.targetInteractionInfo)}>EDIT</button>
          </div>
        </div>
        <div className="card body override">
        {/* REMOVE FOLLOWING WHEN FINISHED TROUBLESHOOTING */}
        <div className="card-info">
          <p>
          INTE_ID: {inte_id} <br/>
          INTE_TICKET: {inte_ticket}
          </p>
        </div>
          <p>
            {inte_body}
          </p>
        </div>
      </div>
    )
  }

  edit = (targetObject) => {
    this.props.loadEditTarget(targetObject)
    const { type, id } = this.props.match.params
    this.props.history.push(`/edit/${type}/${id}`)
  }

  render() {
    if (this.state.loading) { return (<div>Loading...</div>) }
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
  const { display, targetCustomerInfo, targetTicketInfo, targetInteractionInfo, flags } = state
  return {
    display,
    targetCustomerInfo,
    targetTicketInfo,
    targetInteractionInfo,
    flags,
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