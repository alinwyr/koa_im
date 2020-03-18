const { error, success } = require('../common/helper')
const userService = require('../services/user')
const chatService = require('../services/chat')


module.exports = (socket, io) => {
  return async (_id) => {
    try {
      await chatService.updateById(_id, {read: true})
    } catch (e) {
      
    }
  }
}