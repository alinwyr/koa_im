const { error, success } = require('../common/helper')

module.exports = (socket, io) => { 
    return async data => {
        io.to(socket.id).emit('system', success({}, '已收到第 ' + data.count + ' 条信息。' ));
    }
}