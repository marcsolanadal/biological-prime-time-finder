import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'

import styles from './Button.scss'

/*
class Button extends React.Component {
  render (props) {
    return (
      <Link to={props.to}>
        <div styleName={props.type} onClick={props.callback}>
          {props.text}
        </div>
      </Link>
    )
  }
}
*/

const Button = (props) => {
  return (
    <Link to={props.to}>
      <div styleName={props.type} onClick={props.callback}>{props.text}</div>
    </Link>
  )
}

/*
const Button = (props) => (
  <Link to={props.to}>
    <div styleName={props.type} onClick={props.callback}>{props.text}</div>
  </Link>
)
*/

const { string, func } = React.PropTypes
Button.propTypes = {
  to: string,
  type: string,
  text: string,
  callback: func
}

export default CSSModules(Button, styles)
