import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './Indicator.css'

const Indicator = (props) => {
  const { current, number, enabled } = props

  if (enabled) {
    const dots = []
    for (var i = 0; i < number; i++) {
      const classList = ['red-dot', 'orange-dot', 'yellow-dot', 'green-dot']
      const currentClass = (current === i) ? classList[i] : 'gray-dot'
      dots.push(<div styleName={currentClass} key={i} />)
    }
    return <div styleName='indicator'>{dots}</div>
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

export default CSSModules(Indicator, styles)
