const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");
const {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getRoomsByOwner,
  getMessage
} = require('../controllers/roomController');



// Protected routes (owner only)
router.get("/my-rooms",authMiddleware,  getRoomsByOwner); 
router.post('/',upload.array("images", 5),authMiddleware, addRoom);
router.put('/:id', authMiddleware, updateRoom);
router.delete('/:id', authMiddleware, deleteRoom);

// Public route

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.get('/:roomId/messages',getMessage); 





module.exports = router;
