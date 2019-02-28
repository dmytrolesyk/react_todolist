/** @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import toggleModalAction from '../../../actions/modalActions/toggleModal'
import updateUserAction from '../../../actions/userActions/updateUser'
import type { ModalAction, User } from '../../../types'
import Button from '../../Button'

import './Modal.css'

type Props = {
  showModal: boolean,
  toggleModal: () => ModalAction,
  updateUser: (newUser: User) => any, 
  user: User,
}

type State = {
  checkedRadio: string,
}

class Modal extends Component<Props, State> {
  state = {
    checkedRadio: '',
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { user: { boardType } } = nextProps
  //   const { checkedRadio } = prevState
  //   if (checkedRadio !== boardType) {
  //     return {
  //       checkedRadio: boardType
  //     }
  //   }
  //   else {
  //     return null
  //   }
  // }

  componentDidMount() {
    const { user: { boardType } } = this.props
    this.setState({ checkedRadio: boardType })
  }

  onRadioClick = e => {
    console.log(e.target.value)
    this.setState({ checkedRadio: e.target.value})
  }

  changeBoardType = () => {
    const { user, updateUser, toggleModal } = this.props
    const { checkedRadio } = this.state
    const newUser = {
      ...user,
      boardType: checkedRadio,
    }
    console.log(newUser)
    updateUser(newUser)
    toggleModal()
  }

  render() {
    const { showModal, toggleModal, user: { boardType } } = this.props
    const { checkedRadio } = this.state
    if (showModal) {
      return (
        <div className="modal-background">
          <div className="modal-window">
            <span
              className="fas fa-times close-modal-icon"
              role="button"
              onClick={() => {
                this.setState({ checkedRadio: boardType })
                toggleModal()
              }}
              tabIndex={0}
              onKeyPress={() => {
                this.setState({ checkedRadio: boardType })
                toggleModal()
              }}
            />
            <p>Your board type:</p>
            <form className="modal-form">
              <div className="form-radio">
                <input
                  type="radio"
                  name="private"
                  value="private"
                  id="radio-priv"
                  onChange={this.onRadioClick}
                  checked={checkedRadio === "private"}
                />
                <label htmlFor="radio-priv" className="radio-label"/>
                <span className="radio-caption">Private</span>
              </div>
              <div className="form-radio">
                <input
                  type="radio"
                  name="public"
                  value="public"
                  id="radio-pub"
                  onChange={this.onRadioClick}
                  checked={checkedRadio === "public"}
                />
                <label htmlFor="radio-pub" className="radio-label"/>
                <span className="radio-caption">Public</span>
              </div>
              <Button
                color="btn-violet"
                size="btn-sm"
                text="Submit"
                onClick={this.changeBoardType}
              />
            </form>
          </div>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  showModal: state.showModal,
  user: state.user,
})
const mapDispatchToProps = {
  toggleModal: toggleModalAction,
  updateUser: updateUserAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
