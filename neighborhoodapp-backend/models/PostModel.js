import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import db from './index.js';
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
        },
        allowNull: false
    }
},{
    freezeTableName:true
});

Post.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categories', 
    sourceKey: 'categoryId',
    allowNull: false
});

(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});
console.log("PostModel is called")

export default Post;