import React from 'react'
import './index.scss'

export default React.memo(props => {
  return (
    <div className="container">
      <div className="top-container">
        <div className="transition">transition</div>
        <div className="animation">animation</div>
        <div className="border">1px</div>
        <div className="border-1px">1ppx border</div>
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
        <div className="child">child1</div>
      </div>
      <div className="parent-relative">
        <div className="child">child2</div>
      </div>
      <div className="parent-margin">
        <div className="child">child3</div>
      </div>
      <div className="out" id="out">
        <div className="in" id="in">
          <a>in</a>
        </div>
      </div>
      <div className="float">
        <div className="child">float1</div>
        <div className="child">float2</div>
      </div>
      <div className="float-clear">
        <div className="child">float1</div>
        <div className="child">float2</div>
        <div className="clear"></div>
      </div>
    </div>
  )
})