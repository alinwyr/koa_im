const router = require('koa-router')()
const user = require('../controllers/user')

router.post('/user', user.store)

// router.get('/:id', async (ctx, next) =>{
//   if(process.env.NODE_ENV === 'development'){
//     const user_id = ctx.params.id
//     const jwt = require('../services/jwt')
//     const fs = require('fs')
//     const token = jwt.sign({id: user_id});
//     const head = `<script>const token='${token}';const id=${user_id};const port=${process.env.PORT};</script>`
//     let html = fs.readFileSync(__dirname + '/../views/chat.html')
//
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body= head + html;
//   }
// })

module.exports = router
