/**
 * @notice asyncHandler, wraps async functions to automatically catch the errors and pass them to express's error handler. 
 */
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.KEY);
            req.user = await User.findById(decode.id).select("-password");
            next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Not authorized, Token failed");
        }
    }

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }


});

const authorize = (roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            res.status(401);
            throw new Error("Forbidden insufficient permission");
        }
        next();
    }
}

module.exports = {protect, authorize};