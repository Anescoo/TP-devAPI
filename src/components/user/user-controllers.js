import UserModel from '#components/user/user-model.js'
import Joi from 'joi'
import argon2, { hash } from 'argon2'
import { sendWelcomeEmail } from '#services/mailing/welcome-email.js'
import jwt from 'jsonwebtoken'

export async function index (ctx) {
  try {
    const user = await UserModel.find({})
    ctx.ok(user)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const user = await UserModel.findById(ctx.params.id)
    if(!user) { return ctx.notFound() }
    ctx.ok(user)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function register (ctx) {
 try {
  const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    list: Joi.string().required(),
    task: Joi.string().required(),
  })
  const params = ctx.request.body
  const { error, value } = registerValidationSchema.validate(params)
  if(error) throw new Error(error)
  const hashedPassword = await argon2.hash(value.password)
  const newUser = new UserModel({
    ...value,
    password: hashedPassword,
  })
  newUser.generateEmailVerificationToken()
  const user = await newUser.save()
  await sendWelcomeEmail(user, user.settings.validation_email_token)
  ctx.ok(newUser)
  console.log(newUser)
 } catch(e) {
  console.log("ERROR MY FRIEND")
  ctx.badRequest({ message: e.message })
 }
}


export async function login (ctx) {
  try {
    const registerValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    const params = ctx.request.body
    const { error, value } = registerValidationSchema.validate(params)
    if(error) throw new Error(error)

    const userEmail = await UserModel.findOne({ email: value.email }).select('email')
    const email_login = await ctx.request.body.email
    const hashPassword = await UserModel.findOne({ email: value.email }).select('password')
    const password_login = await ctx.request.body.password

    // console.log(userEmail.email)
    // console.log(email_login)
    // console.log(hashPassword.password)
    // console.log(password_login)

    // console.log(user)

    // check le email et le password si l'utilisateur si il existe
    if (userEmail.email == email_login && await argon2.verify(hashPassword.password, password_login)) {
      console.log("Email existe and password match !")
      ctx.body = "Email and password match"
      userEmail.generateJWT()
      const user = await userEmail.save()
      console.log(user)

    } else {
      console.log("Error the email or password is wrong !")
      throw new Error('Error the email or password is wrong !')
    }

  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function profile (ctx) {
  try {
    
    const userToken = await UserModel.find({})
    const token = userToken

    console.log(token)

    // if (token) {
    //   const decode = jwt.verify(token, process.env.JWT_SECRET);
    //   const userEmail = await UserModel.findOne(ctx.params.email)
    //   ctx.ok(userEmail)
    //   console.log(decode)
    // } else {
    //   console.log("Error can't find profile !")
    //   throw new Error("Invalid")
    // }

    const user = await UserModel.find({})
    ctx.ok(user)

  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function getAllUserTasks (ctx) {
  try {
    if(!ctx.params.taskId) throw new Error('No id supplied')
    const userTAsks = await UserModel.findByTaskId(ctx.params.taskId)
    ctx.ok(userTAsks)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function getAllByList (ctx) {
  try {
    if(!ctx.params.listId) throw new Error('No id supplied')
    const userLists = await UserModel.findByListId(ctx.params.listId)
    ctx.ok(userLists)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}


