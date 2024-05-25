const { Router } = require('express')
const router = Router()
const userRouter = require('./users.routes')
const notesRouter = require('./notes.routes')

router.use("/users", userRouter)
router.use("/notes", notesRouter)

module.exports = router