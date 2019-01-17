import { Route, Switch } from 'react-router-dom';
import React from 'react'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Settings from './components/Settings/Settings'
import Dashboard from './components/Dashboard/Dashboard'

export default (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/settings" component={Settings} />
    <Route path="/info/:type/:id" component={Dashboard} />
    <Route path="/" component={Dashboard} exact />
  </Switch>
)