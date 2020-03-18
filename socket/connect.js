const chatService = require('../services/chat')

module.exports = async (socket, io) => {
    await chatService.setIntoOnlineList(socket.id) // 加入在线列表
    
    // 上线了应当通知我的所有好友
    
}