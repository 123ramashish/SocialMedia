// like.repository.js
import { getDB } from "../../config/db.js";
import { applicationError } from "../../error-handling/applicationError.js";

export default class likeRepository {
  constructor() {
    this.collectionName = "posts";
  }

  async postLike(userId, postId) {
    const db = getDB();
    try {
      const result = await db.collection(this.collectionName).updateOne(
        { _id: postId },
        { $addToSet: { likes: userId } } // Add userId to the likes array if it doesn't exist
      );
      if (result.matchedCount === 0) {
        // If no document was matched, it means the post with the given ID doesn't exist
        throw new applicationError("Post not found", 404);
      }
    } catch (err) {
      console.error(err);
      throw new applicationError("Something went wrong!", 500);
    }
  }

  async getLike(postId) {
    const db = getDB();
    try {
      const post = await db
        .collection(this.collectionName)
        .findOne({ _id: postId });
      if (!post) {
        throw new applicationError("Post not found", 404);
      }
      const likeCount = post.likes ? post.likes.length : 0;
      return likeCount;
    } catch (err) {
      console.error(err);
      throw new applicationError("Something went wrong!", 500);
    }
  }
}
