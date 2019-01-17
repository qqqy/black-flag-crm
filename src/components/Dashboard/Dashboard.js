import React , { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import Interaction from '../Interaction/Interaction';
import Info from '../Info/Info';
import Edit from '../Edit/Edit';
import { Switch , Route } from 'react-router-dom'
import { loadInteractions , loadCustomers, loadFlags, loadTasks , loginAgent } from '../../ducks/reducer'
import isLoggedIn from '../../lib/isLoggedIn'
import axios from 'axios';

class Dashboard extends Component{
  constructor(props){
    super(props)
  
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    isLoggedIn(this.props)
    const loaderArray = [this.props.loadInteractions , this.props.loadCustomers , this.props.loadFlags , this.props.loadTasks]
    const terms = ['interaction' , 'customer' , 'flag' , 'task' ]
    loaderArray.forEach(async (loader , i) => {
      const res = await axios.get('/load/' + terms[i]).catch(err => {return console.log(err)})
      loader(res.data)
    })
    console.log(this.props)
  }

  logout(){
    axios.post('/auth/logout').then(() => {
      this.props.loginAgent({})
      this.props.history.push('/login')
    })
    .catch((err) => {
      alert(err.message)
      this.props.loginAgent({})
      this.props.history.push('/login')
    })
  }

  render(){
    // console.log(this.props)
    return (
    <div className="dash-main">
      <div className="dash-inte">
        <Interaction/>
      </div>
      <div className="dash-right">
        <div className="dash-nav">
          <Nav logout={() => this.logout()}/>
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
  loadFlags ,
  loginAgent
}

export default connect((state) => state , actions)(Dashboard)