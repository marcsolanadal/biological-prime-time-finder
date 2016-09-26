import React from 'react'
import classNames from 'classnames'

import styles from './Slider.css'

const Slider = (props) => {
  const { pointer, next, prev, position, isSwiping } = props

  let inlinePosition = (isSwiping)
    ? { transform: `translateX(${position}px)` }
    : {}

  const nextSlide = next && !isSwiping
  const previousSlide = prev && !isSwiping
  const repo1 = (!next && !prev) && !isSwiping
  const repo2 = (next && prev) && !isSwiping
  const repo3 = ((!next && !prev) || (next && prev)) && !isSwiping

  if (!isSwiping) debugger

  let containerStyles = classNames(styles.container, {
    [styles.nextSlide]: next && !isSwiping,
    [styles.previousSlide]: prev && !isSwiping
    //[styles.repositionSlide]: ((!next && !prev) || (next && prev)) && !isSwiping
  })

  return (
    <div style={inlinePosition} className={containerStyles} onTransitionEnd={props.onTransitionEnd}>

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

const { bool, number, array } = React.PropTypes
Slider.propTypes = {
  isSwiping: bool,
  pointer: number,
  position: number,
  prev: bool,
  next: bool,
  children: array
}

export default Slider
