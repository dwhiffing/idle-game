import 'babel-polyfill'

import ReactDOM from 'react-dom'
import React from 'react'
import store from 'utils/reduxStore'

import ApplicationView from 'views/ApplicationView/ApplicationView'
import PropertyView from 'views/PropertyView/PropertyView'
import InstanceView from 'views/InstanceView/InstanceView'
import ResearchView from 'views/ResearchView/ResearchView'

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import 'index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ApplicationView}>
        <Route path="/property" component={PropertyView} />
        <Route path="/research/:property" component={ResearchView} />
        <Route path="/instance/:instance" component={InstanceView} />
        <IndexRoute component={PropertyView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react')
)
