require('./config/env')

const Koa = require('koa')
const app = new Koa()
// const redis = require('./databases/redis')
const json = require('koa-json')
const koaBody = require('koa-body')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(koaBody({
  multipart: true,
  formidable: {
    // uploadDir:path.join(__dirname,'public/upload'),
    maxFileSize: 4*1024*1024,    // 设置上传文件大小最大限制，默认2M
    keepExtensions: true,
  },
}));

app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// redis
// app.use(async (ctx, next) => {
//   ctx.req.cache = redis();
//   await next();
// })


// global function
app.use(async (ctx, next) => {
  ctx.success = function(data = [], msg = '操作成功'){
    ctx.body = {errCode: 0, data, msg}
  }
  ctx.error = function(errCode = 4000, msg = '操作失败', data = []){
    ctx.body = {errCode, data, msg}
  }
  await next()
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

app.user(cors())

module.exports = app
