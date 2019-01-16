import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { loadDisplay } from '../../ducks/reducer'
import axios from 'axios'

class Search extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm: '' ,
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
      (result , i) => {return (
        <div className='search-result' key={i}>
          <p>{result.inte_title}</p>
          <p>{result.inte_date}</p>
          <p>{result.agent_name}</p>
          <p>{result.cust_name}</p>
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
        {results}
      </div>
    )
  }
}

function mapStateToProps(state){
  const { display } = state
  return {
    display
  }
}

export default connect(mapStateToProps , {loadDisplay})(Search)