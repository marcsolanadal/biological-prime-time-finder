import React from 'react'

import classNames from 'classnames'

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
        this.setState({
          isTransitioning: (Math.abs(this.state.swipeCounter) > this.state.thereshold),
          swipePositionEnd: e.pageX,
          swipeDirection: (this.state.swipePositionEnd - e.pageX < 0) ? 1 : -1,
          swipeCounter: this.state.swipePositionEnd - this.state.swipePositionStart,
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

    const left = (this.state.swipeDirection > 0)
    const right = !left

    const slidePosition = (!isTransitioning)
      ? { transform: `translateX(${counter}px)` }
      : {}

    let leftClassNames = {
      [styles.leftSlideOut]: left && !isSwiping && !isTransitioning,
      [styles.leftSlideIn]: left && isTransitioning
    }

    let rightClassNames = {
      [styles.rightSlideOut]: right && !isSwiping && !isTransitioning,
      [styles.rightSlideIn]: right && isTransitioning
    }

    let leftSlideStyle = classNames(styles.leftSlide, leftClassNames)
    let rightSlideStyle = classNames(styles.rightSlide, rightClassNames)
    let centerSlideStyle = classNames(styles.centerSlide, leftClassNames, rightClassNames)

    return (
      <div
        onMouseDown={this.swipeStart}
        onMouseMove={this.swipeMove}
        onMouseUp={this.swipeEnd}>

        <div style={slidePosition} className={leftSlideStyle}>
          <h1>Mercy</h1>
        </div>

        <div style={slidePosition} className={centerSlideStyle}>
          <h1>Lucio</h1>
        </div>

        <div style={slidePosition} className={rightSlideStyle}>
          <h1>Zenyatta</h1>
        </div>

      </div>
    )
  }
}

export default Carousel