// import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";
// import { motion } from "framer-motion";
// import { FaPaperPlane } from "react-icons/fa";

// const ChatBox = ({ roomId, ownerId }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const currentUserId = user && user._id ? String(user._id) : null;

//   if (!currentUserId) return null;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // fetch messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/rooms/${roomId}/messages`
//         );
//         const data = await res.json();

//         setMessages(
//           data.map((msg) => ({
//             senderId: String(msg.senderId),
//             message: msg.message,
//             time: new Date(msg.time).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           }))
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMessages();
//   }, [roomId]);

//   // socket
//   useEffect(() => {
//     socketRef.current = io("http://localhost:3000");

//     socketRef.current.emit("joinRoom", roomId);

//     socketRef.current.on("receiveMessage", (msg) => {
//       const senderId = String(msg.senderId);

//       if (senderId === currentUserId) return;

//       setMessages((prev) => [
//         ...prev,
//         {
//           senderId,
//           message: msg.message,
//           time: new Date(msg.time).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     });

//     return () => socketRef.current.disconnect();
//   }, [roomId, currentUserId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     socketRef.current.emit("sendMessage", {
//       roomId,
//       senderId: currentUserId, // ✅ always ObjectId string
//       receiverId: ownerId,
//       message,
//     });

//     setMessages((prev) => [
//       ...prev,
//       {
//         senderId: currentUserId,
//         message,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);

//     setMessage("");
//   };

//   return (
//     <div className="flex flex-col h-[70vh] bg-[#0B141A] rounded-xl overflow-hidden shadow-lg border border-gray-700">
//       <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center mt-10">
//             No messages yet. Start chatting 💬
//           </p>
//         )}

//         {messages.map((msg, index) => {
//           const isUser = msg.senderId === currentUserId;

//           return (
//             <motion.div
//               key={index}
//               className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div
//                 className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-2xl shadow-md text-sm break-words ${
//                   isUser
//                     ? "bg-green-500 text-black rounded-br-none"
//                     : "bg-gray-700 text-white rounded-bl-none"
//                 }`}
//               >
//                 <p>{msg.message}</p>
//                 <p className="text-[10px] text-gray-200 mt-1 text-right">
//                   {msg.time}
//                 </p>
//               </div>
//             </motion.div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex items-center gap-3 p-3 bg-[#202C33] border-t border-gray-700">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 bg-[#2A3942] text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <motion.button
//           onClick={sendMessage}
//           whileTap={{ scale: 0.9 }}
//           className="bg-green-500 hover:bg-green-400 text-black p-3 rounded-full transition"
//         >
//           <FaPaperPlane />
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;





// import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";
// import { motion } from "framer-motion";
// import { FaPaperPlane } from "react-icons/fa";

// const ChatBox = ({ roomId, ownerId }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null); // Persist socket across renders


//   const getConversationId = (roomId, userId, ownerId) => {
//   return [roomId, userId, ownerId].sort().join("_");
// };

//   // Get current user ID from localStorage or fallback
//   // const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
//     const currentUserId=localStorage.getItem("userId");

//   // Scroll to bottom whenever messages change
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     // ✅ Initialize socket only once
//     socketRef.current = io("http://localhost:3000");

//     // ✅ Join the chat room
//     socketRef.current.emit("joinRoom", {
//   roomId,
//   userId: currentUserId,
//   ownerId
//   });

//     // ✅ Listen for incoming messages
//     socketRef.current.on("receiveMessage", (msg) => {
//       // Ignore messages sent by self to prevent duplicates
//       if (msg.senderId !== currentUserId) {
//         const formattedTime = new Date(msg.time).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         setMessages((prev) => [...prev, { ...msg, time: formattedTime }]);
//       }
//     });

//     return () => {
//       // Disconnect socket on unmount
//       socketRef.current.disconnect();
//     };
//   }, [roomId, currentUserId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//  const sendMessage = () => {
//   if (!currentUserId) {
//     console.error("User not authenticated. senderId missing.");
//     return;
//   }

//   if (message.trim() === "") return;

