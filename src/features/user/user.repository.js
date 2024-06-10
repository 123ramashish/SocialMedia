import { getDB } from "../../config/db.js";
import { applicationError } from "../../error-handling/applicationError.js";
import userModel from "./user.model.js";

export default class userRepository {
  constructor() {
    this.collectionName = "users";
  }

  async SignUp(newUser) {
    const db = await getDB();
    try {
      // Insert the new user
      const result = await db
        .collection(this.collectionName)
        .insertOne({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          gender: newUser.gender,
        })
        .then(() => {
          console.log("User registered!");
        })
        .catch((err) => {
          throw new Error("User registration failed");
        });
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong during signup!", 500);
    }
  }

  async findByEmail(email) {
    const db = await getDB();
    try {
      return await db.collection(this.collectionName).findOne({ email });
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }

  async getUserById(id) {
    try {
      const db = await getDB();
      return await db.collection(this.collectionName).findById(id);
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }
  async getAllUsers() {
    try {
      const db = await getDB();
      return await db.collection(this.collectionName).find().toArray();
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
  }

  async updateUser(userId, name, email, hashedPassword, gender) {
    const db = await getDB();
    try {
      return await db.collection(this.collectionName).updateOne(
        { _id: userId },
        {
          $set: {
            name: {
              $cond: {
                if: { $ne: [name, null, undefined] },
                then: name,
                else: "$name",
              },
            },
            email: {
              $cond: {
                if: { $ne: [email, null, undefined] },
                then: email,
                else: "$email",
              },
            },
            password: {
              $cond: {
                if: { $ne: [password, null, undefined] },
                then: hashedPassword,
                else: "$password",
              },
            },
            gender: {
              $cond: {
                if: { $ne: [gender, null, undefined] },
                then: gender,
                else: "$gender",
              },
            },
          },
        },
        { upsert: true }
      );
      
    } catch (err) {
      console.error(err);

      throw new applicationError("Something went wrong!", 500);
    }
}
}