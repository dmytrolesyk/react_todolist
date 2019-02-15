/** @flow */

import { Component } from 'react'
import ReactDOM from 'react-dom'

const portalElement = document.getElementById('portal')


type Props = {
  removeNotification: (id: string) => void,
  notificationId: string,
  children: any
}

class NotificationPortal extends Component<Props, *> {
  constructor(props: Props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount = () => {
    if (portalElement) {
      const { removeNotification, notificationId } = this.props
      if (portalElement.children.length) {
        portalElement.insertBefore(this.el, portalElement.firstElementChild)
      } else {
        portalElement.appendChild(this.el)
      }
      setTimeout(() => {
        removeNotification(notificationId)
      }, 5000)
    }
  }

  el: HTMLDivElement

  render() {
    const { children } = this.props
    return ReactDOM.createPortal(
      children,
      this.el,
    )
  }
}

export default NotificationPortal
