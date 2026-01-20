const Room = require('../models/roomModel');
const Message = require("../models/Message");

// =============================
// Add Room (Owner Only)
// =============================
exports.addRoom = async (req, res) => {
  try {
    const { title, description, location, rent } = req.body;
    

    if (!title || !description || !location || !rent) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

      // 🔹 NEW: get image URLs from Cloudinary upload
      console.log("Files received:", req.files);
      
    const imageArray = req.files
      ? req.files.map(file => file.path)
      : [];
    console.log("Uploaded Images:", imageArray);
    const newRoom = await Room.create({
      owner: req.user._id,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      rent: Number(rent),
      images: imageArray
    });

    res.status(201).json({
      message: 'Room added successfully',
      room: newRoom
    });

  } catch (error) {
    console.error("Add Room Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// =============================
// Get All Rooms
// =============================
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('owner', 'name email role');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// =============================
// Get Room by ID
// =============================
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('owner', 'name email role');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =============================
// Get Room by owner
// =============================
exports.getRoomsByOwner = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found in token" });
    }

    const ownerId = req.user._id;
    const rooms = await Room.find({ owner: ownerId })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("❌ Error in getRoomsByOwner:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// =============================
// Update Room (Owner Only)
// =============================
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    if (room.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You are not the owner' });
    }

    const { title, description, location, rent, images, available } = req.body;

    room.title = title || room.title;
    room.description = description || room.description;
    room.location = location || room.location;
    room.rent = rent || room.rent;
    room.images = images || room.images;
    if (available !== undefined) room.available = available;

    await room.save();
    res.json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// =============================
// Delete Room (Owner Only)
// =============================
exports.deleteRoom = async (req, res) => {
  try { 
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    if (room.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You are not the owner' });
    }
    await Room.findByIdAndDelete(req.params.id);
     res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.getMessage=async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Message.find({ roomId }).sort({ time: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};