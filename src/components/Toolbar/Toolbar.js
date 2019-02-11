import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import './Toolbar.css'


const Toolbar = (props) => {
  const { username } = props
  const greeting = `Hello, ${username}`
  return (
    <div className="toolbar">
      <div className="greeting">{greeting}</div>
      <Button
        color="btn-violet"
        size="btn-sm"
        text="Log out"
        optClasses="btn-logout"
        onClick={() => console.log('Test')}
      />
    </div>
  )
}

Toolbar.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Toolbar
