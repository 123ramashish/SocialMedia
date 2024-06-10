import express from "express";
import otpController from "./otp.controller.js";
const otpcontroller = new otpController();
const otpRouter = express.Router();

otpRouter.post("/send", (req, res) => {
  otpcontroller.generateotp(req, res);
});
otpRouter.get("/verify", (req, res) => {
  otpcontroller.verifyotp(req, res);
}); // router method for verify
otpRouter.post("/reset-password", (req, res) => {
  otpcontroller.resetPassword(req, res);
}); // router method for reset password

export default otpRouter;
