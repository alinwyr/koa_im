const friend = require('../models/friend')

module.exports = {

  // 将对方加入我的好友列表 id: 我的id， friendId: 对方id
  async joinMyList (id, friendId, lastMessage) {
    let link = await friend.findOne({id, friend: friendId})
    if(!link){
      link = await friend.create({id,friend: friendId, lastMessage: lastMessage._id})
    }
    link.updatedAt = new Date()
    link.unread = 0
    await link.save()
    return link
  },

  // 将对方移出我的好友列表 id: 我的id， friendId: 对方id
  async removeFromMyList (id, friendId) {
    await friend.findOneAndRemove({id, friend: friendId})

    return true
  },

  // 我加入到对方的好友列表中， friendId： 我的id， id: 对方id
  async joinOtherList (friendId, id, lastMessage) {
    let link = await friend.findOne({id, friend: friendId})
    if(!link){
      link = await friend.create({id,friend: friendId, lastMessage: lastMessage._id})
    }
    link.updatedAt = new Date()
    link.unread += 1
    await link.save()
    return link
  },

  async list (id, time) {
    time = new Date(time)
    const res = await friend.find({id})
      .populate({ path: 'info', select: 'id name avatar'})
      .populate({ path: 'lastMessage', select: 'from to data createdAt'})
      .where('createdAt').lt(time)
      .limit(5).sort('-updatedAt').exec()
    return res
  },

  async clearUnread (id, friendId) {
    let link = await friend.findOne({id, friend: friendId})
    if(link){
      link.unread = 0
      return await link.save()
    }
    return false
  }

}
