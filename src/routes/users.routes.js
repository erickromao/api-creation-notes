const { Router } = require('express')
const userRouter = Router()

const UserController = require('../controllers/userController')
const userController = new UserController()

userRouter.post("/users", userController.create)

module.exports = userRouter