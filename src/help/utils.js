// 深拷贝
export const deepClone = (obj) => {
  let result
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    result = []
    obj.forEach((item, index) => {
      result[index] = deepClone(item)
    })
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    result = {}
    for (let key in obj) {
      result[key] = deepClone(obj[key])
    }
  } else {
    return obj
  }

  return result
}

// 组合继承
export const extendFun = function () {
  function Parent(name) {
    this.name = name
  }
  Parent.prototype.sayName = function () {
    console.log(this.name)
  }
  function Child(name) {
    Parent.call(this, name)
    this.val = "child"
  }
  Child.prototype = new Parent()
  Child.prototype.constructor = Child
  Child.prototype.getValue = function () {
    console.log(this.val)
  }
  const child = new Child("sealinda")
  child.sayName()
  child.getValue()
}

// 手写promise
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
export const MyPromise = function (executor) {
  this.status = PENDING
  this.value = null
  this.reason = null
  this.onFulfilled = []
  this.onRejected = []

  const resolve = value => {
    if(this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onFulfilled.forEach(fn => fn(value))
    }
  }
  const rejected = reason => {
    if(this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onRejected.forEach(fn => fn(reason))
    }
  }

  try {
    executor(resolve, rejected)
  }catch(e) {
    rejected(e)
  }
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : err =>{  throw err }
  
  if(this.status === FULFILLED) {
    onFulfilled(this.value)
  }
  if(this.status === REJECTED) {
    onRejected(this.reason)
  }
  if(this.status === PENDING) {
    this.onFulfilled.push(onFulfilled)
    this.onRejected.push(onRejected)
  }
}

// 节流throttle (第一个人说了算) 在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束是给予响应
export const throttle = (fn, delay) => {
  let last = 0
  return () => {
    let now = +new Date()
    if (now - last >= delay) {
      last = now
      fn()
    }
  }
}

// 防抖Debounce(最后一个人说了算) 在某段时间内，不管你触发了多少次回调，我都只认最后一次
export const debounce = (fn, delay) => {
  let timer = null
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(fn, delay)
}

export const throttleDebounce = (fn, delay) => {
  let last = 0,
    timer = null
  return () => {
    let now = +new Date()
    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    } else {
      last = now
      fn()
    }
  }
}

// 连字符转成驼峰 get-element-by-id 转为 getElementById
export const strToHump = (str) => {
  return str.replace(/-(\w*)/g, function ($1, $2) {
    return $2.charAt(0).toUpperCase() + $2.substr(1)
  })
}

//驼峰转连字符
export const humpToStr = (str) => {
  return str.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase()
  })
}

// 冒泡排序
export const bubbleSort = (list) => {
  let len = list.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (list[i] > list[j]) {
        swap(list, i, j)
      }
    }
  }
  return list
}


// 快速排序
export const quitSort = (list = [], left = 0, right = list.length -1) => {
  // if(list.length <= 1) {
  //   return list
  // }
  // let middleIndex = Math.floor(list.length/2)
  // let middleValue = list.splice(middleIndex, 1)[0]
  // let left = []
  // let right = []
  // list.forEach(item => {
  //   if(item <= middleValue) {
  //     left.push(item)
  //   }else {
  //     right.push(item)
  //   }
  // })
  // return quitSort(left).concat([middleValue], quitSort(right))
  if(left >= right) {
    return list
  }
  let baseVal = list[left]
  let index = left+1
  for(let i=index; i<=right; i++) {
    if(list[i] <= baseVal) {
      swap(list, i, index)
      index++
    }
  }
  swap(list, left, index-1)
  quitSort(list, left, index-2)
  quitSort(list, index, right)
  return list
}

function partition(arr, left ,right) {     // 分区操作
  let pivot = left, index = pivot + 1
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }        
  }
  swap(arr, pivot, index - 1)
  return index-1
}

function swap(list, i, j) {
  [list[i], list[j]] = [list[j], list[i]]
}

// 二分查找
export const search = (list, target) => {
  let low = 0
  let high = list.length - 1
  while(low <= high) {
    let mid = Math.floor((low + high)/2)
    if(list[mid] === target) {
      return mid
    }else if(list[mid] > target) {
      high = mid - 1
    }else {
      low = mid + 1
    }
  }
  return -1
}

// 求和
export const sum = (list) => {
  return list.reduce((total, current, index, list) => total + current, 0)
}

// 笛卡尔乘积
export const reduceList = (list) => {
  return list.myReduce((total, current) => {
    let ret = []
    total.forEach(a => {
      current.forEach(b => {
        ret.push(a.concat(b))
      })
    })
    return ret
  }, [[]])
}

Array.prototype.myReduce = function(fn, initialValue) {
  let base = initialValue || this[0]
  const startIndex = initialValue? 0 : 1
  for(let i = startIndex; i < this.length; i++) {
    base = fn(base, this[i], i, this)
  }
  return base
}

// 解析 URL Params 为对象
export const parseParams = url => {
  const str = url.split('?')[1]
  const list = str.split('&')
  let result = {}
  list.forEach(item => {
    const param = item.split('=')
    result[param[0]] = param.length>1? decodeURIComponent(param[1]) : true
  })
  return result
}

export const renderList = (data) => {
  const { total, list } = data
  let once = 20
  let page = total/once
  const ul = document.getElementById('cuisineId')

  const loop = (curTotal, curIndex) => {
    if(curTotal <= 0) {
      return false
    }
    window.requestAnimationFrame(function() {
      let fragment = document.createDocumentFragment()
      for(let i = 0; i < page; i++) {
        let li = document.createElement('li')
        li.innerHTML = curIndex + i + ' : ' + ~~(Math.random() * total)
        fragment.appendChild(li)
      }
      ul.appendChild(fragment)
      loop(curTotal-page, curIndex+page)
    })
  }
  loop(list, 0)
}
