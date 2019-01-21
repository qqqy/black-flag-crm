import React from 'react'
import './Begin.css'
import { connect } from 'react-redux'

function Begin(props) {
  let custOptions = props.customers.map((customer , i) => {
    return (
    <option key={'C' + i} value={customer.cust_id}>{customer.cust_name}</option>
  )})
  let tickOptions = props.tickets.map((ticket , i) => {return(
    <option key={'T' + i} value={ticket.tick_id} onChange={props.targetTicket}>{ticket.tick_title}</option>
  )})
  return(
    <>
    <label>
      Choose Customer
      <select value={props.targetCustomerInfo.cust_id} onChange={props.targetCustomer}>
        {custOptions}
      </select>
    </label>
    <label>
      Choose Ticket
      <select value={props.targetTicketInfo.tick_id} onChange={props.targetTicket}>
        <option key={'T0'} value={0} onChange={props.targetTicket}>-- New Ticket --</option>
        {tickOptions}
      </select>
      <input defaultValue="Issue / Interaction Title" onChange={(e) => props.update('inte_title' , e.target.value)}/>
      <button onClick={props.next}>Begin</button>
    </label>

    </>
  )
}

function mapStateToProps(state){
  const { targetCustomerInfo , targetTicketInfo , tickets } = state
  return {
    targetTicketInfo ,
    targetCustomerInfo ,
    tickets ,
  }
}

export default connect(mapStateToProps)(Begin)