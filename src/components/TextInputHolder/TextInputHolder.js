/** @flow */

import React from 'react'
import './TextInputHolder.css'

type Props = {
  name: string,
  value: string,
  placeholder: string,
  onChange: any=>any,
  onKeyPress: any=>any,
  type: string,
}

const TextInputHolder = (props: Props) => {
  const {
    name,
    value,
    placeholder,
    onChange,
    type,
    onKeyPress,
  } = props
  const keyPressHandler = (e) => {
    if (e.key === 'Enter') onKeyPress()
  }
  return (
    <div className="input-holder">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="input"
        onKeyPress={keyPressHandler}
      />
    </div>
  )
}


export default TextInputHolder
