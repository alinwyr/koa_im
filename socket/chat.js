const { error, success } = require('../common/helper')
const userService = require('../services/user')
const chatService = require('../services/chat')
const friendService = require('../services/friend')


module.exports = {
  
  send: (socket, io) => {
    /**
     * {String}   id: 对方的用户id
     * {any}      data: 消息体
     * {Function} cb: 回调
     */
    return async (id, data, cb) => {
      try {
        const me = socket.user.id
        const toSocketId = await userService.getSocketId(id) // 如果用户不存在会直接报错，catch 处理
        const res = await chatService.store(me, id, data) // 这里应该传入用户id而不是socket id
        if(toSocketId){ // 用户的socket id 存在，则尝试发送
          io.to(toSocketId).emit('send', success(res))
        }

        // 在我的好友列表中添加对方
        await friendService.joinMyList(me, id, res)

        // 在对方的好友列表中添加我
        await friendService.joinOtherList(me, id, res)

        cb(success(res))
      } catch (e) {
        console.log(e)
        cb(error(e.code, e.message || '发送不成功'))
      }
    }
  },

  // TODO 幂等性没做
  recall: (socket, io) => {
    /**
     * id: 撤回的消息id
     */
    return async (_id, cb) => {
      try {
        const res = await chatService.find({_id, from: socket.user.id, recall: false})
        if(! res)return cb(error(400, '撤回的消息不存在，请重试'))
        if(new Date() - res.createdAt > 180 *1000)return cb(error(503, '只能撤回3分钟内的消息'))
        res.recall = true
        res.updatedAt = new Date()
        if(await res.save()){
          // 通知对方撤回消息
          const toSocketId = await userService.getSocketId(res.to) // 如果用户不存在会直接报错，catch 处理
          if(toSocketId){
            io.to(toSocketId).emit('recall', success(res))
          }
          return cb(success(res))
        }
        cb(error(500, '网络错误'))
      } catch (e) {
        console.log(e)
        cb(error(e.code, e.message || '发送不成功'))
      }
    }
  },
}