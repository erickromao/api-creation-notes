const { Router } = require('express')
const UserController = require('../controllers/userController')
const userRouter = Router()

const userController = new UserController()

userRouter.post("/", userController.create)
userRouter.put("/:id", userController.update)

module.exports = userRouter