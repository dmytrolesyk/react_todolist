import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = (props) => {
  const {
    color, size, text, onClick, optClasses,
  } = props
  let className = `${size} ${color}`
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

Button.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  optClasses: PropTypes.string,
}

Button.defaultProps = {
  size: 'btn-regular',
  optClasses: '',
}

export default Button
