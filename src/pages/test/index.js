import React from 'react'
import './index.scss'

export default React.memo(props => {
  return (
    <div className="container">
      <div className="top-container">
        <div className="transition">transition</div>
        <div className="animation">animation</div>
        <div className="border">1px</div>
        <div className="triangle"></div>
        <div className="fan"></div>
      </div>
      <div className="flex-float">
        <div className="left">left</div>
        <div className="right">right</div>
      </div>
      <div className="flex-position">
        <div className="left">left</div>
        <div className="right">right</div>
      </div>
      <div className="parent">
        <div className="child">child</div>
      </div>
      <div className="parent-relative">
        <div className="child">child</div>
      </div>
    </div>
  )
})