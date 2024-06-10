import express from "express";
import friendController from './friend.controller.js'

const friendRouter = express.Router();
const friendcontroller = new friendController();

// GET route to retrieve friends for a user
friendRouter.get("/get-friends/:userId", (req, res) => {
  friendcontroller.getFriends(req, res);
});

// GET route to retrieve pending friend requests for a user
friendRouter.get("/get-pending-requests", (req, res) => {
  friendcontroller.getPendingRequests(req, res);
});

// POST route to toggle friendship with another user
friendRouter.post("/toggle-friendship/:friendId", (req, res) => {
  friendcontroller.toggleFriendship(req, res);
});

// GET route to respond to a friend request
friendRouter.get("/response-to-request/:friendId", (req, res) => {
  friendcontroller.respondToRequest(req, res);
});

export default friendRouter;
