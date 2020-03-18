require('./env')
const user = require('../services/user')

let arr = []
for(let i =1;i<10;i++){
  arr.push({
    id: i.toString(),
    name: '用户0' + i,
    avatar: 'http://localhost/0' + i,
    socketId: '',
  })
}
async function init() {
  await user.insertTestData(arr)
  console.log('insert finished')
}

init()