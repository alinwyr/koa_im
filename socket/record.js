const { error, success } = require('../common/helper')
const chatService = require('../services/chat')


module.exports = (socket, io) => {
  return async (id, lastId, cb) => {
    try {
      const res = await chatService.list(socket.user.id, id, data) // 这里应该传入用户id而不是socket id
      cb(success(res))
    } catch (e) {
      cb(error(e.code, e.message || '发送不成功'))
    }
  }
}