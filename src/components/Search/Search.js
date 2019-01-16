import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { loadDisplay } from '../../ducks/reducer'
import axios from 'axios'

class Search extends Component{

  componentDidMount(){
    axios.get('/load/display')
    .then((res) => {
      this.props.loadDisplay(res.data)
    })
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