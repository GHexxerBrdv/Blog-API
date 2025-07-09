const asyncHandler = require("express-async-handler");
const Post = require("../models/post");

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(401);
        throw new Error("Please include title and content");
    }

    const post = await Post.create({
        title,
        content,
        author: req.user._id
    });

    res.status(201).json(post);
});

const getPost = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("author", "username").sort("-createdAt");
    res.json(posts);
})

const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(401);
        throw new Error("Post not found");
    }

    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to update this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
            ...req.body,
            updatedAt: Date.now()
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(401);
        throw new Error("Post not found");
    }

    if (post.author.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to delete this post");
    }

    // const deletedPost = await Post.findByIdAndDelete(
    //     req.params.id
    // );

    await post.deleteOne();
    res.json({ message: 'Post removed' });
});

module.exports = {
    getPost, createPost, updatePost, deletePost
}