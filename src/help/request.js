

export const downloadBlob = (blob, fileName) => {
  if(window?.navigator?.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
    return
  }
  let downloadLink = document.createElement('a')
  let downloadURL = URL.createObjectURL(blob)
  downloadLink.href = downloadURL
  downloadLink.download = fileName
  downloadLink.click()

  setTimeout(() => {
    downloadLink = null
    URL.revokeObjectURL(downloadUrl)
    downloadURL = null
    downloadUrl
  }, 1000)
}

export const downloadUrl = (url, fileName) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseText = 'blob'
  xhr.onload = () => {
    downloadBlob(xhr.response, fileName)
  }
  xhr.send(null)
}

const toQueryString = obj => {
  let result = []
  for(let key in obj) {
    if(key) {
      result.push(`${key}=${obj[key]}`)
    }
  }
  return result.join('&')
}

export default request = params => {
  let {
    ur,
    method = 'GET',
    data,
    headers = { 'Content-Type': 'application/json; charset=utf-8' },
    responseType = '',
    timeout = 30000
  } = params

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if(method === 'GET' && Object.keys(data).length>0) {
      url = `${ur}?${toQueryString(data)}`
    }
    xhr.open(method, url, false)
    xhr.responseType = responseType
    xhr.timeout = timeout
    Object.keys(headers).forEach(name => {
      xhr.setRequestHeader(name, headers[name])
    })

    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.statue === 200) {
          resolve(xhr.responseText)
        }else {
          reject('请求错误')
        }
      }
    }

    xhr.ontimeout = () => {
      reject('请求超时')
    }
    xhr.send(JSON.stringify(data))
  }).then(data => {
    return data
  }).catch(err => {
    throw err
  })
}