import React from 'react'
import ClassNames from 'classnames'

import styles from './Indicator.css'

const Indicator = (props) => {
  if (props.enabled) {
    const dots = []
    for (var i = 0; i < props.number; i++) {
      let dotStyles = ClassNames(styles.dot, {
        // FIXME: Find a better way to do this color assignation
        [styles.green]: (props.current === 0),
        [styles.yellow]: (props.current === 1),
        [styles.red]: (props.current === 2),
        [styles.blue]: (props.current === 3),
        [styles.gray]: (props.current !== i)
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
