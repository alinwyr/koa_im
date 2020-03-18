const user = require('../models/user')

module.exports = {
  async all () {
    try{
      return await user.find().exec()
    }catch(e){
      console.log(e)
    }
  },

  async find (id) {
    try{
      return await user.findOne({ id }).exec()
    }catch(e){
      console.log(e)
    }
  },

  async bind (id, socketId) {
    return await user.updateOne({ id }, { $set: { socketId } }).exec()
  },

  async getSocketId (id) {
    const _user = await user.findOne({ id }).exec()
    if(!_user) throw { message: "用户不存在" }
    return _user.socketId
  },

  async insertTestData (data) {
    await user.insertMany(data)
  }
}
