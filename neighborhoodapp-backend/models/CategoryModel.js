import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Post from "./PostModel.js"

const { DataTypes } = Sequelize;

const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

// Category.hasMany(Post, { as: "posts" });

(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});
 
export default Users;