import React from "react";
import { maleAvatar, femaleAvatar } from "../../public/logos";
import { timeAgo } from "../utils/dateFormatter";

const ChatListItem = ({ chat, onSelect, isNewChatMode }) => {
  return (
    <div
      className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 overflow-hidden"
      onClick={onSelect}
    >
      <img
        src={chat.gender === "male" ? maleAvatar : femaleAvatar}
        alt={chat.name}
        className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
      />
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold truncate mr-2">{chat.name}</h3>
          <div className="flex items-center space-x-2">
            {chat.unreadCount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {chat.unreadCount}
              </span>
            )}
            <span
              className={`text-xs ${
                chat.unreadCount > 0 ? "text-orange-500" : "text-gray-500 "
              } flex-shrink-0`}
            >
              {chat.updatedAt && timeAgo(new Date(chat.updatedAt))}
            </span>
          </div>
        </div>
        {isNewChatMode ? (
          <p className="text-sm text-gray-500 pr-20 truncate">
            {chat.username}
          </p>
        ) : (
          <p className="text-sm text-gray-500 pr-20 truncate">
            {chat.lastMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
