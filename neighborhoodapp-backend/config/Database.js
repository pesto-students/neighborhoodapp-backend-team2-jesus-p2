import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', '', {
    host: '127.0.0.1',
    dialect: "mysql"
})

db
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
 .catch(err => {
 console.error('Unable to connect to the database:', err);
});

export default db;