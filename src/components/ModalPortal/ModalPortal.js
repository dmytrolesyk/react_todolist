// import React from 'react'
import ReactDOM from 'react-dom'

const modalPortal = document.getElementById('modal-portal')


const ModalPortal = (props) => {
  if (modalPortal) {
    return ReactDOM.createPortal(
      props.children,
      modalPortal,
    )
  }
  return null
}

export default ModalPortal
