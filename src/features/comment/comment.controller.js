// comment.controller.js
import commentRepository from "./comment.repository.js";

export default class commentController {
  constructor() {
    this.commentRepository = new commentRepository();
  }

  async postComment(req, res) {
    try {
      const { userId, postId, comment } = req.body;
      const commentData = new commentModel(userId, postId, comment);
      const result = await this.commentRepository.postComment(commentData);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async getAllComment(req, res) {
    try {
      const postId = req.params.postId;
      const comments = await this.commentRepository.getAllComment(postId);
      res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
  async deleteComment(req, res) {
    try {
      const commentId = req.params.commentId;
      await this.commentRepository.deleteComment(commentId);
      res.status(200).send("Comment deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
  async updateComment(commentId, updatedComment) {
    const db = getDB();
    try {
      const result = await db
        .collection(this.collectionName)
        .updateOne({ _id: commentId }, { $set: { comment: updatedComment } });
      if (result.matchedCount === 0) {
        throw new applicationError("Comment not found", 404);
      }
    } catch (err) {
      console.error(err);
      throw new applicationError("Something went wrong!", 500);
    }
  }
}
