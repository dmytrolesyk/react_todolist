/** @flow */

import React from 'react'
import Button from '../Button'
import './Toolbar.css'

type Props = {
  username: string,
}

const Toolbar = (props: Props) => {
  const { username } = props
  const greeting: string = `Hello, ${username}`
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

export default Toolbar
