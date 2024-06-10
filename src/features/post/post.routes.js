import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js";
import postController from "./post.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
const postcontroller = new postController();
const postRouter = express.Router();

postRouter.get("/all", (req, res) => {
  postcontroller.getPost(req, res);
});
postRouter.get("/:postId", (req, res) => {
  postcontroller.getPostById(req, res);
});
postRouter.get("/");
postRouter.post("/", (req, res) => {
  postcontroller.newPost(req, res);
});
postRouter.delete("/:postId", (req, res) => {
  postcontroller.deletePost(req, res);
});
postRouter.patch("/:postId", (req, res) => {
  postcontroller.updatePost(req, res);
});

export default postRouter;
