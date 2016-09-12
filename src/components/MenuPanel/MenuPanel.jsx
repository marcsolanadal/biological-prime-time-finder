import React from 'react'

import styles from './MenuPanel.css'

const MenuPanel = (props) => (
  <nav className={styles.menuPanel}>
    <span>{props.title}</span>
  </nav>
)

const { string } = React.PropTypes
MenuPanel.propTypes = {
  title: string
}

export default MenuPanel
