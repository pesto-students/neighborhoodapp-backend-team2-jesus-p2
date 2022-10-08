import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./PostModel.js";
// import db from './index.js';


const { DataTypes } = Sequelize;

const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    freezeTableName:true
});


(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});
 
export default Category;