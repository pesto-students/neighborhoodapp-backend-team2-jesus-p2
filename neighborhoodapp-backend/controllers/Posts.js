import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

export const createPost = async(req, res) => {
    console.log('CreatePost', req.email)
    await Post.create({
        description: req.body.description,
        heading: req.body.heading,
        userId: req.currentUser.id,
        categoryId: 1
    }).then(function (post) {
        if (post) {
            res.send(post);
        }else {
            res.status(400).send('Error in creating post');
        }
    });
}

export const getUserPosts = async(req, res) => {
    const user = req.currentUser;
    console.log("user", user)
    const posts = await Post.findAll({ where: { userId: user.id } })
    console.log("posts", posts)
    res.status(200).send(posts);
}

export const getAllPosts = async(req, res) => {
    console.log("getAllPosts called", req.body)
    try {
        const user = req.currentUser;
        const users = await User.findAll({ 
            where: {
                pincode: user.pincode,
            },
            attributes: ['id'],
            raw : true
        }).then(users => users.map(user => user.id));
        const posts = await Post.findAll({where: {userId: users}});
        if(posts){
            res.status(200).send(posts)
        }else{
            res.status(400).send("No posts found")
        }
    }catch(error) {
        res.status(400).send(error)
    }
}

export const editPost = async(req, res) => {
    try {
        const user = req.currentUser;
        const post = await Post.findOne({id: req.body.post_id, userId: user.id})
        if(post){
            res.status(200).send(post)
        }else{
            res.status(400).send('No post found')
        }
    }catch(error) {
        res.status(400).send(error)
    }
}

export const updatePost = async(req, res) => {
    try {
        const user = req.currentUser;
        const post = await Post.findOne({id: req.body.post_id, userId: user.id})
        if(post){
            post.update(req.body)
            .then(res.send(post)).catch(err => {
                res.status(400).send(`${err}`)
            })
        }else{
            res.status(400).send("Post not found");
        }
    } catch(error) {
        console.log(error);
    }
}
