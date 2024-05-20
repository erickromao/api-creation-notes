const AppError = require('../utils/AppError')

class userController {

    create(require, response) {
        const { name, email, password } = require.body

        if (!name) {
            throw new AppError("Alguns dados não foram preenchidos devidamente.")
        }

        response.status(200).json({ name, email, password })
    }

}

module.exports = userController