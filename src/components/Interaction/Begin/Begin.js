import React from 'react'
import './Begin.scss'
import { connect } from 'react-redux'

function Begin(props) {
  let custOptions = props.customers.map((customer, i) => {
    return (
      <option key={'C' + i} value={customer.cust_id} onChange={props.targetCustomer}>{customer.cust_name}</option>
    )
  })
  let tickOptions = props.tickets.filter((ticket , i) => {if(props.targetCustomerInfo.cust_id){return ticket.tick_customer === props.targetCustomerInfo.cust_id} else {return ticket}}).map((ticket, i) => {
    return (
      <option key={'T' + i} value={ticket.tick_id} onChange={props.targetTicket}>{ticket.tick_title}</option>
    )
  })

  return (
    <>
      <div className="dropdown">
        <label>
          Choose Customer <br/>
      <select value={props.targetCustomerInfo.cust_id} onChange={props.targetCustomer}>
            <option key={'C0'} value={0} onChange={props.targetCustomer}>-- New Customer --</option>
            {custOptions}
          </select>
        </label>
      </div>
      { props.targetCustomerInfo.cust_id ?
        (<div className="dropdown">
        <label>
          Choose Ticket <br/>
      <select value={props.targetTicketInfo.tick_id} onChange={props.targetTicket}>
            <option key={'T0'} value={0} onChange={props.targetTicket}>-- New Ticket --</option>
            {tickOptions}
          </select>
        </label>
      </div>
          ) 
          :
          <div className="dropdown">
          <label>
            Customer Information <br/>
          <input onChange={(e) => props.update('cust_name', e.target.value , 'newCustomer')} placeholder="Name" />
          <input onChange={(e) => props.update('cust_email', e.target.value , 'newCustomer')} placeholder="Email" />
          <input onChange={(e) => props.update('cust_phone', e.target.value , 'newCustomer')} placeholder="Phone" type="tel"/>
          </label>
          </div>
          }
      <div className="dropdown">
          <input placeholder="Interaction Title" onChange={(e) => props.update('inte_title', e.target.value)} />
      </div>
          <button className="large" onClick={props.next}>Begin</button>

    </>
  )
}

function mapStateToProps(state) {
  const { targetCustomerInfo, targetTicketInfo, tickets } = state
  return {
    targetTicketInfo,
    targetCustomerInfo,
    tickets,
  }
}

export default connect(mapStateToProps)(Begin)