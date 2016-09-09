import React from 'react'

import Menu from '../components/Menu/Menu'
import AddButton from '../components/AddButton/AddButton'
import MenuButton from '../components/MenuButton/MenuButton'
import Spinner from '../components/Spinner/Spinner'

import styles from './Header.css'

class Header extends React.Component {
  constructor () {
    super()
    this.state = { loading: true }
    this.handleSpinner = this.handleSpinner.bind(this)
  }
  handleSpinner () {
    this.setState({ 'loading': !this.state.loading })
  }
  render () {
    return (
      <div style={styles}>
        <nav className={styles.header}>
          <Menu title='MENU'>
            <MenuButton to='overview' text='Overview' src='../../public/img/connect.png' />
            <MenuButton to='about' text='About' src='../../public/img/water.png' />
          </Menu>
        </nav>
        <div className={styles.spinner}>
          <Spinner />
        </div>
        <div className={styles.addButton}>
          <AddButton icon='+' to='about' />
        </div>
      </div>
    )
  }
}

export default Header
