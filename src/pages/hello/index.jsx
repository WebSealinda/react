import React from 'react'
import { debounce } from 'help/utils'

let timer = null

export default class Hello extends React.Component {
  state = {
    count: 0
  }

  onInput = e => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(callback, 1000)
  }

  callback = () => {
    console.log('callback')
  }


  onUpload = (file, data) => {
    console.log('file', file)
    console.log('data', data)
  }

  onCount = () => {
    for(let i=1; i<100; i++) {
      this.setState({count: i})
    }
  }

  render() {
    return (
     <form>
       <input type="text" name="name" onInput={this.onInput} />
       <input type="file" name="file"  multiple="multiple" onChange={this.onUpload} />
       <div onClick={this.onCount}>{this.state.count}</div>
     </form>
    )
  }
}