import { getDB } from "../../config/db.js";

export default class friendRepository {
  constructor() {
  }

  async getFriends(userId) {
    const db = getDB();
    try {
      const friendships = await db
        .collection("friendships")
        .find({ $or: [{ user1: userId }, { user2: userId }] })
        .toArray();

      const friendIds = friendships.map((friendship) => {
        return friendship.user1 === userId
          ? friendship.user2
          : friendship.user1;
      });

      const friends = await db
        .collection("users")
        .find({ _id: { $in: friendIds } })
        .toArray();

      return friends;
    } catch (err) {
      console.error(err);
      throw new Error("Something went wrong!");
    }
  }

  async toggleFriendship(userId, friendId) {
    const db = getDB();
    try {
      const existingFriendship = await db.collection("friendships").findOne({
        $or: [
          { user1: userId, user2: friendId },
          { user1: friendId, user2: userId },
        ],
      });

      if (existingFriendship) {
        await db
          .collection("friendships")
          .deleteOne({ _id: existingFriendship._id });
      } else {
        await db
          .collection("friendships")
          .insertOne({ user1: userId, user2: friendId });
      }
    } catch (err) {
      console.error(err);
      throw new Error("Something went wrong!");
    }
  }

  async getPendingRequests(userId) {
    const db = getDB();
    try {
     
      const pendingRequests = await db
        .collection("friendRequests")
        .find({ receiverId: userId, status: "pending" })
        .toArray();
      return pendingRequests;
    } catch (err) {
      console.error(err);
      throw new Error("Something went wrong!");
    }
  }

}
