const { Router } = require('express')
const tagsRouter = Router()
const tagsController = require('../controllers/tagsController')

const TagsController =  new tagsController()

tagsRouter.get("/:user_id", TagsController.index)

module.exports = tagsRouter