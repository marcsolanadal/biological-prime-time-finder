import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Header from './views/Header/Header'
import About from './views/About'
import NoMatch from './views/NoMatch'

import styles from './main.css'

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Header} />
      <Route path='about' component={About} />
      <Route path='*' component={NoMatch} />
    </Router>
  )
}

render(<App styles={styles} />, document.getElementById('app'))