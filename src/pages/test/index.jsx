import React from "react"
import {
  deepClone,
  extendFun,
  strToHump,
  humpToStr,
  bubbleSort,
  quitSort,
  search,
  sum,
  reduceList,
  MyPromise,
  parseParams,
  getStrNum,
  union,
  isPalindrome,
  parseToMoney,
  findK,
  depthSearch,
  breadSearch,
  eventLoop,
  sumStr,
  flatten
} from "help/utils"
import './index.scss'

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
//       console.log(this.b) // NaN
//     }
//   },
//   e: () => {
//     console.log(this.a)  // undefined
//   }
// }

const testObj = {
  name: "sealinda",
  sex: "girl",
  age: 22,
  favorite: "play",
  family: { brother: "wei", mother: "ha", father: "hei" },
  family: { brother: "wei", mother: "ha", father: "hei" },
}
const testArr1 = [3, 2, 1, 10, 4, 11, 5, 8, 7, 6, 9]
const testArr2 = [3, 2, 1, 10, 4, 11, 5, 8, 7, 6, 9]
const testArr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const testArr4 = [
  ["红色", "绿色"],
  ["s", "m"],
  ["小码", "大码"],
]
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
const testArr5 = [
  {
    name: 1,
    children: [
      {
        name: 11,
        children: [{name: 111}]
      },
      {
        name: 12,
      }
    ]
  },
  {
    name: 2,
    children: [
      {
        name: 21,
        children: [{name: 221}]
      },
      {
        name: 22,
      }
    ]
  }
]

export default class Hell extends React.Component {
  render() {
    console.log(deepClone(testObj))
    extendFun()
    console.log(strToHump("get-element-by-id"))
    console.log(humpToStr("getElementById"))
    console.log(quitSort(testArr1))
    console.log(bubbleSort(testArr2))
    // console.log(search(testArr3, 7))
    console.log(sum(testArr3))
    console.log(reduceList(testArr4))
    new MyPromise((resolve, rejected) => {
      resolve("resolve")
      // rejected('rejected')
    })
      .then(
        (res) => {
          console.log("res", res)
        },
        (err) => {
          console.log("er", err)
        }
      )
    console.log(parseParams(url)) 
    console.log(getStrNum('abcabcabcbbccccc')) 
    console.log(union(testArr2, testArr3)) 
    console.log(isPalindrome(12121))
    console.log(parseToMoney(1212188))
    console.log(findK([1], 3))
    console.log(depthSearch(testArr5).join(','))
    console.log(breadSearch(testArr5).join(','))
    eventLoop()
    console.log(sumStr('191', '29'))
    console.log(flatten([[1,[2,3],4,[[5,6],7]]]))

    return (
      <div className="container">
        <div className="top-container">
          <div className="transition">transition</div>
          <div className="animation">animation</div>
          <div className="border">1px</div>
          <div className="border-1px">1ppx border</div>
          <div className="box-shadow-1px"></div>
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
        <div className="bfc">bfc1</div>
        <p className="bfc-container">
          <div className="bfc">bfc2</div>
        </p>
        <div className="relative">relative</div>
        <div className="absolute-parent">
          <div className="absolute">Absolute</div>
        </div>
        <div>
          <div className="zindex-parent1">
            <div className="child">z-index1</div>
          </div>
          <div className="zindex-parent2">
            <div className="child">z-index2</div>
          </div>
        </div>
      </div>
    )
  }
}
