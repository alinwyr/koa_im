const { error, success } = require('../common/helper')

module.exports = (socket, io) => {
    return async e => {
        io.to(socket.id).emit('error', error(e.code, e.message))
    }
}