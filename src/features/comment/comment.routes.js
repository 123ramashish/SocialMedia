import express from "express";
import commentController from "./comment.controller.js";
const commentRouter = express.Router();
const commentcontroller = new commentController();

commentRouter.get("/:postId", (req, res) => {
  commentcontroller.getAllComment(req, res);
});
commentRouter.post("/:postId", (req, res) => {
  commentcontroller.postComment(req, res);
});
commentRouter.delete("/:commentId", (req, res) => {
  commentcontroller.deleteComment(req, res);
});
commentRouter.patch("/:commentId", (req, res) => {
  commentcontroller.updateComment(req, res);
});

export default commentRouter;
