import React from 'react'
import cx from 'classnames'

import styles from './SidePanel.css'

class SidePanel extends React.Component {
  render () {
    // FIXME: Find a way to improve that mess
    let visible = this.props.visible
    let locked = this.props.locked
    let panelClasses = cx(styles.leftPanel, {
      [styles.visible]: visible && !locked,
      [styles.hidden]: !visible && !locked
    })
    let backClasses = cx(styles.back, {
      [styles.fadeIn]: visible && !locked,
      [styles.fadeOut]: !visible && !locked
    })
    return (
      <div className={panelClasses}>
        <nav>
          {this.props.children}
        </nav>
        <a className={backClasses} onClick={this.props.callback} />
      </div>
    )
  }
}

const { bool, func, array } = React.PropTypes
SidePanel.propTypes = {
  children: array,
  locked: bool.isRequired,
  visible: bool.isRequired,
  callback: func.isRequired
}

export default SidePanel
