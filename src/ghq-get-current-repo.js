(function(){
  const path = location.pathname
  const array = path.substring(1, path.length).split('/')
  const repo = array[0] + '/' + array[1]
  const msg = `ghq get ${repo}`
  const copyElem = document.createElement('textarea')
  const bodyElem = document.querySelector('body')
  copyElem.textContent = msg
  bodyElem.appendChild(copyElem)
  copyElem.select()
  const value = document.execCommand('copy')
  bodyElem.removeChild(copyElem)
})()
