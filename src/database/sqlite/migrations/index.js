const createUserTable = require('./createUser')
const sqliteConnection = require('../../sqlite')

async function migrationRun(){
    const schemas = [
        createUserTable
    ].join('')

    sqliteConnection()
    .then(db=> db.exec(schemas))
    .catch(error => console.log(error))
}

module.exports = migrationRun