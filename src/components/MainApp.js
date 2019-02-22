import React from 'react'
import { connect } from 'react-redux'
import Toolbar from './Toolbar'
import AddTaskSection from './AddTaskSection/AddTaskSection'
import ManageTaskSection from './ManageTaskSection'
import logoutAction from '../actions/userActions/logoutAction'


const MainApp = (props) => {
  const { user, logout } = props
  return (
    <div>
      <Toolbar user={user} logout={logout} />
      <AddTaskSection />
      <ManageTaskSection />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  logout: logoutAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
