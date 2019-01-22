import React , { Component } from 'react';
import './Dashboard.scss';
import { connect } from 'react-redux';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import Interaction from '../Interaction/Interaction';
import Info from '../Info/Info';
import Edit from '../Edit/Edit';
import { Switch , Route } from 'react-router-dom'
import { loadInteractions , loadCustomers, loadFlags, loadTasks , loadTickets , loginAgent } from '../../ducks/reducer'
import isLoggedIn from '../../lib/isLoggedIn'
import axios from 'axios';
import testSVG from '../../svg/svgTest.svg'

class Dashboard extends Component{
  constructor(props){
    super(props)
  
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    // isLoggedIn(this.props)
    const loaderArray = [this.props.loadInteractions , this.props.loadCustomers , this.props.loadFlags , this.props.loadTasks , this.props.loadTickets]
    const terms = ['interaction' , 'customer' , 'flag' , 'task' , 'ticket' ]
    loaderArray.forEach(async (loader , i) => {
      try {
      const user = await axios.post('/auth/login' , {email: 't' , password: 't'}) // Line should be removed, passthrough
      this.props.loginAgent(user.data)  // Line should be removed, passthrough
      const res = await axios.get('/load/' + terms[i])
      loader(res.data)
      console.log(terms[i]+'s loaded ' , res.data)
      } catch (err) {return console.log(err)}
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
            <Route path="/info/:type/:id" component={Info} />
            <Route path="/edit/:type/:id" component={Edit} />
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
  loginAgent ,
  loadTickets ,
}

export default connect((state) => state , actions)(Dashboard)