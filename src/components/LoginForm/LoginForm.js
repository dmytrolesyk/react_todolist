/** @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import loginAction from '../../actions/userActions/login'
import registerAction from '../../actions/userActions/register'
import addNotification from '../../actions/notificationsActions/addNotification'

import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'

import './LoginForm.css'

type State = {
  singUpState: boolean,
  usernameInput: string,
  passwordInput: string,
  confirmPasswordInput: string,
  publicBoardCheckbox: boolean,
}


class LoginForm extends Component<*, State> {
  state = {
    singUpState: false,
    usernameInput: '',
    passwordInput: '',
    confirmPasswordInput: '',
    publicBoardCheckbox: false,
  }

  onChange = (e: any):void => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {
      singUpState,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      publicBoardCheckbox,
    } = this.state
    const {
      login,
      register,
    } = this.props

    return (
      <form className="login-form">
        {!singUpState ? (
          <TitleHolder
            title="Log in to your account"
          />
        ) : null}
        {singUpState ? (
          <TitleHolder
            title="Create an account"
          />
        ) : null}
        <TextInputHolder
          name="usernameInput"
          value={usernameInput}
          placeholder="Username"
          onChange={this.onChange}
        />
        <TextInputHolder
          name="passwordInput"
          value={passwordInput}
          type="password"
          placeholder="Password"
          onChange={this.onChange}
        />
        {singUpState ? (
          <TextInputHolder
            name="confirmPasswordInput"
            value={confirmPasswordInput}
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
        ) : null}
        {!singUpState ? (
          <div className="row">
            <div className="col col-half center">
              <Button
                color="btn-transparent"
                size="btn-regular"
                text="Sign Up"
                onClick={() => this.setState({ singUpState: true })}
              />
            </div>
            <div className="col col-half center">
              <Button
                color="btn-transparent"
                size="btn-regular"
                text="Forgot Password?"
              />
            </div>
          </div>
        ) : null}
        {!singUpState ? (
          <Button
            color="btn-violet"
            size="btn-regular btn-block"
            text="Log in"
            onClick={() => login(usernameInput, passwordInput)}
          />
        ) : null}
        {singUpState ? (
          <div style={{ position: 'relative' }}>
            <span>Check if you would like your board to be publicly accessible</span>
            <input
              type="checkbox"
              defaultChecked={publicBoardCheckbox}
              id="publicCheckbox"
              onClick={() => this.setState({ publicBoardCheckbox: !publicBoardCheckbox })}
            />
            <label htmlFor="publicCheckbox" className="checkbox-label checkbox-label-registration" />
            <Button
              color="btn-violet"
              size="btn-regular btn-block"
              text="Sign up"
              onClick={() => register(usernameInput, passwordInput, confirmPasswordInput, publicBoardCheckbox)}
            />
          </div>
        ) : null}
      </form>
    )
  }
}

const mapDispatchToProps = {
  login: loginAction,
  register: registerAction,
  addNotification,
}

export default connect(null, mapDispatchToProps)(LoginForm)
