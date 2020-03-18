const jwt = require('../../services/jwt')
const userService = require('../../services/user')
const {error} = require('../../common/helper')


module.exports = async (socket, next) => {
    const token = socket.handshake.query.token;
    socket.jwt = jwt.check(token)
    if (socket.jwt) {
      const user = await userService.find(socket.jwt.id)
      // 查询user
      if(user){
        socket.user = user
        await userService.bind(socket.jwt.id, socket.id)
        return next();
      }
    }
    return next(
      new Error(
        JSON.stringify(
          error(401, 'Authentication error!')
        )
      )
    )
  }
