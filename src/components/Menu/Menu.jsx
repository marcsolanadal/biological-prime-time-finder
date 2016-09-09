import React from 'react'

import SidePanel from '../SidePanel/SidePanel'

import styles from './Menu.css'

class Menu extends React.Component {
  constructor () {
    super()
    this.state = {
      locked: true,
      visible: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleBackClick = this.handleBackClick.bind(this)
  }
  handleButtonClick () {
    if (!this.state.visible) {
      this.setState({ locked: false, visible: true })
    }
  }
  handleBackClick () {
    this.setState({ visible: false })
  }
  render () {
    return (
      <div onClick={this.handleButtonClick}>
        <div className={styles.icon}>
          <div />
          <div />
          <div />
        </div>
        <SidePanel locked={this.state.locked} visible={this.state.visible} callback={this.handleBackClick}>
          <span>{this.props.title}</span>
          {this.props.children}
        </SidePanel>
      </div>
    )
  }
}

const { array, string } = React.PropTypes
Menu.propTypes = {
  children: array,
  title: string
}

export default Menu
