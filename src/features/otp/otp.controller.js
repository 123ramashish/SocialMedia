import speakeasy from "speakeasy";
import { applicationError } from "../../error-handling/applicationError.js";
import otpRepository from "./otp.repository.js";
import passwordHash from "password-hash";
import pkg from "mongodb";
const { ObjectID } = pkg;
// import { ObjectID } from "mongodb";
let secret;
let code;
export default class otpController {
  constructor() {
    this.otpRepository = new otpRepository();
  }

  async generateotp(req, res) {
    try {
      secret = await speakeasy.generateSecret({ length: 20 });

      code = await speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
        counter: 123, // Assuming you're using a counter-based approach
        time: 60000, // 60 seconds
      });

      return res.status(200).send(code);
    } catch (err) {
      console.log("err:", err);
      throw new applicationError("Something went wrong!", 500);
    }
  }

  async verifyotp(req, res) {
    try {
      const tokenValidates = await speakeasy.totp.verify({
        secret: secret.base32,
        encoding: "base32",
        token: code,
        counter: 123,
        window: 11,
      });

      if (!tokenValidates) {
        return res.status(400).send("OTP verification failed!");
      }

      return res.status(200).send("OTP verified successfully");
    } catch (err) {
      console.log(err);
      //   throw new Error("Something went wrong!");
    }
  }

  async resetPassword(req, res) {
    try {
      const { userId, password } = req.body; // Assuming userId and password are sent in request body

      const hashedPassword = passwordHash.generate(password);
      const result = await this.otpRepository.resetPassword(
        new ObjectID(userId),
        hashedPassword
      );

      if (result.modifiedCount === 0) {
        return res.status(404).send("User not found!");
      }

      return res.status(200).send("Password reset successfully");
    } catch (err) {
      console.log("err:", err);
      throw new applicationError("Something went wrong!", 500);
    }
  }
}
