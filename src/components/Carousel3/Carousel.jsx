import React from 'react'
// import classNames from 'classnames'

import Swipe from './Swipe.jsx'
import Slider from './Slider.jsx'

// import styles from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      pointer: 0,
      hasPrevious: false,
      hasNext: false,
      sliderPosition: 0,
      animationDirection: false,
      animationTrigger: false
    }
    this.getSliderCommand = this.getSliderCommand.bind(this)
    this.getPosition = this.getPosition.bind(this)
  }
  getPosition (position) {
    this.setState({ sliderPosition: position })
  }
  getSliderCommand (data) {
    this.setState({ animationDirection: data.left, animationTrigger: data.trigger })
    console.log(data)
  }
  render () {
    const sliderStyle = {
      transform: `translateX(${this.state.sliderPosition}px)`
    }
    return (
      <div>
        <Swipe
          thereshold={300}
          getPosition={this.getPosition}
          getCommand={this.getSliderCommand}
        />
        <Slider
          style={sliderStyle}
          animationDirection={this.state.animationDirection}
          animationTrigger={this.state.animationTrigger}
        />
      </div>
    )
  }
}

const { array } = React.PropTypes
Carousel.propTypes = {
  children: array
}

export default Carousel
