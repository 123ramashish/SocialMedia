import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "./swagger.js";
import userRouter from "./src/features/user/user.routes.js";
// import authRouter from './src/features/authentication/authentication.routes.js';
import likeRouter from "./src/features/like/like.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import friendRouter from "./src/features/friend/friend.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import { connectToMongoDB } from "./src/config/db.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware for routers
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc, { explorer: true })
);
app.use("/api/users", userRouter);
app.use("/api/posts", jwtAuth, postRouter);
app.use("/api/comments", jwtAuth, commentRouter);
app.use("/api/likes", jwtAuth, likeRouter);
app.use("/api/friends", jwtAuth, friendRouter);
app.use("/api/otp", otpRouter);

app.get("/", (req, res) => {
  res.send("welcome!");
});

// applications error handling
app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof applocationError) {
    res.status(err.code).send(err.message);
  }
  //server error
  res.status(503).send("something went wrong!");
  next();
});

// router error handling
app.use((req, res) => {
  res.status(404).send("api not found");
});

app.listen(5000, () => {
  connectToMongoDB();
  console.log("App is listenign on port 5000");
});
