require('./env')
const db = require('../databases/redis')()

let users = {
  '1': {
    id: 1,
    name: '用户001',
    sex: '男',
  },
  '2': {
    id: 2,
    name: '用户002',
    sex: '女',
  },
}

const expire = 3600 * 24 * 7

for(let k in users){
  db.p_set('user.' + k, users[k], expire).then(r=>{
    console.log(r)
  })
}
