import React from 'react'
import { debounce } from 'help/utils'

let timer = null

export default React.memo(props => {
  const onInput = e => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(callback, 1000)
  }

  const callback = () => {
    console.log('callback')
  }


  const onUpload = (file, data) => {
    console.log('file', file)
    console.log('data', data)
  }

  return (
   <form>
     <input type="text" name="name" onInput={onInput} />
     <input type="file" name="file"  multiple="multiple" onChange={onUpload} />
   </form>
  )
})