import React , { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import Interaction from '../Interaction/Interaction';
import Info from '../Info/Info';
import Edit from '../Edit/Edit';
import { Switch , Route } from 'react-router-dom'
import { loadInteractions , loadCustomers, loadFlags, loadTasks } from '../../ducks/reducer'
import Axios from 'axios';

class Dashboard extends Component{

  componentDidMount(){
    const loaderArray = [this.props.loadInteractions , this.props.loadCustomers , this.props.loadFlags , this.props.loadTasks]
    const terms = ['interaction' , 'customer' , 'flag' , 'task' ]
    loaderArray.forEach(async (loader , i) => {
      const res = await Axios.get('/load/' + terms[i]).catch(err => {return console.log(err)})
      loader(res.data)
    })
    console.log(this.props)
  }

  render(){
    if(!this.props.agent.agent_id){this.props.history.push('/login')}
    // console.log(this.props)
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

const actions = {
  loadCustomers ,
  loadInteractions ,
  loadTasks ,
  loadFlags
}

export default connect((state) => state , actions)(Dashboard)