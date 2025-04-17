import React, { useState, useEffect, useRef } from "react";
import apiService from "../../services/api";
import { LuSendHorizontal } from "react-icons/lu";
import useConversation from "../hooks/useConversation";
import status from "http-status";

const ChatBody = ({ selectedUser, currentUser}) => {
  const {messages, loadMore, hasMore, loading} = useConversation(selectedUser?.userId);
  const [allMessages, setAllMessages] = useState([]);
  const [isChatAlreadyExists, setIsChatAlreadyExists] = useState(false);
  
  const chatContainerRef = useRef(null);

  //scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    if(top === 0 && hasMore && !loading) {
      loadMore();
    }
  }

  const renderMessage = (msg) => (
    <div
      key={msg.id}
      className={`mb-2 max-w-xs p-2 rounded-full text-sm ${
        msg.senderId === currentUser?.id ? "bg-orange-500 ml-auto" : "bg-gray-200"
      }`}
    >
      {msg.message}
    </div>
  );
  
  // useEffect(() => {
  //   loadChat();
  // }, [currentUser, selectedUser]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("receive-message", (newMessage) => {
  //       setMessages((prevMessages) => [...prevMessages, newMessage]);
  //       scrollToBottom();
  //     });
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off("receive-message");
  //     }
  //   };
  // }, [socket]);

  // const loadChat = async () => {
  //   try {
  //     const chat = await apiService.findChat(currentUser.uid, selectedUser.id);
  //     if (chat.length > 0) {
  //       setChatId(chat[0].id);
  //       loadMessages(chat[0].id);
  //     } else {
  //       setChatId(null);
  //       setMessages([]);
  //     }
  //   } catch (error) {
  //     console.error("Error loading chat:", error);
  //   }
  // };

  const createChat = async () => {
    try {
      const response = await apiService.createChat(currentUser.id, selectedUser.id);
      if(response.status === status.CREATED){
        setChatId(response.data.id);
      }
      if(response.status === status.CONFLICT){
        setIsChatAlreadyExists(true);
        setChatId(response.data.id);
      }
      
      return response.data.id;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const sendMessage = async (content) => {
    try {
      let currentChatId = chatId;
      if (!currentChatId) {
        currentChatId = await createChat();
      }
      const newMessage = await apiService.addMessage(currentChatId, currentUser.uid, content);
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Send the message through socket
      // socket.emit("send-message", {
      //   receiverId: selectedUser.id,
      //   message: newMessage,
      // });

      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // const renderMessage = (message) => {
  //   const isCurrentUser = message.senderId === currentUser.id;
  //   return (
  //     <div
  //       key={message.id}
  //       className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
  //     >
  //       <div
  //         className={`max-w-[70%] rounded-lg p-3 ${
  //           isCurrentUser ? "bg-orange-500 text-white" : "bg-gray-200"
  //         }`}
  //       >
  //         <p>{message.content}</p>
  //         <span className={`text-xs mt-1 ${isCurrentUser ? "text-gray-200" : "text-gray-500"}`}>
  //           {timeAgo(message.updatedAt)}
  //         </span>
  //       </div>
  //     </div>
  //   );
  // };
  const handleTyping = (e) => {
    if (e.target.value.length > 0) {
      socket.emit('user-typing', { userId: currentUser.uid, receiverId: selectedUser.id });
    } else {
      socket.emit('user-stop-typing', { userId: currentUser.uid, receiverId: selectedUser.id });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-grow overflow-y-auto p-4 flex flex-col-reverse"
      >
        <div>
          {messages.length === 0 && !loading ? (
            <p className="text-gray-400 text-sm text-center">No messages yet.</p>
          ) : (
            <>
              {loading && hasMore && (
                <p className="text-xs text-gray-400 text-center mb-2">Loading more...</p>
              )}
              {messages.map(renderMessage)}
            </>
          )}
        </div>
      </div>

      <div className="flex bg-white px-5 py-3 w-full items-center justify-center border-t border-gray-100">
        <div className="flex items-center bg-gray-100 p-2 rounded-md w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const content = e.target.message.value;
              if (content.trim()) {
                sendMessage(content);
                e.target.reset();
              }
            }}
            className="flex items-center w-full"
          >
            <input
              name="message"
              type="text"
              placeholder="Type your message here"
              className="flex-grow bg-transparent focus:outline-none text-sm text-gray-600"
              onChange={handleTyping}
              disabled={!selectedUser}
            />
            <button
              type="submit"
              disabled={!selectedUser}
              className="ml-4 bg-orange-300/50 p-2 rounded-md text-white hover:bg-orange-300/70 focus:outline-none"
            >
              <LuSendHorizontal color="#f97316" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;