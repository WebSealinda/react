import React from 'react'
import{ Route } from 'react-router-dom'
import Forbidden from '../Forbidden'

let authCheckFn = () => true

const AuthRoute = React.memo(({ authKey, fallback, ...restProps }) => {
  if(authKey && !authCheckFn(authKey)) {
    return <Route {...restProps} component={fallback || Forbidden} />
  }

  return <Route {...restProps} />
})

export default AuthRoute