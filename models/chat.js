const mongo = require('../databases/mongo')

const schema = new mongo.Schema({
  from: String, /* 发送者 */
  to: String, /* 接收者 */
  key: String, /* 会话id，根据from和to生成，且与from，to的先后顺序五官 */
  data: Object, /* 消息体 */
  recall: { type: Boolean, default: false }, /* 是否撤回 */
  createdAt: { type: Date, default: Date.now }, /* 消息创建时间 */
  updatedAt: { type: Date, default: Date.now }, /* 修改时间 */
})

const chat = mongo.model('chats', schema)

module.exports = chat
