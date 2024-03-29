import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './Slider.scss'

const Slider = (props) => {
  const { pointer, next, prev, position, isSwiping, isCentering } = props

  let inlineStyle = {}
  let sliderClass = 'slider' // IMPORTANT: default value

  if (!isSwiping) {
    if (next) { sliderClass = 'next' }
    if (prev) { sliderClass = 'previous' }
    if (((!next && !prev) || (next && prev)) && isCentering) {
      sliderClass = 'reposition'
    }
    if (position === 0) { sliderClass = 'slider' } /* z-index button fix */
  } else {
    inlineStyle = { transform: `translateX(${position}px)` }
  }

  return (
    <div
      style={inlineStyle}
      styleName={sliderClass}
      onTransitionEnd={props.onTransitionEnd}
    >

      <div styleName='left'>
        {props.children[pointer - 1]}
      </div>
      <div styleName='center'>
        {props.children[pointer]}
      </div>
      <div styleName='right'>
        {props.children[pointer + 1]}
      </div>

    </div>
  )
}

const { bool, number, array, func } = React.PropTypes
Slider.propTypes = {
  isSwiping: bool,
  isCentering: bool,
  pointer: number,
  position: number,
  prev: bool,
  next: bool,
  onTransitionEnd: func,
  children: array
}

export default CSSModules(Slider, styles)
