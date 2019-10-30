let _mock = {
  '/im-manage/${token}/user/${orgId}/query': 1,
  '/im-manage/${token}/todo/${orgId}/query': 2
}

let url = '/im-manage/adsfadfadfadfadsfadsf/todo/10/query'
let targetKey = ''

Object.keys(_mock).map(key => {
  let arr1 = key.split('/')
  let arr2 = url.split('/')
  let indexes = []
  arr1.map((item, index) => {
    if (~item.indexOf('${')) {
      indexes.push(index)
    }
  })
  let realUrl = key
  indexes.map(index => {
    realUrl = realUrl.replace(arr1[index], arr2[index])
  })
  if(url === realUrl){
    targetKey = key
    console.log(`${url} \t\t\t【 is the mapping of 】\n\t\t \n${key}\n `)
  }
})

console.log('\n\ntarget key == ', targetKey)