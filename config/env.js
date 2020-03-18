const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

module.exports = (function(){
  let file = '.env.' + process.env.NODE_ENV
  if(fs.existsSync(path.join(__dirname, '../', file + '.local'))){
    file += '.local'
  } else if(!fs.existsSync(path.join(__dirname, '../', file))){
    file = '.env'
  }
  dotenv.config({ path: path.join(__dirname, '../', file)})
  return null
})()