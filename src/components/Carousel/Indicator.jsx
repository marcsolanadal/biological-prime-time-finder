import React from 'react'
import ClassNames from 'classnames'

import styles from './Indicator.css'
// import styles from './Carousel.scss'

const Indicator = (props) => {
  const { current, number, enabled } = props

  if (enabled) {
    const dots = []
    for (var i = 0; i < number; i++) {
      // FIXME: It must be a better way to implement this
      let dotStyles = ClassNames(styles.dot, {
        [styles.red]: current === i && i === 0,
        [styles.orange]: current === i && i === 1,
        [styles.yellow]: current === i && i === 2,
        [styles.green]: current === i && i === 3,
        [styles.gray]: current !== i
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
