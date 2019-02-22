const Koa = require('koa')
const mongoose = require('mongoose')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const router = require('./modules/router')

const config = require('../../config')

const app = new Koa()

mongoose.connect(`mongodb://${config.MONGODB_USER}:${config.MONGODB_PASSWORD}@ds119160.mlab.com:19160/${config.MONGODB_DB_NAME}`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.PORT)
