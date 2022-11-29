import Router from '@koa/router'
import * as listControllers from '#components/list/list-controllers.js'

const lists = new Router()

lists.get('/', listControllers.index)
lists.get('/:id', listControllers.id)
lists.post('/', listControllers.create)
lists.put('/:id', listControllers.update)
lists.del('/:id', listControllers.destroy)

export default lists