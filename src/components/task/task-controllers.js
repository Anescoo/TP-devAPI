import TaskModel from '#components/task/task-model.js'
import { updateTask } from '#components/task/task-use-cases.js'
import Joi from 'Joi'

export async function index (ctx) {
  try {
    const tasks = await TaskModel.find({})
    ctx.ok(tasks)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const task = await TaskModel.findById(ctx.params.id)
    if(!task) { return ctx.notFound() }
    ctx.ok(task)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function getAllByList (ctx) {
  try {
    if(!ctx.params.listId) throw new Error('No id supplied')
    const tasks = await TaskModel.findByListId(ctx.params.listId)
    ctx.ok(tasks)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}


export async function create (ctx) {
  try {
    const taskValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      list: Joi.string().required()
    })
    const { error, value } = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    const newTask = await TaskModel.create(value)
    ctx.ok(newTask)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const taskValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      list: Joi.string(),
      done: Joi.boolean()
    })
    if(!ctx.params.id) throw new Error('No id supplied')
    const { error, value } = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const updatedTask = await updateTask(ctx.params.id, ctx.request.body)

    ctx.ok(updatedTask)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function destroy (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    await TaskModel.findByIdAndDelete(ctx.params.id)
    ctx.ok('Ressource deleted')
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}