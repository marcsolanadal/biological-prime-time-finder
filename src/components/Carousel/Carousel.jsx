import React from 'react'

import Indicator from './Indicator'

import style from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      swipe: false,
      swipeStartX: 0,
      swipeEndX: 0,
      sliderPosition: 0,
      sliderLastPosition: 0,
      sliderStepSize: 5,
      currentSlide: 0,
      numberSlides: 0,
      sensitivity: 3,
      counter: 0
    }
    this.getStartSwipePosition = this.getStartSwipePosition.bind(this)
    this.getEndSwipePosition = this.getEndSwipePosition.bind(this)
    this.moveSlider = this.moveSlider.bind(this)
  }
  getStartSwipePosition (e) {
    this.setState({
      swipe: true,
      swipeStartX: e.pageX
    })
  }
  moveSlider (e) {
    // Detecting if we're currently on a swipe movement
    if (this.state.swipe) {
      // Only executing every x steps for optimization
      if (this.state.counter === this.state.sensitivity) {
        const sign = ((e.pageX - this.state.sliderLastPosition) > 0) ? 1 : -1
        const dX = sign * this.state.sliderStepSize
        this.setState({
          sliderPosition: this.state.sliderPosition + dX,
          sliderLastPosition: e.pageX,
          counter: 0
        })
        // console.log(`pageX: ${e.pageX}, dX: ${dX}, sliderPosition: ${this.state.sliderPosition}`)
      } else {
        this.state.counter++
      }
    }
  }
  getEndSwipePosition (e) {
    let current = this.state.currentSlide
    const dX = e.pageX - this.state.swipeStartX

    this.setState({ swipe: false })

    // Checking that the swipe covers at least 20% of the screen
    if (Math.abs(dX) >= Math.abs(0.2 * window.innerWidth)) {
      // Checking the direction of the swipe
      if (dX < 0) {
        // Next position
        if (current >= 0 && current < this.state.numberSlides) {
          this.setState({ currentSlide: current + 1 })
        }
      } else {
        // Previous position
        if (current > 0 && current <= this.state.numberSlides) {
          this.setState({ currentSlide: current - 1 })
        }
      }
    }
  }
  render () {
    const slides = []
    React.Children.forEach(this.props.children, (slide, i) => {
      slides.push(
        <span className={style.slide} key={i}>{slide}</span>
      )
    })
    var sliderStyle = {
      transform: `translateX(${this.state.sliderPosition}px)`
    }
    this.state.numberSlides = slides.length - 1
    return (
      <div className={style.container}>
        <div
          className={style.overlay}
          onMouseDown={this.getStartSwipePosition}
          onMouseMove={this.moveSlider}
          onMouseUp={this.getEndSwipePosition}
        />
        <div className={style.slider} style={sliderStyle}>{slides}</div>
        <Indicator
          number={slides.length}
          current={this.state.currentSlide}
          enabled />
      </div>
    )
  }

}

const { array, func } = React.PropTypes
Carousel.propTypes = {
  children: array,
  handleSlides: func
}

export default Carousel
