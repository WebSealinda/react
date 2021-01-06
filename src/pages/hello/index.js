import React from 'react'
import { deepClone, extendFun, strToHump, humpToStr, bubbleSort, quitSort, search, sum, reduceList } from 'help/utils'

const testObj = {
  name: "sealinda",
  sex: "girl",
  age: 22,
  favorite: "play",
  family: {brother: "wei", mother: "ha", father: "hei"}
}
const testArr1 = [3, 2, 1, 10, 4, 11, 5, 8, 7, 6, 9]
const testArr2 = [3, 2, 1, 10, 4, 11, 5, 8, 7, 6, 9]
const testArr3 = [1, 2, 3, 4, 5, 6, 7,8 , 9]
const testArr4 = [
  ['红色', '绿色'],
  ['s', 'm'],
  ['小码', '大码'],
]

export default class Hell extends React.Component {
  render() {
    console.log(deepClone(testObj))
    extendFun()
    console.log(strToHump('get-element-by-id'))
    console.log(humpToStr('getElementById'))
    console.log(quitSort(testArr1))
    console.log(bubbleSort(testArr2))
    // console.log(search(testArr3, 7))
    console.log(sum(testArr3))
    console.log(reduceList(testArr4))

    return (
      <div>hello</div>
    )
  }
}