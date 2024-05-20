const CreateUsers = `
    CREATE TABLE IF NOT EXIST users(
        id INTEGER PRIMARY KEY AUTOINCREMENT
        name VARCHAR
        email VARCHAR
        password VARCHAR
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`


// CREATE TABLE users (
//     id        INTEGER   PRIMARY KEY AUTOINCREMENT,
//     name      VARCHAR,
//     email     VARCHAR,
//     password  VARCHAR,
//     avatar    VARCHAR,
//     create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
