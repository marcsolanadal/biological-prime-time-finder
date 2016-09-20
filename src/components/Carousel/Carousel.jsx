import React from 'react'

import style from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      swipeX: 0,
      current: 0,
      slideNumber: 0
    }
    this.getStartSwipePosition = this.getStartSwipePosition.bind(this)
    this.getEndSwipePosition = this.getEndSwipePosition.bind(this)
  }
  changeCurrent (key) { this.state.current = key }
  getStartSwipePosition (e) { this.state.swipeX = e.pageX }
  getEndSwipePosition (e) {
    let current = this.state.current
    const dX = e.pageX - this.state.swipeX

    // Checking that the swipe covers at least 20% of the screen
    if (Math.abs(dX) >= Math.abs(0.2 * window.innerWidth)) {
      // Checking the direction of the swipe
      if (dX > 0) {
        // Next position
        if (current >= 0 && current < this.state.slideNumber) {
          this.setState({ current: current + 1 })
        }
      } else {
        // Previous position
        if (current > 0 && current <= this.state.slideNumber) {
          this.setState({ current: current - 1 })
        }
      }
      console.log(`current: ${current}, slideNumber: ${this.state.slideNumber}`)
    }
  }
  render () {
    const slides = []
    React.Children.forEach(this.props.children, (slide, i) => {
      slides.push(
        <span className={style.slide} key={i}>{slide}</span>
      )
    })
    this.state.slideNumber = slides.length - 1
    return (
      <div className={style.container}>
        <div
          className={style.overlay}
          onMouseDown={this.getStartSwipePosition}
          onMouseUp={this.getEndSwipePosition}
        />
        <div className={style.slider}>{slides}</div>
        <Indicator
          number={slides.length}
          current={this.state.current}
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

import ClassNames from 'classnames'

const Indicator = (props) => {
  if (props.enabled) {
    const dots = []
    for (var i = 0; i < props.number; i++) {
      let dotClass = ClassNames(style.dot, {
        [style.green]: (props.current === i),
        [style.gray]: (props.current !== i)
      })
      dots.push(<div className={dotClass} key={i} />)
    }
    return <div className={style.indicator}>{dots}</div>
  } else {
    return <div />
  }
}

const { number, bool } = React.PropTypes
Indicator.propTypes = {
  number: number,
  current: number,
  enabled: bool
}

export default Carousel
