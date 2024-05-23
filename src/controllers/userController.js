const AppError = require('../utils/AppError')
const sqlConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs')

class userController {

    async create(request, response) {
        const { name, email, password } = request.body
        const database = await sqlConnection()

        const checkUserEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if (checkUserEmail) {
            throw new AppError("Email já existente")
        }

        const hashedPassword = await hash(password, 8)

        await database.run('INSERT INTO users(name, email, password) VALUES(?, ?, ?) ', [name, email, hashedPassword])

        response.status(200).json({ message: "Cadastro feito com sucesso!" })
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const { id } = request.params

        const database = await sqlConnection()

        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])
        if (!user) {
            throw new AppError("Usuário não encontrado!")
        }

        const userEmailCheck = await database.get('SELECT * FROM users WHERE email = (?)', [email])
        if (userEmailCheck && userEmailCheck.id !== user.id) {
            throw new AppError('Email já existente!')
        }
        user.name = name ?? user.name
        user.email = email ?? user.email

        if (password, !old_password) {
            throw new AppError('É preciso passar a senha antiga para alterar.')
        }

        if (password, old_password) {
            const checkPassword = await compare(old_password, user.password)

            if (!checkPassword) {
                throw new AppError('Senha antiga incorreta!')
            }
        }
        user.password = await hash(password, 8)

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            update_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, id]
        )

        response.status(200).json({ message: "Usuário atualizado com sucesso!" })
    }
}

module.exports = userController