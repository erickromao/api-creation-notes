const { Router } = require('express')
const notesController = require('../controllers/notesController')
const notesRouter = Router()

const NotesController = new notesController()

notesRouter.post("/:user_id", NotesController.create)

module.exports = notesRouter