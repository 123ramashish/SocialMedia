import { MongoClient } from "mongodb";
import { applicationError } from "../error-handling/applicationError.js";
import dotnev from "dotenv";
dotnev.config();
// Connection URL
const url = process.dot.env.MONGODBKEY;

const client = new MongoClient(url);
export const connectToMongoDB = async () => {
  try {
    await client
      .connect()
      .then(() => {
        console.log("Connected successfully to database");
      })
      .catch((err) => {
        console.log("Database not connected!");
      });

    // const db = client.db("SocialMedia");
  } catch (err) {
    console.log(err);
  }
};

export const getDB = () => {
  return client.db();
};

export const getClient = () => {
  if (!client) {
    throw new Error("MongoDB client is not connected");
  }
  return client;
};
