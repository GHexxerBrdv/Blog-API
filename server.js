const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");
const {protect} = require("./middleware/auth");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs:   15 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(express.json());
app.use(helmet());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Server error"});
})

connectDB();

app.listen(PORT, () => {
    console.log(`the app is running on http://localhost:${PORT}`);
});