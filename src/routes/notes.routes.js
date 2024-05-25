const { Router } = require('express')
const notesController = require('../controllers/notesController')
const notesRouter = Router()

const NotesController = new notesController()

notesRouter.post("/:user_id", NotesController.create)
notesRouter.get("/:id", NotesController.show)
notesRouter.delete("/:id",NotesController.delete)
notesRouter.get("/", NotesController.index)

module.exports = notesRouter