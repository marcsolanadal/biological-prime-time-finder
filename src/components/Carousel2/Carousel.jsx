import React from 'react'

import classNames from 'classnames'

import styles from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      slider: {
        pointer: 0,
        thereshold: 200,
        isCentering: false,
        isTransitioning: false,
        hasPrevious: false,
        hasNext: false
      },
      swipe: {
        isSwiping: false,
        swipePositionStart: 0,
        swipePositionEnd: 0,
        swipeCounter: 0,
        left: false,
        right: false,
        optimizationCounter: 0
      }
    }
    this.swipeStart = this.swipeStart.bind(this)
    this.swipeMove = this.swipeMove.bind(this)
    this.swipeEnd = this.swipeEnd.bind(this)
    this.handleSlideChange = this.handleSlideChange.bind(this)
  }
  swipeStart (e) {
    this.setState({
      slider: {
        isCentering: false
      },
      swipe: {
        isSwiping: true,
        swipePositionStart: e.pageX,
        swipePositionEnd: e.pageX,
        left: false,
        right: false,
        swipeCounter: 0
      }
    })
  }
  swipeMove (e) {
    const { isSwiping, optimizationCounter, swipePositionEnd, swipeCounter } = this.state.swipe
    const { pointer, thereshold } = this.state.slider
    let { hasPrevious, hasNext } = this.state.slider

    if (isSwiping) {
      if (optimizationCounter > 3) {
        const left = (swipePositionEnd - e.pageX < 0)
        const isTransitioning = (Math.abs(swipeCounter) > thereshold)

        if (isTransitioning) {
          hasPrevious = (pointer > 0)
          hasNext = (pointer < this.props.children.length)
        }

        this.setState({
          slider: {
            isTransitioning: isTransitioning,
            hasPrevious: hasPrevious,
            hasNext: hasNext
          },
          swipe: {
            swipeCounter: this.state.swipePositionEnd - this.state.swipePositionStart,
            swipePositionEnd: e.pageX,
            left: left,
            right: !left,
            optimizationCounter: 0
          }
        })
      } else {
        this.state.optimizationCounter++
      }
    }
  }
  swipeEnd (e) {
    this.setState({
      slider: {
        isCentering: true
      },
      swipe: {
        isSwiping: false,
        swipeCounter: 0,
        swipePositionStart: 0,
        swipePositionEnd: 0
      }
    })
  }
  handleSlideChange () {
    const { left, right } = this.state.swipe
    const { pointer, isTransitioning, hasPrevious, hasNext } = this.state.slider

    if (isTransitioning && right && hasNext) {
      this.setState({
        slider: {
          pointer: pointer + 1,
          isCentering: false,
          isTransitioning: false
        }
      })
    }
    if (isTransitioning && left && hasPrevious) {
      this.setState({
        slider: {
          pointer: pointer - 1,
          isCentering: false,
          isTransitioning: false
        }
      })
    }

    console.log(`pointer: ${pointer}`)
  }
  render () {
    const { pointer, isCentering, isTransitioning, hasPrevious, hasNext } = this.state.slider
    const { isSwiping, swipeCounter, left, right } = this.state.swipe

    const slidePosition = (!isTransitioning)
      ? { transform: `translateX(${swipeCounter}px)` }
      : {}

    let leftClassNames = {
      [styles.repositionSlide]: left && isCentering && !isSwiping,
      [styles.leftSlideIn]: left && isTransitioning && hasPrevious
    }

    let rightClassNames = {
      [styles.repositionSlide]: right && isCentering && !isSwiping,
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
          {this.props.children[pointer - 1]}
        </div>

        <div style={slidePosition} className={centerSlideStyle}>
          {this.props.children[pointer]}
        </div>

        <div style={slidePosition} className={rightSlideStyle} onTransitionEnd={this.handleSlideChange}>
          {this.props.children[pointer + 1]}
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
