import React , { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import Interaction from '../Interaction/Interaction';
import Info from '../Info/Info';
import Edit from '../Edit/Edit';
import { Switch , Route } from 'react-router-dom'

class Dashboard extends Component{

  render(){
    if(!this.props.agent.agent_id){this.props.history.push('/login')}
    console.log(this.props)
    return (
    <div className="dash-main">
      <div className="dash-inte">
        <Interaction/>
      </div>
      <div className="dash-right">
        <div className="dash-nav">
          <Nav/>
        </div>
        <div className="dash-info">
          <Switch>
            <Route path="/" component={Search} exact />
            <Route path="/info" component={Info} />
            <Route path="/edit" component={Edit} />
          </Switch>
        </div>
      </div>
    </div>)
  }
}

export default connect((state) => state)(Dashboard)