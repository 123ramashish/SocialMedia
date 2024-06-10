// comment.repository.js
import { getDB } from "../../config/db.js";
import { applicationError } from "../../error-handling/applicationError.js";

export default class commentRepository {
  constructor() {
    this.collectionName = "comments";
  }

  async postComment(commentData) {
    const db = getDB();
    try {
      const result = await db
        .collection(this.collectionName)
        .insertOne(commentData);
      return result;
    } catch (err) {
      console.error(err);
      throw new applicationError("Something went wrong!", 500);
    }
  }

  async getAllComment(postId) {
    const db = getDB();
    try {
      const comments = await db
        .collection(this.collectionName)
        .find({ postId: postId })
        .toArray();
      return comments;
    } catch (err) {
      console.error(err);
      throw new applicationError("Something went wrong!", 500);
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
  async updateComment(req, res) {
    try {
      const commentId = req.params.commentId;
      const updatedComment = req.body.updatedComment; // Assuming the updated comment is passed in the request body
      await this.commentRepository.updateComment(commentId, updatedComment);
      res.status(200).send("Comment updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
}