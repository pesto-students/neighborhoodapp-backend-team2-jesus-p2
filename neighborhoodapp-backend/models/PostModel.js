import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Category from "./CategoryModel.js"

const { DataTypes } = Sequelize;

const Post = db.define('posts', {
    description: {
        type: DataTypes.TEXT
    },
    heading: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
           model: 'users',
           key: 'id',
        }
    }
    // categoryId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //        model: 'categories',
    //        key: 'id',
    //     }
    // }
},{
    freezeTableName:true
});

Post.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categories', 
    sourceKey: 'categoryId'
});

(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});
 
export default Users;