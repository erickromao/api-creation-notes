const AppError = require('../utils/AppError')

class userController {

    create(request, response){
        const {name, password} = request.body

        if(!name){
            throw new AppError("Preenchar o nome")
        }
        response.status(200).json({name,password})
    }
}

module.exports = userController