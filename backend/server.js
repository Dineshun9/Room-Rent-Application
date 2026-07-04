// let express = require('express');
// let { connectDB } = require('./config');
// let cors = require('cors');
// let http = require('http');
// let { Server } = require('socket.io');
// let path = require('path');
// require('dotenv').config();

// const userRoutes = require('./routes/userRoutes'); 
// const roomRoutes =require("./routes/roomRoutes.js") ;

// let app = express();
// let port = process.env.PORT;
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// // MongoDB connection
// connectDB(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log("DB Error:", err));

// // Routes

// app.use('/api/users', userRoutes);

// app.use("/api/rooms", roomRoutes);



// // Create server for socket.io
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET","POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   socket.on('joinRoom', (roomId) => {
//     socket.join(roomId);
//     console.log(`Socket ${socket.id} joined room ${roomId}`);
//   });

//   socket.on('sendMessage', ({ roomId, senderId, message }) => {
//     io.to(roomId).emit('receiveMessage', {
//       senderId,
//       message,
//       time: new Date()
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });






















const express = require('express');
const { connectDB } = require('./config');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();
const Message = require("./models/Message");
const messageRoutes = require("./routes/messageRoutes");

const userRoutes = require('./routes/userRoutes'); 
const roomRoutes = require('./routes/roomRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// MongoDB connection
connectDB(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// Routes
app.use('/api/users', userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

// Create server for socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET","POST"]
  }
});

const getConversationId = (roomId, userId, ownerId) => {
  return [roomId, userId, ownerId].sort().join("_");
};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

 socket.on("joinRoom", ({ roomId, userId, ownerId }) => {
  const conversationId = getConversationId(roomId, userId, ownerId);

  socket.join(conversationId);
  console.log(`Socket ${socket.id} joined ${conversationId}`);
 });

  socket.on("sendMessage", async ({ roomId, senderId, receiverId, message }) => {
  try {
    const conversationId = getConversationId(roomId, senderId, receiverId);

    const savedMessage = await Message.create({
      roomId,
      senderId,
      receiverId,
      message,
      conversationId
    });

    io.to(conversationId).emit("receiveMessage", {
      senderId: savedMessage.senderId,
      message: savedMessage.message,
      time: savedMessage.time,
    });

  } catch (err) {
    console.error("Message save error:", err);
  }
 });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ✅ Use server, not app
server.listen(PORT, () => {
  console.log(`Server running on:${PORT}`);
});
