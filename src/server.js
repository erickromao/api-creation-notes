require('express-async-errors')
const express = require('express')
const migrationRun = require('./database/sqlite/migrations')
const router = require('./routes')
const AppError = require('./utils/AppError')

const app = express()

app.use(express.json())
app.use(router)

migrationRun()

app.use((error, request, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"Error",
            message: error.message
        })
    }
    console.error(error)
    response.status(500).json({message:"Error in internal server"})
})

const PORT = 8080

app.listen(PORT, ()=>{console.log(`Server On ${PORT}`)})