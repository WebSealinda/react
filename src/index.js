import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory({ basename: '/admin' })

render(
  <Router history={history}>
    <React.Suspense fallback={<div>加载中</div>}>
      <Switch>
        <Route path="/welcome" component={React.lazy(() => import('./pages/welcome/index.jsx'))} />
        <Route path="/test" component={React.lazy(() => import('./pages/test'))} />
        <Route path="/hello" component={React.lazy(() => import('./pages/hello'))} />
      </Switch>
    </React.Suspense>
  </Router>
, document.getElementById('root'))