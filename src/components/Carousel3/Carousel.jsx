import React from 'react'
// import classNames from 'classnames'

import Swipe from './Swipe.jsx'
// import styles from './Carousel.css'

class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      pointer: 0,
      isCentering: false,
      isTransitioning: false,
      hasPrevious: false,
      hasNext: false,
      positionX: 0
    }
    this.getSliderCommand = this.getSliderCommand.bind(this)
  }
  getSliderCommand (data) {
    console.log(data.increment)
    this.setState({ positionX: data.increment })
  }
  render () {
    return (
      <div>
        <Swipe thereshold={300} getCommand={this.getSliderCommand} />
        <RemoteSquare positionX={this.state.positionX} />
      </div>
    )
  }
}

const RemoteSquare = (props) => {
  const squareStyle = {
    backgroundColor: 'red',
    transform: `translateX(${props.positionX}px)`,
    height: '100px',
    width: '100px'
  }
  return (
    <div className='square' style={squareStyle} />
  )
}

const { number } = React.PropTypes
RemoteSquare.propTypes = {
  positionX: number
}

const { array } = React.PropTypes
Carousel.propTypes = {
  children: array
}

export default Carousel
