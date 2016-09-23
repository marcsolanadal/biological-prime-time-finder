import React from 'react'
// import update from 'react-addons-update'
import cx from 'classnames'

import styles from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      pointer: 0,
      thereshold: 200,
      isSwiping: false,
      isTransitioning: false,
      swipePositionStart: 0,
      swipePositionEnd: 0,
      swipeDirection: 0,
      swipeCounter: 0,
      optimizationCounter: 0
    }
    this.swipeStart = this.swipeStart.bind(this)
    this.swipeMove = this.swipeMove.bind(this)
    this.swipeEnd = this.swipeEnd.bind(this)
  }
  swipeStart (e) {
    this.setState({
      isSwiping: true,
      isTransitioning: false,
      swipePositionStart: e.pageX,
      swipePositionEnd: e.pageX,
      swipeDirection: 0,
      swipeCounter: 0
    })
    console.log(`SWIPE START. isSwiping: ${this.state.isSwiping}, isTransitioning: ${this.state.isTransitioning}`)
    console.log('state: ', this.state)
  }
  swipeMove (e) {
    if (this.state.isSwiping) { // Detecting the swipe
      if (this.state.optimizationCounter > 3) { // Optimizing the sample rate of the swipe
        const direction = (this.state.swipePositionEnd - e.pageX < 0) ? 5 : -5
        const dx = this.state.swipePositionEnd - this.state.swipePositionStart
        //console.log(`start: ${this.state.swipePositionStart}, end: ${this.state.swipePositionEnd}, dx: ${dx}`)
        //console.log('state: ', this.state)
        this.setState({
          isTransitioning: (Math.abs(this.state.swipeCounter) > this.state.thereshold),
          swipePositionEnd: e.pageX,
          swipeDirection: direction,
          swipeCounter: dx,
          optimizationCounter: 0
        })
      } else {
        this.state.optimizationCounter++
      }
    }
  }
  swipeEnd (e) {
    this.setState({
      isSwiping: false,
      isTransitioning: false,
      swipeCounter: 0,
      swipePositionStart: 0,
      swipePositionEnd: 0
    })
    console.log(`SWIPE END. isSwiping: ${this.state.isSwiping}, isTransitioning: ${this.state.isTransitioning}`)
    console.log('\tstate: ', this.state)
  }
  render () {
    const counter = this.state.swipeCounter
    const isSwiping = this.state.isSwiping
    const isTransitioning = this.state.isTransitioning
    const direction = this.state.swipeDirection

    const slidePosition = (!isTransitioning)
      ? { transform: `translateX(${counter}px)` }
      : {}

    let leftSlideStyle = cx(styles.leftSlide, {
      [styles.leftSlideOut]: !isSwiping && !isTransitioning && (direction > 0),
      [styles.leftSlideIn]: isTransitioning && (direction > 0)
    })

    let rightSlideStyle = {}

    return (
      <div className={styles.overlay}
        onMouseDown={this.swipeStart}
        onMouseMove={this.swipeMove}
        onMouseUp={this.swipeEnd}
        onMouseLeave={this.swipeEnd}>

        <div style={slidePosition} className={leftSlideStyle} />
        <div style={slidePosition} className={styles.centerSlide} />
        <div className={rightSlideStyle} />

      </div>
    )
  }
}

export default Carousel
