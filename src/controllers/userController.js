const { hash,compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnectingdb = require('../database/sqlite')

class userController {

    async create(require, response) {
        const { name, email, password } = require.body
        const database = await sqliteConnectingdb()
        const checkUsersExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if (checkUsersExists) {
            throw new AppError("E-mail já existente!")

        }

        const hashedPassword = await hash(password, 8)

        await database.run(
            'INSERT INTO users (name, email, password) VALUES (?,?,?)'
            , [name, email, hashedPassword]
        )

        return response.status(201).json({ message: "Cadastrado feito com sucesso!" })

    }

    async update(require, response) {
        const { name, email, password, new_password } = require.body
        const { id } = require.params

        const database = await sqliteConnectingdb()
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

        if (!user) {
            throw new AppError("Usuário não encontrado!")
        }

        const userDateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

        if (userDateEmail && userDateEmail.id !== user.id) {
            throw new AppError("E-mail já existente!")
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(new_password && !password){
            throw new AppError("Para alterar a senha é preciso passar a antiga.")
        }

        if(new_password && password){
            const CheckComparePassword = await compare(password, user.password)
            if(!CheckComparePassword){
                throw new AppError("As senhas não conferem!")
            }
            
            user.password = await hash(new_password,8)
        }

        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password= ?,
        update_at = DATETIME('now')
        WHERE id = ?`,
            [user.name, user.email, user.password, id]
        )
        
        response.status(200).json({message:"Cadastro atualizado com sucesso!"})
    }
}

module.exports = userController