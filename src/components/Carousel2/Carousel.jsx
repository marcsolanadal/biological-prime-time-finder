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
    this.handleSlideChange = this.handleSlideChange.bind(this)
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
  }
  swipeMove (e) {
    if (this.state.isSwiping) {
      if (this.state.optimizationCounter > 3) {
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
  }
  handleSlideChange () {
    const { pointer, swipeDirection, isTransitioning } = this.state
    const hasPrevious = (pointer > 0)
    const hasNext = (pointer < this.props.children.length)
    const left = (swipeDirection > 0)
    const right = !left

    console.log(`hasPrev: ${hasPrevious}, hasNext: ${hasNext}, left: ${left}, right: ${right}`)

    if (isTransitioning && right && hasNext) {
      this.setState({
        isTransitioning: false,
        pointer: pointer + 1
      })
    }
    if (isTransitioning && left && hasPrevious) {
      this.setState({
        isTransitioning: false,
        pointer: pointer - 1
      })
    }

    console.log(`pointer: ${this.state.pointer}`)
  }
  render () {
    const { pointer, swipeCounter, isSwiping, isTransitioning, swipeDirection } = this.state

    const hasPrevious = (pointer > 0)
    const hasNext = (pointer < this.props.children.length)
    const left = (swipeDirection > 0)
    const right = !left

    const slidePosition = (!isTransitioning)
      ? { transform: `translateX(${swipeCounter}px)` }
      : {}

    // TODO: Apply resistence to the drag in case there is no next/prev element

    let leftClassNames = {
      //[styles.leftSlideOut]: left && !isSwiping && !isTransitioning,
      [styles.leftSlideIn]: left && isTransitioning && hasPrevious
    }

    let rightClassNames = {
      //[styles.rightSlideOut]: right && !isSwiping && !isTransitioning,
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

        <div style={slidePosition} className={leftSlideStyle} onTransitionEnd={this.handleSlideChange}>
          {this.props.children[this.state.pointer - 1]}
        </div>

        <div style={slidePosition} className={centerSlideStyle}>
          {this.props.children[this.state.pointer]}
        </div>

        <div style={slidePosition} className={rightSlideStyle} onTransitionEnd={this.handleSlideChange}>
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
