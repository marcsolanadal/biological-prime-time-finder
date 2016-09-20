import React from 'react'

import style from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      swipeStart: {
        x: 0,
        y: 0
      },
      current: 0
    }
    this.getStartSwipePosition = this.getStartSwipePosition.bind(this)
    this.getEndSwipePosition = this.getEndSwipePosition.bind(this)
  }
  changeCurrent (key) {
    console.log(key)
    this.state.current = key
  }
  getStartSwipePosition (e) {
    this.state.swipeStart = {
      x: e.pageX,
      y: e.pageY
    }
  }
  getEndSwipePosition (e) {
    const dX = e.pageX - this.state.swipeStart.x
    const dY = e.pageY - this.state.swipeStart.y

    console.log(`dx: ${dX}, dy: ${dY}`)

    const text = (dX < 0) ? 'left swipe' : 'right swipe'
    console.log(text)

    //console.log(`position = (x: ${e.pageX}, y: ${e.pageY})`)
    //console.log(`window width: ${window.innerWidth}`)
  }
  render () {
    const slides = []
    const dots = []
    React.Children.forEach(this.props.children, (slide, i) => {
      const boundClick = this.changeCurrent.bind(this, i)
      slides.push(
        <span className={style.slide} key={i}>
          {slide.props.children}
        </span>
      )
      dots.push(
        <div className={style.dot} key={i} />
      )
    })
    return (
      <div className={style.container}
        onMouseDown={this.getStartSwipePosition}
        onMouseUp={this.getEndSwipePosition}
      >
        <div className={style.slider}>{slides}</div>
        <div className={style.indicator}>{dots}</div>
      </div>
    )
  }

}

const { array, func } = React.PropTypes
Carousel.propTypes = {
  children: array,
  handleSlides: func
}

const Indicator = (props) => {
  const dots = []
  for (var i = 0; i < props.number; i++) {
    dots.push(<div className={style.dot} />)
  }
  return <div>{dots}</div>
}

const { int } = React.PropTypes
Indicator.propTypes = {
  number: int
}

export default Carousel
