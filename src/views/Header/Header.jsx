import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'

import MenuButton from '../../components/MenuButton/MenuButton'
import MenuPanel from '../../components/MenuPanel/MenuPanel'

import styles from './Header.css'

class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu () {
    this.setState({ 'visible': !this.state.visible })
  }
  render () {
    let overlayClassName = classNames(styles.overlay, {
      [styles.fadeIn]: this.state.visible,
      [styles.fadeOut]: !this.state.visible
    })
    return (
      <nav className={styles.header}>
        <span className={overlayClassName} onClick={this.toggleMenu} />
        <MenuButton callback={this.toggleMenu} />
        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { this.state.visible && <MenuPanel title='MENU' /> }
        </ReactCSSTransitionGroup>
      </nav>
    )
  }
}

export default Header
