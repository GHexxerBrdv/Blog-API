const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const {generateToken} = require("../utils/jwtUtils");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(401);
        throw new Error("Please include all fields");
    }

    const userExist = await User.findOne({email});
    if(userExist) {
        res.status(400);
        throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        username, 
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(401);
        throw new Error("Please include all fields");
    }

    const user = await User.findOne({email}).select("+password");

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(uaer._id)
        });
    } else {
        res.status(401);
        throw new Error("invalid credentials");
    }
});

module.exports = {
    registerUser, loginUser
}