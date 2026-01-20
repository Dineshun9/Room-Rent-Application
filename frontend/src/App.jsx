import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import RoomDetails from './pages/RoomDetails';
import Welcome from './pages/Welcome';
import MyRooms from './pages/MyRooms';
import AddRoom from './pages/AddRoom';
import EditRoom from './pages/EditRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path="/Edit-Room/:id" element={<EditRoom />} />
      <Route path="/my-rooms" element={<MyRooms />} />
      <Route path="/add-room" element={<AddRoom />} />
    </Routes>
  );
}

export default App;
