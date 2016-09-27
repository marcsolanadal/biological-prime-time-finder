import React from 'react'
import ClassNames from 'classnames'

import styles from './Indicator.css'

const Indicator = (props) => {
  const { current, number, enabled } = props

  if (enabled) {
    const dots = []
    for (var i = 0; i < number; i++) {
      let dotStyles = ClassNames(styles.dot, {
        [styles.current]: current === i
      })
      dots.push(<div className={dotStyles} key={i} />)
    }
    return <div className={styles.indicator}>{dots}</div>
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

export default Indicator
