import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Header from './views/Header/Header'
import Tips from './views/Tips/Tips'
import About from './views/About'
import NoMatch from './views/NoMatch'

import styles from './main.scss'

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Tips}>
        <Route path='tips' component={Tips} />
        <Route path='about' component={About} />
      </Route>
      <Route path='*' component={NoMatch} />
    </Router>
  )
}

render(<App styles={styles} />, document.getElementById('app'))
