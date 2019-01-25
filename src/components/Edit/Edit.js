import React, { Component } from 'react';
import './Edit.scss';
import axios from 'axios'
import { connect } from 'react-redux'
import { loadEditTarget, targetInteraction } from '../../ducks/reducer'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target: {},
      test: 'Select an Option',
      content: {},
      ready: false,
      lists: 100,
    }
  }

  async componentDidMount() {
    // a filter needs to be added here to determine which layout we're using //
    this.setState({ lists: 3 })
    await this.loadOptions('flag_id , flag_name', 'flag')
    await this.loadOptions('tick_id , tick_title', 'ticket')
    await this.loadOptions('agent_id , agent_name', 'agent')
    // console.log('survey says' , this.layoutInteraction())

    // console.log('Edit Props:' , this.props)
    const { type, id } = this.props.match.params
    try {
      let res = await axios.get(`/target/${type}?id=${id}`)
      this.props.loadEditTarget(res.data)
      this.props.targetInteraction(res.data)
      this.setState({ target: res.data })
    } catch (err) {
      alert(err.message)
    }
  }

  loadOptions = async (column, table) => {
    let options = []
    if (!column || !table) { return alert('createDropMenu requires a column argument and table argument') }
    try {
      let res = await axios.get(`/load/${column}/${table}`)
      options = res.data
    } catch (error) {
      console.log(error.message)
    }
    this.setState({ content: { ...this.state.content, [table]: options }, lists: this.state.lists - 1 })
    // console.log('loadOptions Complete, content is now' , this.state.content)
  }

  createOptions = (table, idColumn, nameColumn) => {
    const options = this.state.content[table].map((option, i) => {
      // console.log(option)
      return (
        <option key={`${table}_${i}`} value={option[idColumn]} >[{option[idColumn]}] {option[nameColumn]}</option>
      )
    })
    return options
  }

  layoutInteraction = () => {
    let flagOptions = this.createOptions('flag', 'flag_id', 'flag_name')
    let agentOptions = this.createOptions('agent', 'agent_id', 'agent_name')
    let ticketOptions = this.createOptions('ticket', 'tick_id', 'tick_title')

    return (
      <>
        <div className="edit-left">
          <div className="edit-cust-droplist">
            <div className="edit-space">
            <label htmlFor="flag">Change Flag</label>
            </div>
            <select className="dropdown" name="flag" value={this.state.target.inte_flag} onChange={(e) => this.setState({ target: { ...this.state.target, inte_flag: e.target.value } })}>
              {flagOptions}
            </select>
            <div className="edit-space">
              <label htmlFor="agent">Assign Agent</label>
            </div>
            <select className="dropdown" name="agent" value={this.state.target.inte_agent} onChange={(e) => this.setState({ target: { ...this.state.target, inte_agent: e.target.value } })}>
              {agentOptions}
            </select>
            <div className="edit-space">
              <label htmlFor="ticket">Assign Ticket</label>
            </div>
            <select className="dropdown" name="ticket" value={this.state.target.inte_ticket} onChange={(e) => this.setState({ target: { ...this.state.target, inte_ticket: e.target.value } })}>
              {ticketOptions}
            </select>
          </div>
        </div>
        <div className="edit-body">
          <div className="edit-space">
            <label htmlFor="title">Title</label>
          </div>
          <p className="edit-space"><input className="edit-title-input" name="title" label="inte_title" defaultValue={this.props.editTarget.inte_title} onChange={(e) => this.setState({ target: { ...this.state.target, inte_title: e.target.value } })} /> </p>
          <div className="edit-space">
            <label htmlFor="body">Body</label>
          </div>
          <textarea name="body" label="inte_body" value={this.state.target.inte_body} onChange={(e) => this.setState({ target: { ...this.state.target, inte_body: e.target.value } })} />
          <button onClick={this.saveEdit}>Save Changes</button>
          <button onClick={this.discard}>Discard Changes</button>
          <button onClick={this.delete}>Delete Interaction</button>
        </div>
      </>
    )
  }

  saveEdit = async () => {
    const { type } = this.props.match.params
    let res = await axios.patch('/save/' + type, this.state.target)
    this.props.targetInteraction(res.data)
    this.props.history.goBack()
  }

  delete = async () => {
    const { type, id } = this.props.match.params
    var name = ''
    var column = ''
    var pushString = '/'
    switch (type) {
      case 'interaction':
        name = 'inte_title'
        column = 'inte_id'
        pushString = `/info/customer/${this.props.targetCustomerInfo.cust_id}`
        break
      case 'ticket':
        name = 'tick_title'
        column = 'tick_id'
        break;
      case 'customer':
        name = 'cust_name'
        column = 'cust_id'
        break;
      default: return alert('Invalid Type -- Check Switch!')
    }
    try {
      await axios.delete(`/delete/${type}/${column}/${id}`)
      alert(`"${this.props.editTarget[name]}" Deleted!`)
      this.props.loadEditTarget({})
      this.props.history.push('/')
    } catch (error) {
      alert("Unable to Delete! Reason:" + error)
    }
  }

  discard = () => {
    const { type, id } = this.props.match.params
    this.props.history.push(`/info/${type}/${id}`)
    // console.log(type , id)
  }

  render() {
    // console.log(this.props)
    let loading = (<div>Loading...</div>)
    return (
      <div className="edit-main">
        {!this.state.lists ? this.layoutInteraction() : loading}
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { editTarget, targetCustomerInfo } = state
  return {
    editTarget,
    targetCustomerInfo,
  }
}

export default connect(mapStateToProps, { loadEditTarget, targetInteraction })(Edit)