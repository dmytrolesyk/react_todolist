import React from 'react'
import PropTypes from 'prop-types'
import './TextInputHolder.css'

const TextInputHolder = (props) => {
  const {
    name,
    value,
    placeholder,
    onChange,
    type,
  } = props
  return (
    <div className="input-holder">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="input"
      />
    </div>
  )
}

TextInputHolder.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}

TextInputHolder.defaultProps = {
  type: 'text',
}

export default TextInputHolder
