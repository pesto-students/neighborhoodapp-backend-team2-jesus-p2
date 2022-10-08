import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import db from './index.js';


const { DataTypes } = Sequelize;

const Users = db.define('users', {
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    pincode: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.TEXT
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});

console.log("usersModel is called")
export default Users;