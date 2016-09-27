import React from 'react'
import classNames from 'classnames'

import styles from './Slider.css'

const Slider = (props) => {
  const { pointer, next, prev, position, isSwiping, isCentering } = props

  let inlinePosition = (isSwiping)
    ? { transform: `translateX(${position}px)` }
    : {}

  let containerStyles = classNames({
    [styles.nextSlide]: next && !isSwiping,
    [styles.previousSlide]: prev && !isSwiping,
    [styles.repositionSlide]: ((!next && !prev) || (next && prev)) && !isSwiping && isCentering
  })

  return (
    <div
      style={inlinePosition}
      className={containerStyles}
      onTransitionEnd={props.onTransitionEnd}
    >

      <div className={styles.leftSlide}>
        {props.children[pointer - 1]}
      </div>
      <div className={styles.centerSlide}>
        {props.children[pointer]}
      </div>
      <div className={styles.rightSlide}>
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

export default Slider
