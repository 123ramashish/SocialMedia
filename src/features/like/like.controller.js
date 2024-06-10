// like.controller.js
import likeRepository from "./like.repository.js";
export default class likeController {
  constructor() {
    this.likeRepository = new likeRepository();
  }

  async postLike(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is available in req.user
      const postId = req.params.id;
      await this.likeRepository.postLike(userId, postId);
      res.status(200).send("Like posted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async getLike(req, res) {
    try {
      const postId = req.params.id;
      const likeCount = await this.likeRepository.getLike(postId);
      res.status(200).json({ likes: likeCount });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
}