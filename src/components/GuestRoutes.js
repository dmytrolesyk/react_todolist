import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

export default function SecureRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Redirect to="/login" />
    </Switch>
  )
}
