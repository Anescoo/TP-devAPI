import Router from '@koa/router'
import * as UserControllers from '#components/user/user-controllers.js'

const users =  new Router()

users.post('/register', UserControllers.register)
users.post('/login', UserControllers.login)
users.get('/profile', UserControllers.profile)
users.get('/', UserControllers.index)
users.get('/:id', UserControllers.id)

export default users