// 深拷贝
const deepCopy = (obj) => {
  let result
  if(Object.prototype.toString.call(obj) === '[object Array]') {
    result = []
    for(let i = 0; i < obj.length; i++) {
      result[i] = deepCopy(obj[i])
    }
  }else if(Object.prototype.toString.call(obj) === '[object Object]') {
    result = {}
    for(let key in obj) {
      result[key] = deepCopy(obj[key])
    }
  }else {
    return obj
  }
  return result
}

// 组合继承
const extendFun = function() {
  function Parent(value) {
    this.val = value
  }
  Parent.prototype.getValue = function() {
    console.log(this.val)
  }
  function Child(value) {
    Parent.call(this, value)
    this.name = 'childName'
  }
  Child.prototype = new Parent()
  Child.prototype.getName = function() {
    console.log(this.name)
  }
  const child = new Child('child')
  child.getValue()
  child.getName()
}

// 手写promise
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  this.status = PENDING
  this.value = null
  this.reason = null

  this.onFullFilledFn = Function.prototype
  this.onRejectedFn = Function.prototype

  const resolve = value => {
    if(this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onFullFilledFn(value)
    }
  }

  const reject = reason => {
    if(this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onFullFilledFn(reason)
    }
  }

  executor(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
  
  if(this.status === FULFILLED) {
    onFulfilled(this.value)
  }

  if(this.status === REJECTED) {
    onFulfilled(this.reason)
  }

  if(this.status === PENDING) {
    this.onFullFilledFn = onFulfilled
    this.onRejectedFn = onRejected
  }
}

// 节流throttle (第一个人说了算) 在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束是给予响应
const throttle = (fn, delay) => {
  let last = 0
  return () => {
    let now = +new Date()
    if(now - last >= delay) {
      last = now 
      fn()
    }
  }
}

// 防抖Debounce(最后一个人说了算) 在某段时间内，不管你触发了多少次回调，我都只认最后一次
const debounce = (fn, delay) => {
  let timer = null
  return () => {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

const throttleDebounce = (fn, delay) => {
  let last = 0, timer = null
  return () => {
    let now = +new Date()
    if(now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    }else {
      last = now
      fn()
    }
  }
}

// 连字符转成驼峰 get-element-by-id 转为 getElementById
const strToHump = str => {
  // const arr = str.split('-')
  // for(let i = 1; i < arr.length; i++) {
  //   arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1)
  // }

  str = str.replace(/-(\w*)/g, function ($1, $2) {
    return $2.charAt(0).toUpperCase() + $2.substr(1)
  })
}

//驼峰转连字符
const humpToStr = str => {
  str = str.replace(/([A-Z])/g, function($1) {
    return '-' + $1.toLowerCase()
  })
}

// 冒泡排序
const bubbleSort = list => {
  const len = list.length
  for(let i = 0; i < len-1; i++) {
    for(let j = i+1; j < len ; j++) {
      if(list[i] > list[j]) {
        let temp = list[i]
        list[i] = list[j]
        list[j] = temp
      }
    }
  }
}

//快速排序
const quitSort = list => {
  if(list.length <= 1) {
    return list
  }
  let middleIndex = Math.floor(list.length/2)
  let middleValue = list.splice(middleIndex, 1)[0]
  let left = []
  let right = []
  for(let i = 0; i < list.length; i++) {
    if(list[i] <= middleValue) {
      left.push(list[i])
    }else {
      right.push(list[i])
    }
  }
  return quitSort(left).concat([middleValue], quitSort(right))
}

const sum = arr => {
  return arr.reduce((total, current, index, arr) => total + current, 0)
}

const reduceArr = arr => {
  if(arr.length < 1) {
    return arr[0] || []
  }
  return [].reduce.call(arr, (total, current) => {
    let res = []
    total.forEach(item => {
      current.forEach(c => {
        let t = [].concat(Array.isArray(item)? item: [item])
        t.push(c)
        res.push(t)
      })
    })
    return res
  })
}

// 二分查找
const search = (arr, target) => {
  let low = 0
  let high = arr.length - 1
  while(low <= high) {
    let mid = Math.floor((high+1)/2)
    if(arr[mid] > target) {
      high = mid
    }else if(arr[mid] < target) {
      low = mid
    } else {
      if(mid == 0 || (arr[mid] != arr[mid - 1])) return mid
      else high = mid - 1
    }
  }
}