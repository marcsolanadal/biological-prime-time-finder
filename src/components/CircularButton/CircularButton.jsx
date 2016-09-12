import React from 'react'
import { Link } from 'react-router'

import styles from './CircularButton.css'

const CircularButton = (props) => (
  <Link to={`${props.to}`} className={styles.button}>
    <span>{props.icon}</span>
  </Link>
)

const { string } = React.PropTypes
CircularButton.propTypes = {
  to: string.isRequired,
  icon: string
}

export default CircularButton
