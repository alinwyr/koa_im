const { error, success } = require('../common/helper')
const userService = require('../services/user')


module.exports = (socket, io) => {
  return async cb => {
    try {
      const res = await userService.all()

      cb(success(res))
    } catch (e) {
      console.log(e)
      cb(error(e.code, e.message || '获取列表失败'))
    }
  }
}
