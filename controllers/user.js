const jwt = require('../services/jwt')

const user = {
  async store (ctx, next) {
    const id = ctx.request.body.id
    let user = ctx.request.body

    if (! id) {
      return ctx.error(4000, '用户id是必填的')
    }

    const cache = ctx.req.cache

    const _user = cache.p_get(id)
    if(_user){
      user = Object.assign(_user, user)
    }
    
    const expire = 3600 * 24 * 7
    const res = await cache.p_set(id, user, expire) // 7day
    return ctx.body = {
      data: res,
      expire: Math.round(new Date() / 1000) + expire
    }
  },
}

module.exports = user