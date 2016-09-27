import React from 'react'

import styles from './Swipe.css'
// import styles from './Carousel.scss'

class Swipe extends React.Component {
  constructor () {
    super()
    this.state = {
      isSwiping: false,
      start: 0,
      end: 0,
      increment: 0
    }
    this.swipeStart = this.swipeStart.bind(this)
    this.swipeMove = this.swipeMove.bind(this)
    this.swipeEnd = this.swipeEnd.bind(this)
  }
  swipeStart (e) {
    this.setState({
      isSwiping: true,
      start: e.pageX,
      end: e.pageX,
      increment: 0
    })
  }
  swipeMove (e) {
    const { isSwiping, start } = this.state

    if (isSwiping) {
      const increment = e.pageX - start
      this.setState({
        increment: increment,
        end: e.pageX
      })
      this.props.getPosition(increment)
    }
  }
  swipeEnd (e) {
    const { start, increment } = this.state
    const thereshold = this.props.thereshold

    const command = {
      left: (start - e.pageX > 0),
      trigger: (Math.abs(increment) > thereshold),
      increment: increment
    }
    this.props.getCommand(command)

    this.setState({ isSwiping: false })
  }
  render () {
    return (
      <div
        className={styles.overlay}
        onMouseDown={this.swipeStart}
        onMouseMove={this.swipeMove}
        onMouseUp={this.swipeEnd}
        onTouchStart={this.swipeStart}
        onTouchMove={this.swipeMove}
        onTouchEnd={this.swipeEnd}
      />
    )
  }
}

const { number, func } = React.PropTypes
Swipe.propTypes = {
  thereshold: number,
  getPosition: func,
  getCommand: func
}

export default Swipe
