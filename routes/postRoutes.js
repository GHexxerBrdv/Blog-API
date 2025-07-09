const express = require("express");
const {getPost, createPost, updatePost, deletePost} = require("../controllers/postController");
const {protect} = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getPost).post(protect, createPost);
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

module.exports = router;