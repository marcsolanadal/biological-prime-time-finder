import React from 'react'
import { Link } from 'react-router'

import styles from './CircleButton.css'

const CircleButton = (props) => {
  return (
    <Link to={`${props.to}`} className={styles.button}>
      <span>{props.icon}</span>
    </Link>
  )
}

const { string } = React.PropTypes
CircleButton.propTypes = {
  to: string.isRequired,
  icon: string
}

export default CircleButton
