const Router = require('koa-router')
const koajwt = require('koa-jwt')

const mongoose = require('mongoose')
const UserModel = require('../../db/models/user')
const TaskModel = require('../../db/models/task')

const config = require('../../../../config')

const secureRoutes = new Router()

secureRoutes.use(koajwt({ secret: config.JWT_SECRET }))

const getUser = async (ctx) => {
  const { userId } = ctx.params
  try {
    const user = await UserModel.findOne({ _id: userId })
    if (user.boardType === 'private' && userId !== ctx.state.user.userId) {
      ctx.body = {
        success: false,
        data: {
          id: user._id,
          error: 'Access denied',
        },
      }
    } else {
      ctx.body = {
        success: true,
        data: {
          name: user.username,
          id: user._id,
        },
      }
    }
  } catch (e) {
    ctx.body = {
      success: false,
      data: {
        error: 'Not found',
      },
    }
  }
}

const getUserTasks = async (ctx) => {
  const { user } = ctx.params
  ctx.body = await TaskModel.find({ author: user })
}

const getSingleTask = async (ctx) => {
  const { id } = ctx.params
  const taskItem = await TaskModel.find({ _id: id })
  ctx.body = taskItem
}

const addNewTask = async (ctx) => {
  const { caption, boardId } = ctx.request.body
  const task = TaskModel({
    caption,
    completed: false,
    author: boardId,
  })
  const user = await UserModel.findOne({ _id: boardId })
  const taskId = task._id
  user.tasks.push(taskId)
  await user.save()
  ctx.body = await task.save()
}

const deleteTask = async (ctx) => {
  const { id } = ctx.params
  const deletedItem = await TaskModel.findOneAndDelete({ _id: id })
  const user = await UserModel.findOne({ _id: deletedItem.author })

  const { ObjectId } = mongoose.Types
  user.tasks.splice(user.tasks.indexOf(ObjectId(id)), 1)
  await user.save()
  ctx.body = deletedItem
}

const updateTask = async (ctx) => {
  const updatedItem = ctx.request.body
  ctx.body = await TaskModel.findOneAndUpdate({ _id: updatedItem._id },
    updatedItem, { new: true })
}

const deleteAllTasks = async (ctx) => {
  const { userId } = ctx.params
  await TaskModel.remove({ author: userId })
  ctx.body = []
}

secureRoutes.get('/users/:userId', getUser)

secureRoutes.get('/tasks/:user', getUserTasks)

secureRoutes.get('/tasks/:id', getSingleTask)

secureRoutes.post('/tasks', addNewTask)

secureRoutes.delete('/tasks/:id', deleteTask)

secureRoutes.put('/tasks', updateTask)

secureRoutes.delete('/remove-all-tasks/:userId', deleteAllTasks)

module.exports = secureRoutes
