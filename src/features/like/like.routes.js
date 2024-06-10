import express from "express";
import likeController from "./like.controller.js";
const likeRouter = express.Router();
const likecontroller = new likeController();

likeRouter.post("/toggle/:id", (req, res) => {
  likecontroller.postLike(req, res);
}); 
// router method for toggle
likeRouter.get("/:id", (req, res) => {
  likecontroller.getLike(req, res);
});

export default likeRouter;
