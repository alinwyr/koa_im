const mongo = require('../databases/mongo')

let schema = new mongo.Schema({
  id: String, /* 用户id */
  friend: String, /* 对方id */
  unread: { type: Number, default: 0 }, /* 未读条数 */
  lastMessage: {type: mongo.Schema.Types.ObjectId, ref: 'chats'}, /* 最后一条消息 */
  createdAt: { type: Date, default: Date.now }, /* 创建时间 */
  updatedAt: { type: Date, default: Date.now }, /* 修改时间 */
}, {
  toObject: { virtuals: true},
  toJSON: { virtuals: true},
})

// 关联表, 用户详情给friend，貌似不生效
schema.virtual('info', {
  ref: 'users', // The model to use
  localField: 'friend', // Find people where `localField`
  foreignField: 'id', // is equal to `foreignField`
  justOne: true
});
//
// schema.set('toObject', { virtuals: true });
// schema.set('toJSON', { virtuals: true });

const friend = mongo.model('friends', schema)

module.exports = friend
