import React from 'react'

import Button from '../Button/Button'
import styles from './AddButton.css'

const AddButton = (props) => {
  return (
    <Button to={props.to} icon={props.icon} style={styles.button} />
  )
}

const { string } = React.PropTypes
AddButton.propTypes = {
  to: string.isRequired,
  icon: string
}

export default AddButton
