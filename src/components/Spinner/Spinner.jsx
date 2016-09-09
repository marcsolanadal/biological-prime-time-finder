import React from 'react'

import cx from 'classnames'
import styles from './Spinner.css'

class Spinner extends React.Component {
  render () {
    let loadingClassName = cx(styles.loading, {
      [styles.play]: this.props.spinning,
      [styles.pause]: !this.props.spinning
    })
    return (
      <div className={loadingClassName} onClick={this.handleClick}>
        <div className={styles.bar}>
          <div className={styles.bar}>
            <div className={styles.bar}>
              <div className={styles.bar} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const { bool } = React.PropTypes
Spinner.propTypes = {
  spinning: bool
}
Spinner.defaultProps = {
  spinning: true
}

export default Spinner
