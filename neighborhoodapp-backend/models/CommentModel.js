import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import db from './index.js';


const { DataTypes } = Sequelize;

const Comment = db.define('comments', {
    message: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
           model: 'users',
           key: 'id',
        },
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
           model: 'posts',
           key: 'id'
        },
        allowNull: false
    }
},{
    freezeTableName: true
});

Comment.associate = function (models) {
    // associations can be defined here
    Comment.hasMany(models.Comment, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'parentCommentId',
            allowNull: true
        },
        allowNull: true,
        as: 'ParentComment'
    });
};

(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});
console.log("Comment Model is called");
export default Comment;