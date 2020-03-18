require('../config/env')

const socketIo = require('socket.io')

// event handlers
const connectHandler = require('./connect')
const errHandler = require('./error')
const chatHandler = require('./chat')
const listHandler = require('./list')
const readHandler = require('./read')
const sysHandler = require('./system')
const disconHandler = require('./disconnect')
const onlineStatusHandler = require('./onlineStatus')
const recordHandler = require('./record')
const friendHandler = require('./friend')
const userHandler = require('./user')



/**
 * @param { Koa } server koa实例
 */
module.exports = server => {
  const io = socketIo(server,{
    path: '/chat',
    origins: 'http://localhost:' + process.env.PORT,
    pingInterval: 2000, // 2s ping一次
    pingTimeout: 4000, // 4s 未响应即超时
    cookie: false
  });

  // 中间件
  io.use(require('./middlewares/auth'));

  // 客户端连接事件，我的建议是连接的时候不要事情，具体在on监听里面写逻辑就好
  io.on('connection', async socket => {
    console.log("连着呢呢～～～～～～～～")
    // 上线处理
    connectHandler(socket, io)

    // 错误事件处理
    socket.on('error', errHandler(socket, io))

    // 私聊发信息
    socket.on('send', chatHandler.send(socket, io));

    // 撤回
    socket.on('recall', chatHandler.recall(socket, io));

    // 消息已读设置
    socket.on('read', readHandler(socket, io))

    // 检查在线状态
    socket.on('onlineStatus', onlineStatusHandler(socket, io))

    // 获取单聊记录
    socket.on('record', recordHandler(socket, io));

    // 获取聊天列表
    socket.on('list', listHandler(socket, io));

    // 获取好友列表
    socket.on('friend', friendHandler.list(socket, io));

    // 删除聊天列表中的某个人。。。这里要注意，双方的聊天列表应该互不影响
    socket.on('delete', friendHandler.removeOne(socket, io));

    // 撤回消息
    socket.on('delete', friendHandler.removeOne(socket, io));

    // 客户端断开连接。。。还少了一个重连的机制
    socket.on('disconnect', disconHandler(socket, io));


    /**
     * 仅用于开发的接口
     */
    if(process.env.NODE_ENV == 'development'){

      // 获取所有用户
      socket.on('users', userHandler(socket, io));

      // 系统消息
      socket.on('system', sysHandler(socket, io))
    }
  });
};
