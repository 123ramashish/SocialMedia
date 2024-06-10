import friendRepository from "./friend.repository.js";

export default class friendController {
  constructor() {
    this.friendRepository = new friendRepository();
  }

  async getFriends(req, res) {
    try {
      const userId = req.params.userId;
      const friends = await this.friendRepository.getFriends(userId);
      res.status(200).json(friends);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async getPendingRequests(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is available in req.user
      const pendingRequests = await this.friendRepository.getPendingRequests(
        userId
      );
      res.status(200).json(pendingRequests);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async toggleFriendship(req, res) {
    try {
      const userId = req.user.id; 
      const friendId = req.params.friendId;

      await this.friendRepository.toggleFriendship(userId, friendId);

      res.status(200).send("Friendship status toggled successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async respondToRequest(req, res) {
    try {
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
}
