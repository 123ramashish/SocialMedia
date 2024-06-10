import { ObjectId } from "mongodb";
import postModel from "./post.model.js";
import postRepository from "./post.repository.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
import { getDB } from "../../config/db.js";
// import upload from "../../middlewares/fileupload.middleware.js";
export default class postController {
  constructor() {
    this.postRepository = new postRepository();
  }

  async newPost(req, res) {
    try {
      upload.array("images", 5)(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).send("Something went wrong with file upload!");
        }
        return res.status(200).send("Post created successfully!");
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }

  async getPost(req, res) {
    try {
      const posts = await this.postRepository.getPost();
      if (!posts) {
        return res.status(404).send("posts not found!");
      }
      return res.status(200).send(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }
  async getPostById(req, res) {
    try {
      const id = req.params.postId;
      const post = await this.postRepository.getPostById(new ObjectId(id));
      if (!post) {
        return res.status(404).send("post not found!");
      }
      return res.status(200).send(post);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }

  async deletePost(req, res) {
    const db = getDB();
    try {
      const id = req.params.postId;
      await this.postRepository.deletePost(new ObjectId(id));

      return res.status(200).send("post  delete!");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }

  async updatePost(req, res) {
    const db = getDB();
    try {
      const id = req.params.postId;
      const caption = req.body;
      await this.postRepository.updatePost(new ObjectId(id), caption);

      return res.status(200).send("post  delete!");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }
}
