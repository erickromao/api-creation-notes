const sqliteConnectingdb = require('../../sqlite')
const createUsers = require('./CreateUsers')

async function migrationRun(){
    const schamas = [ //esquemas
        createUsers //table
    ].join('')
    sqliteConnectingdb() //minhas conexão
    .then(db=> db.exec(createUsers)) // Indo no meu banco de dados e executandoa função de criação de tableas
    .catch(error=> console.error(error)) //Caso houver algum error
}
module.exports = migrationRun