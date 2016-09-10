import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import MenuButton from '../components/MenuButton/MenuButton'
import MenuPanel from '../components/MenuPanel/MenuPanel'

import styles from './Header.css'

class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false
    }
    this.toggleMenu = this.handleSpinner.bind(this)
  }
  toggleMenu () {
    this.setState({ 'visible': !this.state.visible })
  }
  render () {
    return (
      <nav className={styles.header}>
        <MenuButton callback={this.toggleMenu} />
        <ReactCSSTransitionGroup>
          { this.state.visible && <MenuPanel title='MENU' callback={this.toggleMenu} /> }
        </ReactCSSTransitionGroup>
      </nav>
    )
  }
}

export default Header
