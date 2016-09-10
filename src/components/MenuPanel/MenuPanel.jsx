import React from 'react'

// import cx from 'classnames'

import styles from './SidePanel.css'

/*
class SidePanel extends React.Component {
  render () {
    return (
      <div>
        <nav>
          {this.props.children}
        </nav>
        <a className={backClasses} onClick={this.props.callback} />
      </div>
    )
  }
}
*/

const MenuPanel = (props) => {
  return (
    <div className={styles.leftPanel}>
      <nav>
        {props.children}
      </nav>
      <a className={styles.back} onClick={props.callback} />
    </div>
  )
}

const { func, array } = React.PropTypes
MenuPanel.propTypes = {
  children: array,
  callback: func.isRequired
}

export default MenuPanel
