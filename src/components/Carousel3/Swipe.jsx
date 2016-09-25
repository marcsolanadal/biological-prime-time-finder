import React from 'react'

class Swipe extends React.Component {
  constructor () {
    super()
    this.state = {
      isSwiping: false,
      start: 0,
      end: 0,
      increment: 0,
      counter: 0
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
      increment: 0,
      counter: 0
    })
  }
  swipeMove (e) {
    const { isSwiping, start, counter } = this.state
    const step = this.props.optimizationFactor || 5

    if (isSwiping) {
      if (counter === step) {
        const increment = e.pageX - start
        this.setState({
          increment: increment,
          end: e.pageX,
          counter: 0
        })
        this.props.getPosition(increment)
      } else {
        this.setState({ counter: counter + 1 })
      }
    }
  }
  swipeEnd (e) {
    const { end, increment } = this.state
    const thereshold = this.props.thereshold

    const command = {
      left: (end - e.pageX < 0),
      trigger: (Math.abs(increment) > thereshold),
      increment: increment
    }

    this.props.getCommand(command)

    this.setState({ isSwiping: false })
  }
  render () {
    const overlayStyles = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: '999',
      userSelect: 'none'
    }
    return (
      <div
        style={overlayStyles}
        onMouseDown={this.swipeStart}
        onMouseMove={this.swipeMove}
        onMouseUp={this.swipeEnd}
      />
    )
  }
}

const { number, func } = React.PropTypes
Swipe.propTypes = {
  thereshold: number,
  optimizationFactor: number,
  getPosition: func,
  getCommand: func
}

export default Swipe
