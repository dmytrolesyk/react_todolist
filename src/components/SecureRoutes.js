import React from 'react'

import { Route, Switch } from 'react-router-dom'
import MainApp from './MainApp'

export default function SecureRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={MainApp}
      />
    </Switch>
  )
}
