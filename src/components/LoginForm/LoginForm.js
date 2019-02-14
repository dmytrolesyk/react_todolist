/** @flow */

import React, { Component } from 'react'
import TitleHolder from '../TitleHolder'
import TextInputHolder from '../TextInputHolder'
import Button from '../Button'
import http from '../../utilities/http'

import type { User, Task } from '../../types'
import './LoginForm.css'

type Props = {
  uponLogin: (user: User) => Promise<Array<Task>>
}

type State = {
  singUpState: boolean,
  usernameInput: string,
  passwordInput: string,
  confirmPasswordInput: string,
}


class LoginForm extends Component<Props, State> {
  state = {
    singUpState: false,
    usernameInput: '',
    passwordInput: '',
    confirmPasswordInput: '',
  }

  onChange = (e: any):void => this.setState({ [e.target.name]: e.target.value })

  register = async ():Promise<any> => {
    const { uponLogin } = this.props
    const { usernameInput, passwordInput, confirmPasswordInput } = this.state
    if (!usernameInput || !passwordInput) {
      alert('Input username and password')
      this.setState({
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
      })
      return
    }
    if (passwordInput !== confirmPasswordInput) {
      alert('Password does not match!')
      this.setState({
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
      })
      return
    }

    const res = await http.post('http://localhost:3008/register', { username: usernameInput, password: passwordInput })
    if (!res.success) {
      alert('Username exists')
    } else {
      uponLogin(res.data)
    }
  }

  login = async ():Promise<any> => {
    const { uponLogin } = this.props
    const { usernameInput, passwordInput } = this.state
    if (!usernameInput || !passwordInput) {
      alert('Input username and password')
      this.setState({
        usernameInput: '',
        passwordInput: '',
      })
      return
    }
    const res = await http.post('http://localhost:3008/login', { username: usernameInput, password: passwordInput })
    if (!res.success) {
      alert('Username or password is incorrect')
      this.setState({
        usernameInput: '',
        passwordInput: '',
      })
    } else {
      uponLogin(res.data)
    }
  }

  render() {
    const {
      singUpState,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
    } = this.state
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
            onClick={this.login}
          />
        ) : null}
        {singUpState ? (
          <Button
            color="btn-violet"
            size="btn-regular btn-block"
            text="Sign up"
            onClick={this.register}
          />
        ) : null}
      </form>
    )
  }
}

export default LoginForm
