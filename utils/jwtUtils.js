const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.KEY, {
        expiresIn: '30d'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.KEY);
}

module.exports = {generateToken, verifyToken};