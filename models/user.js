const mongo = require('../databases/mongo')

const schema = new mongo.Schema({
  id: String,
  name: String,
  avatar: { type: String, default: '' },
  socketId: { type: String, default: '' }
})

const user = mongo.model('users', schema)

module.exports = user
