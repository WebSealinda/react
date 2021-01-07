import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory({ basename: '/admin' })

render(
  <Router history={history}>
    <React.Suspense fallback={<div>加载中</div>}>
      <Switch>
        <Route path="/test" component={React.lazy(() => import('./pages/test/index.jsx'))} />
        <Route path="/hello" component={React.lazy(() => import('./pages/hello/index.jsx'))} />
      </Switch>
    </React.Suspense>
  </Router>
, document.getElementById('root'))