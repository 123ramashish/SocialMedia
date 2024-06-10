import { getDB } from "../../config/db.js";
import { applicationError } from "../../error-handling/applicationError.js";
export default class otpRepository {
  constructor() {
    this.collectionName = "users";
  }

  async resetPassword(userId, hashedPassword) {
    const db = getDB();
    try {
      const result = await db
        .collection(this.collectionName)
        .updateOne({ _id: userId }, { $set: { password: hashedPassword } });
      return result;
    } catch (err) {
      console.log(err);
      throw new applicationError("Something went wrong!", 500);
    }
  }
}
