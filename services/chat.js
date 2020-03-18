const redis = require('../databases/redis')()
const chat = require('../models/chat')

module.exports = {
  
  // 查找消息
  async find(data){
    return await chat.findOne(data)
  },

  // 添加用户到在线列表
  async setIntoOnlineList (socketId) {
    return await redis.p_sadd('online.list', [socketId])
  },

  // 将用户从在线列表中移除
  async removeFromOnlineList (socketId) {
    return await redis.p_srem('online.list', [socketId])
  },

  // 检查用户在线状态
  async check (socketId) {
    return await redis.p_sismember(socketId)
  },

  // 处理总未读消息增加，这里仅是总的，不是单聊未读消息数
  async increaseUnread (id) {
    const key = 'unread.' + id
    if(!await redis.p_exist(key)){
      await redis.p_set(key, 0)
    }
    return await redis.p_incr(key)
  },

  // 存储聊天消息
  async store (from, to, data) {
    from = from.toString().trim()
    to = to.toString().trim()
    const key = JSON.stringify([from, to].sort())
    const chatModel = new chat({
      from, to, data, read: false, key, 
    })
    const res = await chatModel.save()
    return res
  },

  // 更新聊天消息
  async updateById (id, data) {
    return await chat.findByIdAndUpdate(id, data)
  },

  // 获取聊天列表 time: 在此时间点之前的消息
  async list (from, to, time) {
    from = from.toString().trim()
    to = to.toString().trim()
    time = new Date(time)
    const key = JSON.stringify([from, to].sort())
    const res = await chat.find({key}).where('createdAt').lt(time).limit(5).where('recall').equals(false)
    .sort('-createdAt').exec()
    return res
  }
}
