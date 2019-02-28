/** @flow */

import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import MainApp from './MainApp'
import PublicBoards from './PublicBoards'

export default function SecureRoutes() {
  return (
    <Switch>
      <Route
        path="/board/:boardId?"
        component={MainApp}
      />
      <Route
        path="/boards"
        component={PublicBoards}
      />
      <Redirect to="/board" />
    </Switch>
  )
}
