import React from 'react'
import ClassNames from 'classnames'

import styles from './Slider.css'

const Slider = (props) => {
  const { pointer, next, prev, position, isSwiping, isCentering } = props

  let inlinePosition = (isSwiping)
    ? { transform: `translateX(${position}px)` }
    : {}

  let sliderStyles = ClassNames(styles.slider, {
    [styles.next]: next && !isSwiping,
    [styles.previous]: prev && !isSwiping,
    [styles.reposition]: ((!next && !prev) || (next && prev)) && !isSwiping && isCentering
  })

  return (
    <div
      style={inlinePosition}
      className={sliderStyles}
      onTransitionEnd={props.onTransitionEnd}
    >

      <div className={styles.left}>
        {props.children[pointer - 1]}
      </div>
      <div className={styles.center}>
        {props.children[pointer]}
      </div>
      <div className={styles.right}>
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
