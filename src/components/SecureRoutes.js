/** @flow */

import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import MainApp from './MainApp'

export default function SecureRoutes() {
  return (
    <Switch>
      <Route
        path="/board/:boardId?"
        component={MainApp}
      />
      <Redirect to="/board" />
    </Switch>
  )
}
