import React from 'react'
// var a = 2

// const obj = {
//   a: 1,
//   b: this.a *2,
//   c: function() {
//     return function() {
//       console.log(this.a) //undefined
//     }
//   },
//   d: function() {
//     return () => {
//       console.log(this.a) // 1
//     }
//   },
//   e: () => {
//     console.log(this.a)  // undefined
//   }
// }


const search = (arr, tagrget) => {
  let low = 0
  let high = arr.length - 1
  while(low <= high) {
    let mid = Math.floor((high+1)/2)
    if(arr[mid] > tagrget) {
      high = mid
    }else if(arr[mid] < tagrget) {
      low = mid
    } else {
      if(mid == 0 || (arr[mid] != arr[mid - 1])) return mid
      else high = mid - 1
    }
  }
}

export default React.memo(props => {
  console.log(search([1, 2, 3, 4, 5, 6], 4))
  return (
    <div className="out" id="outId">
      <div className="in" className="inId">in</div>
    </div>
  )
})