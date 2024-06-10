import postController from "./post.controller.js";
import { getDB } from "../../config/db.js";
import { applicationError } from "../../error-handling/applicationError.js";
export default class postRepository {
  constructor() {
    this.collectionName = "posts.files";
  }
  async getPost() {
    const db = getDB();
    try {
      return await db.collection(this.collectionName).find().toArray();
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }
  async getPostById(id) {
    const db = getDB();
    try {
      return await db.collection(this.collectionName).findOne({ _id: id });
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }

  async deletePost(id) {
    const db = getDB();

    try {
      const result = await db
        .collection(this.collectionName)
        .deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new applicationError("Post not found", 404);
      }
      return result;
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }
  async updatePost(id, caption) {
    const db = getDB();

    try {
      const result = await db
        .collection(this.collectionName)
        .updateOne({ _id: id }, { $set: { caption: caption } });
      if (result.matchedCount === 0) {
        throw new applicationError("Post not found", 404);
      }

      return result;
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }
}
