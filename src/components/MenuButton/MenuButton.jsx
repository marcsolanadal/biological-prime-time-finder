import React from 'react'

import Button from '../Button/Button'
import styles from './MenuButton.css'

const MenuButton = (props) => {
  return (
    <Button {...props} style={styles.button} />
  )
}

const { string } = React.PropTypes
MenuButton.propTypes = {
  to: string.isRequired,
  icon: string,
  text: string
}

export default MenuButton
