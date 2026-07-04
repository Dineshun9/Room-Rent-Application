// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   message: { type: String, required: true },
//   time: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Message", messageSchema);




const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room", 
    required: true 
  },

  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // ✅ NEW (for private chat)
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  // ✅ NEW (unique conversation between user & owner)
  conversationId: { 
    type: String,
    index: true
  },

  message: { 
    type: String, 
    required: true 
  },

  time: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("Message", messageSchema);