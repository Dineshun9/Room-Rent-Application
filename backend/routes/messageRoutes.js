const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ Get unique users who chatted for a room
const mongoose = require("mongoose");









router.get("/users/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const users = await Message.aggregate([
      {
        $match: {
          roomId: new mongoose.Types.ObjectId(roomId),
        },
      },
      {
        $group: {
          _id: "$senderId",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
        },
      },
    ]);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ time: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;