//   const formattedTime = new Date().toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const msgData = {
//     roomId,
//     senderId: currentUserId,
//     receiverId: ownerId, // ✅ IMPORTANT
//     message,
//   };

//   socketRef.current.emit("sendMessage", msgData);

//   // Local UI update (unchanged)
//   setMessages((prev) => [
//     ...prev,
//     { ...msgData, time: formattedTime }
//   ]);

//   setMessage("");
// };


//   return (
//     <div className="flex flex-col h-[70vh] bg-[#0B141A] rounded-xl overflow-hidden shadow-lg border border-gray-700">
//       {/* Messages container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//         {messages.length === 0 && (
//           <p className="text-gray-500 text-center mt-10">
//             No messages yet. Start chatting 💬
//           </p>
//         )}

//         {messages.map((msg, index) => {
//           const isUser = msg.senderId === currentUserId;

//           return (
//             <motion.div
//               key={index}
//               className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div
//                 className={`max-w-xs sm:max-w-sm px-4 py-2 rounded-2xl shadow-md text-sm break-words ${
//                   isUser
//                     ? "bg-green-500 text-black rounded-br-none"
//                     : "bg-gray-700 text-white rounded-bl-none"
//                 }`}
//               >
//                 <p>{msg.message}</p>
//                 <p className="text-[10px] text-gray-200 mt-1 text-right">
//                   {msg.time}
//                 </p>
//               </div>
//             </motion.div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input box */}
//       <div className="flex items-center gap-3 p-3 bg-[#202C33] border-t border-gray-700">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 bg-[#2A3942] text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <motion.button
//           onClick={sendMessage}
//           whileTap={{ scale: 0.9 }}
//           className="bg-green-500 hover:bg-green-400 text-black p-3 rounded-full transition"
//         >
//           <FaPaperPlane />
//         </motion.button>
//       </div>
//     </div>
//   );
// };

//  export default ChatBox;















import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const ChatBox = ({ roomId, ownerId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const currentUserId = localStorage.getItem("userId");

  // ✅ Generate unique conversationId
  const getConversationId = (roomId, userId, ownerId) => {
    return [roomId, userId, ownerId].sort().join("_");
  };

  // ✅ Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ MAIN EFFECT (handles everything)
  useEffect(() => {
    if (!roomId || !ownerId || !currentUserId) return;

    const conversationId = getConversationId(
      roomId,
      currentUserId,
      ownerId
    );

    // ✅ RESET messages when switching user
    setMessages([]);

    // ✅ FETCH OLD MESSAGES
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/messages/${conversationId}`
        );
        const data = await res.json();

        const formatted = data.map((msg) => ({
          ...msg,
          time: new Date(msg.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formatted);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };

    fetchMessages();

    // ✅ SOCKET SETUP
    socketRef.current = io("http://localhost:3000");

    socketRef.current.emit("joinRoom", {
      roomId,
      userId: currentUserId,
      ownerId,
    });

    socketRef.current.on("receiveMessage", (msg) => {
      const formattedTime = new Date(msg.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => [
        ...prev,
        { ...msg, time: formattedTime },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, ownerId, currentUserId]); // 🔥 IMPORTANT

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (!currentUserId) {
      console.error("User not authenticated.");
      return;
    }

    if (message.trim() === "") return;

    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msgData = {
      roomId,
      senderId: currentUserId,
      receiverId: ownerId,
      message,
    };

    socketRef.current.emit("sendMessage", msgData);

    // ✅ instant UI update
    setMessages((prev) => [
      ...prev,
      { ...msgData, time: formattedTime },
    ]);

    setMessage("");
  };

  return (
    <div className="flex flex-col h-[70vh] bg-[#0B141A] rounded-xl overflow-hidden shadow-lg border border-gray-700">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No messages yet. Start chatting 💬
          </p>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.senderId === currentUserId;

          return (
            <motion.div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                  isUser
                    ? "bg-green-500 text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-[10px] mt-1 text-right">
                  {msg.time}
                </p>
              </div>
            </motion.div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 p-3 bg-[#202C33]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-[#2A3942] text-white px-4 py-2 rounded-full"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 text-black p-3 rounded-full"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;