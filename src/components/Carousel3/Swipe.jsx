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
      counter: 0
    })
  }
  swipeMove (e) {
    const { isSwiping, start, counter } = this.state
    const step = this.props.optimizationFactor || 5

    if (isSwiping) {
      if (counter > step) {
        this.setState({
          increment: e.pageX - start,
          end: e.pageX,
          counter: 0
        })
      } else {
        // FIXME: With immutable state this cannot be done
        this.state.counter++
      }
    }
  }
  swipeEnd (e) {
    const { end, increment } = this.state
    const thereshold = this.props.thereshold

    //console.log(`end: ${end}, e.pageX: ${e.pageX}`)

    const command = {
      left: (end - e.pageX < 0),
      trigger: (Math.abs(increment) > thereshold),
      increment: increment
    }

    this.props.getCommand(command)
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
  getCommand: func
}

export default Swipe
