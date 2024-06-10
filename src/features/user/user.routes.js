import express from "express";
import { validUser } from "../../middlewares/user.middleware.js";
import userController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
const userRouter = express.Router();
const usercontroller = new userController();
// for user authentications
userRouter.post("/signup", validUser, (req, res) => {
  usercontroller.SignUp(req, res);
});
userRouter.post("/signin", (req, res) => {
  usercontroller.SignIn(req, res);
});

// userRouter.get("/logout", (req, res) => {
  // usercontroller.Logout(req, res);
// });
// router method for logout
// userRouter.get("/logout-all-devices");

// for user
userRouter.get("/get-details/:userId", jwtAuth, (req, res) => {
  usercontroller.getUserById(req, res);
});

userRouter.get("/get-all-details", jwtAuth, (req, res) => {
  usercontroller.getAllUsers(req, res);
});
userRouter.patch("/update-details/:userId", jwtAuth, (req, res) => {
  usercontroller.updateUser(req, res);
});

export default userRouter;
