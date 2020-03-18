const { error, success } = require('../common/helper')
const friendService = require('../services/friend')
const chatService = require('../services/chat')


module.exports = (socket, io) => {
  return async (id, time, cb) => {
    try {
      // 获取聊天列表数据
      const res = await chatService.list(socket.user.id, id, time)

      // 此时应该将未读消息清零 TODO: 如何避免重复执行
      friendService.clearUnread(socket.user.id, id)

      cb(success(res))
    } catch (e) {
      console.log(e)
      cb(error(e.code, e.message || '获取列表失败'))
    }
  }
}