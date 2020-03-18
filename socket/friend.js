const { error, success } = require('../common/helper')
const userService = require('../services/user')
const chatService = require('../services/chat')
const friendService = require('../services/friend')


module.exports = {
  list: (socket, io) => {
    return async (time, cb) => {
      try {
        // 获取聊天列表数据
        const id = socket.user.id
        const res = await friendService.list(id, time)
        cb(success(res))
      } catch (e) {
        console.log(e)
        cb(error(e.code, e.message || '获取列表失败'))
      }
    }
  },

  removeOne: (socket, io) => {
    return async (friend, cb) => {
      try {
        const id = socket.user.id
        const res = await friendService.removeFromMyList(id, friend)

        cb(success())
      } catch (e) {
        console.log(e)
        cb(error(e.code, e.message || '获取列表失败'))
      }
    }
  },
}
