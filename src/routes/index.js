const { Router } = require('express')
const router = Router()
const userRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')

router.use("/users", userRouter)
router.use("/notes", notesRouter)
router.use("/tags", tagsRouter)

module.exports = router