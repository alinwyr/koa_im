const { error, success } = require('../common/helper')
const chatService = require('../services/chat')
const userService = require('../services/user')

module.exports = (socket, io) => {
  return async (id, data, cb) => {
    try {
      const toSocketId = await userService.getSocketId(id)
      const online = await chatService.check(socketId)
      cb(success(online))
    } catch (e) {
      cb(error(e.code, e.message || '发送不成功'))
    }
  }
}