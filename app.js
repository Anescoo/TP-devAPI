import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { API_V1_ROUTER } from "#routes/index.js"
import { API_V2_ROUTER } from "#routes/index.js"
import { API_V3_ROUTER } from "#routes/index.js"
import { API_V4_ROUTER } from "#routes/index.js"
import '#config/database.js'
import '#config/maildev.js'
import respond from 'koa-respond'

const app = new Koa()

app
.use(bodyParser())
.use(respond())
.use(API_V1_ROUTER.routes())
.use(API_V1_ROUTER.allowedMethods())
.use(API_V2_ROUTER.routes())
.use(API_V2_ROUTER.allowedMethods())
.use(API_V3_ROUTER.routes())
.use(API_V3_ROUTER.allowedMethods())
.use(API_V4_ROUTER.routes())
.use(API_V4_ROUTER.allowedMethods())

app.listen(process.env.PORT, () => console.log(`Server is listening on PORT: ${process.env.PORT}`))
