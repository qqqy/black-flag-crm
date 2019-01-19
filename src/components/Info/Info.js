import React , { Component } from 'react'
import './Info.css'
import { Link , Switch , Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { targetCustomer , targetTicket , targetInteraction , loadDisplay , loadEditTarget } from '../../ducks/reducer'
import axios from 'axios'

class Info extends Component{
  constructor(props){
    super(props)

    this.ticketView = this.ticketView.bind(this)
    this.customerView = this.customerView.bind(this)
    this.interactionView = this.interactionView.bind(this)
  }

  componentDidMount(){
    this.loadUp()
  }

  componentDidUpdate(oldProps){
    const { id: oldId , type: oldType} = oldProps.match.params
    const { id: newId , type: newType} = this.props.match.params
    if(oldId !== newId || oldType !== newType){
      this.loadUp()
      // console.log(oldId , newId)
    }
  }

  async loadUp(){
    console.log(this.props)
    const { id , type } = this.props.match.params
    let functionName = findFunction()
    function findFunction(){switch (type){
      case 'customer':
        return 'targetCustomer';
      case 'ticket':
        return 'targetTicket';
      case 'interaction':
        return 'targetInteraction';
      default: return 'targetCustomer'
    }}
    try {
      let res = await axios.get(`/load/${type}?id=${id}`)
      this.props.loadDisplay(res.data)
      let newRes = await axios.get(`/target/${type}?id=${id}`)
      this.props[functionName](newRes.data)
    } catch (err){
      alert(err.message)
    }
  }

  customerView(){
    const { type , id } = this.props.match.params
    let list = this.props.display.map((inte , i) => {
      return (
      <div key={i}>{inte.inte_flag} , {inte.inte_title} , {inte.inte_date} , {inte.inte_agent}
        <button onClick={() => this.props.history.push(`/info/interaction/${id}`)}>View</button>
      </div>
      )})
    const { cust_name , cust_email , cust_phone } = this.props.targetCustomerInfo
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

  ticketView(){
    let list = this.props.display.map((inte , i) => {
      return (<div key={i}>{inte.inte_flag} , {inte.inte_title} , {inte.inte_date} , {inte.inte_agent}</div>)})
    const { tick_id , tick_customer , tick_agent , tick_resolved } = this.props.targetTicketInfo
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

  interactionView(){
    const { inte_id , inte_title , inte_ticket , inte_body } = this.props.targetInteractionInfo
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
    const { type , id } = this.props.match.params
    this.props.history.push(`/edit/${type}/${id}`)
  }
    
    render(){
    return(
      <div>
        This is Info
      <Switch>
        <Route path='/info/customer/:id' render={this.customerView} />
        <Route path='/info/ticket/:id' render={this.ticketView} />
        <Route path='/info/interaction/:id' render={this.interactionView} />
      </Switch>
      </div>
    )
  }
}

function mapStateToProps(state){
  const { display , targetCustomerInfo , targetTicketInfo , targetInteractionInfo} = state
  return {
    display ,
    targetCustomerInfo ,
    targetTicketInfo ,
    targetInteractionInfo
  }
}

const actions = {
  targetCustomer ,
  targetTicket ,
  targetInteraction ,
  loadDisplay ,
  loadEditTarget ,
}

export default connect(mapStateToProps , actions)(Info)