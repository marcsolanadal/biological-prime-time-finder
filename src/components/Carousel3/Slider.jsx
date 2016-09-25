import React from 'react'

const Slider = (props) => {
  const containerStyle = {
    display: 'flex'
  }
  const squareStyle = {
    backgroundColor: 'red',
    height: '100px',
    width: '100px',
    border: '2px solid black'
  }
  return (
    <div style={containerStyle}>
      <div style={squareStyle} />
      <div style={squareStyle} />
      <div style={squareStyle} />
    </div>
  )
}

const { bool } = React.PropTypes
Slider.propTypes = {
  animationDirection: bool,
  animationTrigger: bool
}

export default Slider
