import React from 'react'
import './index.scss'

export default React.memo(props => {
  return (
    <div className="container">
      <div className="top">top</div>
      {/* <div className="bottom"></div> */}
    </div>
  )
})