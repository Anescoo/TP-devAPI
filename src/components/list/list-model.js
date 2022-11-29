import mongoose from 'mongoose'

const { Schema } = mongoose

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const List = mongoose.model('List', listSchema)

export default List