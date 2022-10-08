import User from './UserModel.js';
import Post from './PostModel.js';
import Category from './CategoryModel.js';
import db from '../config/Database.js';
import Comment from './CommentModel.js';
// import db from './index.js';

const associations = () => {
    User.hasMany(Post, { as: "posts" });
    Category.hasMany(Post, { as: "category_posts"});
    Post.belongsTo(User);
    Comment.belongsTo(User)
    User.hasMany(Comment, { as: "user_comments"});
    Post.hasMany(Comment, { as: "post_comments"});
    Comment.hasMany(Comment, { as: "replies"});
}


(async () => {
    await db.sync();
})().catch(err => {
    console.error(err);
});
console.log("Association file is called")
export default associations