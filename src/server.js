require('express-async-errors')

const database  = require('./database/sqlite')
const express = require('express')
const router = require('./routes')
const AppError = require('./utils/AppError')

const app = express()

app.use(express.json()) 
app.use(router)

database()

app.use((error, require, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message: "O correu um erro.",
            status: error.message
        })
    }
    console.error(error)
    return response.status(500).send("Erro on internal Server")
})


const PORT = 8080;

app.listen(PORT, ()=> console.log(`Servidor starting in PORT ${PORT}`))