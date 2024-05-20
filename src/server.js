require('express-async-errors')

const migrationRun  = require('./database/sqlite/migrations')
const express = require('express')
const router = require('./routes')
const AppError = require('./utils/AppError')

const app = express()

migrationRun()

app.use(express.json()) 
app.use(router)

app.use((error, require, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    }
    console.error(error)
    return response.status(500).send("Erro in internal Server")
})


const PORT = 3000;

app.listen(PORT, ()=> console.log(`Servidor starting in PORT ${PORT}`))