import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { maleAvatar, femaleAvatar } from "../../public/logos";
import socket from "../../services/socket";

const ChatHeader = ({ onBack, showBackButton, selectedUser, currentUser }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (socket) {
      const handleGetUsers = (activeUsers) => {
        
        if (activeUsers.some(user => user.userId === selectedUser?.id)) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      };

      socket.on('get-users', handleGetUsers);

      socket.on('user-typing', (typingUserId) => {
        if (typingUserId === selectedUser.id) {
          setIsTyping(true);
        }
      });

      socket.on('user-stop-typing', (typingUserId) => {
        if (typingUserId === selectedUser.id) {
          setIsTyping(false);
        }
      });

      return () => {
        socket.off('get-users', handleGetUsers);
        socket.off('user-typing');
        socket.off('user-stop-typing');
      };
    }
  }, [selectedUser]);

  return (
    <div className="flex items-center p-4 border-b border-gray-200 bg-gray-100 w-full fixed top-0">
      <div className="flex gap-x-2">
        {showBackButton && (
          <div onClick={onBack} className="md:hidden flex items-center justify-center cursor-pointer">
            <IoIosArrowBack size='30px' color="#000000" />
          </div>
        )}
        <div className="relative">
          <img
            src={selectedUser.gender === "male" ? maleAvatar : femaleAvatar}
            alt="Avatar"
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>

      <div className="ml-3">
        <div className="flex items-center">
          <h2 className="text-sm font-bold text-gray-800">{selectedUser.name}</h2>
          {isOnline && (
            <div className="ml-2">
              <GoDotFill color="#22c55e" />
            </div>
          )}
        </div>

        <div className="flex items-center text-xs text-gray-500">
          {isTyping ? (
            <span className="mr-1">Typing...</span>
          ) : (
            isOnline && <span className="mr-1">Online</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
