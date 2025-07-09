const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
    console.log(`the app is running on http://localhost:${PORT}`);
});