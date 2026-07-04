import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Fetch users who chatted
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get(`/messages/users/${roomId}`);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [roomId]);

  return (
    <div className="flex h-screen bg-black text-white">
      
      {/* LEFT: User List */}
      <div className="w-1/3 border-r border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">💬 Chats</h2>

        {users.length === 0 && (
          <p className="text-gray-400">No chats yet</p>
        )}

        {users.map((user) => (
          <div
            key={user.userId}
            onClick={() => setSelectedUser(user)}
            className={`p-3 mb-2 rounded cursor-pointer ${
              selectedUser?.userId === user.userId
                ? "bg-green-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
          </div>
        ))}
      </div>

      {/* RIGHT: ChatBox */}
      <div className="w-2/3 p-4">
        {selectedUser ? (
          <ChatBox
            key={selectedUser.userId} 
            roomId={roomId}
            ownerId={selectedUser.userId} // ✅ now correct receiver
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a user to start chat
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;