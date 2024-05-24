const { Router } = require('express')
const UserController = require('../controllers/userController')
const userRouter = Router()

const userController = new UserController()

userRouter.post("/", userController.create)
userRouter.get("/:id", userController.read)
userRouter.put("/:id", userController.update)
userRouter.delete("/:id", userController.delete)

module.exports = userRouter