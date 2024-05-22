const { Router } = require('express')
const router = Router()
const userRouter = require('./users.routes')

router.use("/users", userRouter)

module.exports = router