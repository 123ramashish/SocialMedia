import { getDB } from "../../config/db.js";
import userModel from "./user.model.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";
import redis from "redis";
import jwtr from "jwt-redis";
import bcrypt from "bcrypt";
import userRepository from "./user.repository.js";
import { ObjectId } from "mongodb";
let token;
export default class userController {
  constructor() {
    this.userRepository = new userRepository();
  }

  async SignUp(req, res) {
    try {
      const { name, email, password, gender } = req.body;

      const hashedPassword = await passwordHash.generate(password);
      const user = new userModel(name, email, hashedPassword, gender);
      await this.userRepository.SignUp(user);
      return res.status(201).send("user registered!");
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }
  async SignIn(req, res) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res
          .status(400)
          .send("Invalid Credentials[Check email or signup]");
      } else {
        const result = await passwordHash.verify(
          req.body.password,
          user.password
        );
        if (!result) {
          return res.status(400).send("Invalid Credentials");
        } else {
          token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            "ePzGhWu2wY",
            {
              expiresIn: "3h",
            }
          );
          return res.status(200).send(token);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }

  async Logout(req, res) {
    try {
      res.clearCookie("jwtToken");
      return res.status(200).send("Logout successful");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userRepository.getAllUsers();
      if (!users) {
        return res.status(400).send("User does not exist!");
      }
      return res.status(200).send(users);
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await this.userRepository.getUserById(new ObjectId(id));
      if (!user) {
        return res.status(400).send("User does not exist!");
      }
      return res
        .status(200)
        .json({ name: user.name, email: user.email, gender: user.gender });
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }

  //   async addUser(user) {
  //     const db = await getDB();
  //     return await db.collection(this.collectionName).insertOne(user);
  //   }

  async updateUser(req, res) {
    try {
      const { name, email, password, gender } = req.body;
      const userId = req.userId;
      const hashedPassword = await passwordHash.generate(password);
      const result = await this.userRepository.updateUser(
        new ObjectId(userId),
        name,
        email,
        hashedPassword,
        gender
      );
      if (result.modifiedCount === 0) {
        return res.status(400).send("User not update!");
      }
      return res.status(200).send("User data updated!");
    } catch (err) {
      console.log(err);
      return res.status(400).send("something went wrong!");
    }
  }
  //   async deleteUser(userId) {
  //     const db = await getDB();
  //     return await db.collection(this.collectionName).deleteOne({ _id: userId });
  //   }
}
