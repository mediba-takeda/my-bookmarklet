(function(){
  const messageObj = {
    env: null,
    title: document.querySelector('.js-issue-title').innerHTML.trim(),
    target: 'フロント（web）',
    url: location.href,
    isMerged: document.querySelector('.State').innerText.toLowerCase().trim() === 'merged'
  }

  const actualBranch = document.querySelector('.commit-ref span').innerHTML
  if (actualBranch === 'master') {
    messageObj.env = '商用'
  } else if (actualBranch.includes('test/stg')) {
    messageObj.env = 'stg'
  } else if (actualBranch.includes('test/dev')) {
    messageObj.env = 'dev'
  } else {
    messageObj.env = '???'
  }

  const text = 'フロント（web, conv, gacha）, Turmeric, バッチ'
  const dialog = window.prompt('対象はどこですか？', text)

  if (dialog != '') {
    messageObj.target = dialog
  } else {
    messageObj.target = text
  }

  const copyMessage = `${actualBranch === 'master'
    ? '#デプロイ\n\nこれよりデプロイします。'
    : '@バックエンドのデプロイできる方\n\n下記内容を'+messageObj.env+'にデプロイをお願いいたします。'}

----
環境: ${messageObj.env}
対象： ${messageObj.target}
ブランチ： ${actualBranch}
内容： ${messageObj.title}
----
${messageObj.url}
${messageObj.isMerged ? '※ マージ済' : '※ 当日マージします'}

よろしくお願いいたします。
`
  let copyElem = document.createElement('textarea')
  let bodyElem = document.querySelector('body')
  copyElem.textContent = copyMessage
  bodyElem.appendChild(copyElem)
  copyElem.select()
  let value = document.execCommand('copy')
  bodyElem.removeChild(copyElem)
})()
