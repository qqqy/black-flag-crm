import React, { Component } from 'react';
import './Search.scss';
import { connect } from 'react-redux';
import { loadDisplay } from '../../ducks/reducer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Flag from '../Flag/Flag';

class Search extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm: '' ,
      customerSort: false ,
    }
    this.search = this.search.bind(this)
  }

  componentDidMount(){
    axios.get('/load/display')
    .then((res) => {
      this.props.loadDisplay(res.data)
    })
  }

  async search(){
    const { searchTerm } = this.state
    try {
      let res = await axios.get('/search/' + searchTerm)
      this.props.loadDisplay(res.data)
      this.setState({searchTerm: ''})
    } catch(err) {
      alert(err.message)
    }
  }
  
  render(){
    const results = this.props.display.map(
      (result , i) => {
        const flag = this.props.flags.length > 0 ? <Flag id={result.flag_id} /> : ''
          return (
        <div className='card search-result' key={i}>
          <div className="flag">
            {flag}
          </div>
          <div className="card-info">
          <div onClick={() => this.props.history.push(`/info/customer/${result.cust_id}`)}>Client: {result.cust_name}</div>
          <div onClick={() => this.props.history.push(`/info/ticket/${result.tick_id}`)}>Ticket: {result.tick_id}</div>
          <div onClick={() => this.props.history.push(`/info/agent/${result.agent_id}`)}>Agent: {result.agent_name}</div>
          </div>
          <div className="card-content" onClick={() => this.props.history.push(`/info/interaction/${result.inte_id}`)}>
          <p className="title">{result.inte_title}</p>
          <p>{result.inte_date}</p>
          <p>{result.inte_body}</p>
          </div>
        </div>
      )}
    )
    return (
      <div className="search-main">
      <div className="search-bar">
        <input 
          onChange={(e) => this.setState({searchTerm: e.target.value})}
          value={this.state.searchTerm}
        />
        <button
          onClick={this.search}
        >Search</button>
      </div>
      <input type="checkbox" onChange={() => this.setState({customerSort: !this.state.customerSort})}/>
      <span>Sort by Customer</span>
        {results}
      </div>
    )
  }
}

function mapStateToProps(state){
  const { display , flags } = state
  return {
    display ,
    flags ,
  }
}

export default connect(mapStateToProps , {loadDisplay})(Search)