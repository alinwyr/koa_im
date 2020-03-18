const _redis = require('redis');
const { promisify } = require("util");

let redis = null


module.exports = function () {
  if (!redis){
    redis = _redis.createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      // password: process.env.REDIS_PASSWORD || '',
      db: process.env.REDIS_DB || 0,
      // no_ready_check: true,
    })
    // 封装set和get方法
    redis.p_set = function (key, value, expire) {
      return new Promise(((resolve, reject) => {
        if(!expire)return resolve(null);
        key = key.toString().trim()
        value = JSON.stringify(value)

        expire = parseInt(expire)
        redis.set(key, value, function (err, reply) {
          if(err){
            reject(err)
          }else{
            redis.expire(key, expire, function (err, reply) {
              if(err)reject(err)
              resolve(JSON.parse(value))
            })
          }
        })
      }));
    }
    redis.p_get = function (key){
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.get(key, function (err, value) {
          if (err) reject(err)
          try{
            value = JSON.parse(value)
            resolve(value)
          }catch (e) {
            reject(err)
          }
        })
      })
    }

    redis.p_sadd = function (key, members) {
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.sadd(key, ...members, function(err){
          if(err)reject()
          resolve()
        })
      })
    }

    redis.p_scard = function (key) {
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.scard(key, function(err, count){
          if(err)reject()
          resolve(count)
        })
      })
    }

    redis.p_sismember = function (key, member) {
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.sismember(key, member, function(err, count){
          if(err)reject()
          resolve()
        })
      })
    }

    redis.p_srem = function (key, members) {
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.srem(key, ...members, function(err){
          if(err)reject()
          resolve()
        })
      })
    }

    redis.p_incr = function (key, increment = 1){
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.incrby(key, increment, function(err){
          if(err)reject()
          resolve()
        })
      })
    }

    redis.p_exist = function (key) {
      return new Promise((resolve, reject) => {
        key = key.toString().trim()
        redis.exist(key, function(err){
          if(err)reject()
          resolve()
        })
      })
    }
  }

  return redis;
}


