import React from 'react'
import { Link } from 'react-router'

const Button = (props) => {
  const icon = (props.icon) ? <span>{props.icon}</span> : ''
  const img = (props.src) ? <img src={props.src} alt={props.text} /> : ''
  const text = (props.text) ? <span>{props.text}</span> : ''
  return (
    <Link to={`${props.to}`} className={props.style}>
      {img}
      {icon}
      {text}
    </Link>
  )
}

const { string } = React.PropTypes
Button.propTypes = {
  style: string.isRequired,
  to: string.isRequired,
  text: string,
  icon: string,
  src: string
}

export default Button
