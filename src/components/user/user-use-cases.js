import UserModel from '#components/user/user-model.js'

export async function updateUser (id, params) {
  return UserModel.findByIdAndUpdate(id, params, { runValidators: true, new: true })
}