import React from 'react'
import PropTypes from 'prop-types'
import './TitleHolder.css'

const TitleHolder = (props) => {
  const { title } = props
  return (
    <div className="title-holder">
      <h2>{title}</h2>
    </div>
  )
}

TitleHolder.propTypes = {
  title: PropTypes.string.isRequired,
}

export default TitleHolder
