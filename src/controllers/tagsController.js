const knex = require('../database/knex')

class tagsController{

    async index(request,response){
        const { user_id } = request.params

        const tagsUser = await knex("tags").where({user_id})
        
        return response.json(tagsUser)
    }
}

module.exports = tagsController