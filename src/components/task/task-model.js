import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  done: {
    type: Boolean,
    default: false
  },
  list: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'List'
  }
}, { 
  timestamps: true
})

taskSchema.static({
  findByListId (listId) {
    return this.find({ list: listId })
  }
})

const Task = mongoose.model('Task', taskSchema)

export default Task