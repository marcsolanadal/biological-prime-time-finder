import React from 'react'

import classNames from 'classnames'

import styles from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      items: [],
      pointer: 0,
      thereshold: 200,
      isSwiping: false,
      isTransitioning: false,
      swipePositionStart: 0,
      swipePositionEnd: 0,
      swipeCounter: 0,
      swipeDirection: 0,
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
  }
  swipeMove (e) {
    if (this.state.isSwiping) {
      if (this.state.optimizationCounter > 3) {
        // let right = (this.state.swipePositionEnd - e.pageX < 0)
        let isTransitioning = (Math.abs(this.state.swipeCounter) > this.state.thereshold)
        this.setState({
          isTransitioning: (Math.abs(this.state.swipeCounter) > this.state.thereshold),
          swipePositionEnd: e.pageX,
          swipeDirection: (this.state.swipePositionEnd - e.pageX < 0) ? 1 : -1,
          swipeCounter: this.state.swipePositionEnd - this.state.swipePositionStart,
          optimizationCounter: 0
        })
        // We can call the function to change the pointer to the items array here
        // TODO: Check if the render function paints the new pointer or the last one

        if (isTransitioning) {
          console.log('transitioning')
          console.log(`pointer: ${this.state.pointer}`)
          this.state.isTransitioning = false
        }
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
  }
  render () {
    const counter = this.state.swipeCounter
    const isSwiping = this.state.isSwiping
    const isTransitioning = this.state.isTransitioning
    const hasPrevious = (this.state.pointer > 0)
    const hasNext = (this.state.pointer < this.props.children.length)
    const left = (this.state.swipeDirection > 0)
    const right = !left

    const slidePosition = (!isTransitioning)
      ? { transform: `translateX(${counter}px)` }
      : {}

    // TODO: Apply resistence to the drag in case there is no next/prev element

    let leftClassNames = {
      [styles.leftSlideOut]: left && !isSwiping && !isTransitioning,
      [styles.leftSlideIn]: left && isTransitioning && hasPrevious
    }

    let rightClassNames = {
      [styles.rightSlideOut]: right && !isSwiping && !isTransitioning,
      [styles.rightSlideIn]: right && isTransitioning && hasNext
    }

    const leftSlideStyle = classNames(styles.leftSlide, leftClassNames)
    const rightSlideStyle = classNames(styles.rightSlide, rightClassNames)
    const centerSlideStyle = classNames(styles.centerSlide, leftClassNames, rightClassNames)

    return (

      <div
        className={styles.overlay}
        onMouseDown={this.swipeStart}
        onMouseMove={this.swipeMove}
        onMouseUp={this.swipeEnd}>

        <div style={slidePosition} className={leftSlideStyle}>
          {this.props.children[this.state.pointer - 1]}
        </div>

        <div style={slidePosition} className={centerSlideStyle}>
          {this.props.children[this.state.pointer]}
        </div>

        <div style={slidePosition} className={rightSlideStyle}>
          {this.props.children[this.state.pointer + 1]}
        </div>

      </div>
    )
  }
}

const { array } = React.PropTypes
Carousel.propTypes = {
  children: array
}

export default Carousel
