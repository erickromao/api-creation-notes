const AppError = require('../utils/AppError')
const sqlConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs')
const sqliteConnection = require('../database/sqlite')
const knex = require('../database/knex')

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

        response.status(200).json({ message: "Cadastro feito com sucesso!",
            data:{
                name:name,
                email:email
            }
         })
    }

    async read(request, response){
        const { id } = request.params
        const database = await sqliteConnection()

        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

        if(!user){
            throw new AppError('Usuário não encontrado!')
        }

        response.json({name: user.name, email:user.email})
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

    async delete(request, response){
        const { id } = request.params
        const database = await sqliteConnection()
        
        const checkUserId = await database.get('SELECT * FROM users WHERE id = (?)',[id])
        
        if(!checkUserId){
            throw new AppError('Usuário não encontrado.')
        }
        const checkUserNote = await knex("notes").where({user_id:id})
        if(checkUserNote){
           await knex("notes").where({user_id:id}).delete()
        }
        await database.run('DELETE FROM users WHERE id = (?)', [id])
       
        response.json({message:"Usuário deletado com sucesso."})
    }
}
    
module.exports = userController