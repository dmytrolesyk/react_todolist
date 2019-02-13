/** @flow */

import React from 'react'
import './Button.css'

type Props = {
  color: string,
  size: string,
  text: string,
  onClick: any=>any,
  optClasses?: string,
}

const Button = (props: Props) => {
  const {
    color, size, text, onClick, optClasses,
  } = props
  let className: string = `${size} ${color}`
  if (optClasses) className += ` ${optClasses}`
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  optClasses: '',
}

export default Button
