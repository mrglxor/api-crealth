import Post from "../model/post.model.js";

export const createPost = async(req,res,next) => {
    const {name,post} = req.body;

    try {
        if (!name || !post) {
            return res.status(400).json({ error: 'Name and post are required' });
        }
        const isPostValid = post.length < 15
        if (isPostValid) {
            return res.status(400).json({ error: 'Post must contain at least 15 characters' });
        }
        const newPost = new Post({ name, post });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully'});
    } catch (e) {
        next(e);
    }
}

export const getPost = async(req,res,next) => {
    try {
        const posts = await Post.find(); 
        res.status(200).json({ data: posts });
    } catch (e) {
        next(e);
    }
}