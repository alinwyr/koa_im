const chatService = require('../services/chat')

module.exports = (socket, io) => {

    return async (socket, io) => {
        console.log("断开啦啦～～～～～～～～")
        await chatService.removeFromOnlineList(socket.id) // 移出在线列表
        // 通知我的好友

    }
}
