import React from 'react'
import CSSModules from 'react-css-modules'

import Swipe from './Swipe.jsx'
import Slider from './Slider.jsx'
import Indicator from './Indicator.jsx'

import styles from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      pointer: 0,
      sliderPosition: 0,
      hasNext: false,
      hasPrevious: false,
      next: false,
      prev: false,
      isSwiping: false,
      isCentering: false,
      animationDirection: false,
      animationTransition: false
    }
    this.getSliderCommand = this.getSliderCommand.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.handlePointer = this.handlePointer.bind(this)
  }
  getPosition (position) {
    this.setState({
      isSwiping: true,
      sliderPosition: position
    })
  }
  getSliderCommand (data) {
    const { left, trigger } = data
    const { pointer } = this.state

    const nextSwipe = left && trigger
    const prevSwipe = !left && trigger

    const hasPrevious = (pointer > 0)
    const hasNext = (pointer < this.props.children.length - 1)

    this.setState({
      isSwiping: false,
      isCentering: true,
      animationDirection: left,
      animationTransition: trigger,
      hasNext: hasNext,
      hasPrevious: hasPrevious,
      next: nextSwipe && hasNext,
      prev: prevSwipe && hasPrevious
    })
  }
  handlePointer () {
    const { pointer, hasNext, hasPrevious, next, prev, animationTransition } = this.state
    if (animationTransition && hasNext && next) {
      this.setState({
        pointer: pointer + 1,
        next: false,
        isCentering: false
      })
    } else if (animationTransition && hasPrevious && prev) {
      this.setState({
        pointer: pointer - 1,
        prev: false,
        isCentering: false
      })
    }
  }
  render () {
    const { isSwiping, isCentering, pointer, sliderPosition, next, prev } = this.state
    const { thereshold } = this.props
    return (
      <div styleName='carousel'>
        <Swipe
          thereshold={0.25 * thereshold} // 25% of the total width to trigger next
          getPosition={this.getPosition}
          getCommand={this.getSliderCommand}
        />
        <Slider
          pointer={pointer}
          isSwiping={isSwiping}
          isCentering={isCentering}
          position={sliderPosition}
          next={next}
          prev={prev}
          onTransitionEnd={this.handlePointer}
        >
          {this.props.children}
        </Slider>
        <Indicator
          current={pointer}
          number={this.props.children.length}
          enabled={(pointer !== this.props.children.length - 1)}
        />
      </div>
    )
  }
}

const { array, number } = React.PropTypes
Carousel.propTypes = {
  children: array,
  thereshold: number
}

export default CSSModules(Carousel, styles)
