import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import ChatFilterButtons from "./ChatFilterButtons";
import ChatHeader from "./ChatHeader";
import ChatListItem from "./ChatListItem";
import ChatBody from "./ChatBody";
import apiService from "../../services/api";
import { useSelector } from "react-redux";
import status from "http-status";
import { Spinner } from "@heroui/react";
import { RiChatNewFill } from "react-icons/ri";

const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatList, setChatList] = useState([]);
  const [filteredChats, setFilteredChats] = useState(chatList);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isNewChatMode, setIsNewChatMode] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.authStatus);
  const socket = useRef();

  const getUserChats = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.userChats(currentUser.id);
      if (response.status === status.OK) {
        setChatList(response.chats);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch chats:", response.error);
      }
    } catch (error) {
      console.error("Error fetching user chats:", error);
    }
  };

  useEffect(() => {
    if (authStatus) {
      setIsLoading(true);
      getUserChats();
      setIsLoading(false);
    }
  }, [authStatus, currentUser]);

  useEffect(() => {
    if (isNewChatMode) {
      const filtered = allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      const applyFilters = () => {
        let filtered = [...chatList];

        switch (activeFilter) {
          case "Unread":
            filtered = filtered.filter((chat) => chat.unreadCount > 0);
            break;
          case "Archived":
            filtered = filtered.filter((chat) => chat.isArchived);
            break;
          case "Blocked":
            filtered = filtered.filter((chat) => chat.isBlocked);
            break;
          default:
            break;
        }

        if (searchTerm.trim()) {
          filtered = filtered.filter((chat) =>
            chat.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setFilteredChats(filtered);
      };
      applyFilters();
    }
  }, [searchTerm, activeFilter, chatList, allUsers, isNewChatMode]);

  const handleBackToList = () => {
    setSelectedChat(null);
    setIsNewChatMode(false);
    setFilteredUsers(allUsers); // Reset filtered users to all users
    setSearchTerm(""); // Clear search term
  };

  const findNewChat = async () => {
    //this funtion will find all the chats in the database and allow user to start a new chat and if chat already found then continue the chat
    try {
      const response = await apiService.getAllUsers();
      if (response.status === status.OK) {
        const users = response.data.filter(
          (user) => user.id !== currentUser.id
        ); //removing self
        setAllUsers(users);
        setFilteredUsers(users);
        setSearchTerm("");
        setIsNewChatMode(true);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };
  

  return (
    <>
      <div className="flex min-h-screen w-full bg-white">
        <div
          className={`w-full md:w-2/6 border-r border-gray-200 flex flex-col ${
            selectedChat ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="sticky top-0 bg-white z-10">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            {!isNewChatMode && (
              <ChatFilterButtons
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            )}
          </div>
          <div className="overflow-y-auto flex-grow relative">
            {isNewChatMode && (
              <div className="p-2">
                <button
                  className="text-sm text-orange-600 hover:underline"
                  onClick={() => handleBackToList()}
                >
                  ← Back to Chats
                </button>
              </div>
            )}
            {isNewChatMode ? (
              filteredUsers.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
                  No users found.
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <ChatListItem
                    key={user.id}
                    chat={user}
                    onSelect={() => {
                      setSelectedChat(user);
                      setIsNewChatMode(false); // Exit new chat mode
                    }}
                    isNewChatMode={isNewChatMode}
                  />
                ))
              )
            ) : isLoading ? (
              <div className="flex items-center justify-center h-40">
                <Spinner color="primary" />
              </div>
            ) : chatList.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
                Your chat list is empty. Start a new conversation!
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
                No chats found.
              </div>
            ) : (
              filteredChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  onSelect={() => setSelectedChat(chat)}
                />
              ))
            )}
            {!isNewChatMode && (
              <div className="absolute bottom-10 right-10 z-50">
                <button
                  className="p-3 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 focus:outline-none"
                  onClick={findNewChat}
                >
                  <RiChatNewFill className="text-3xl" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex-grow flex flex-col bg-white ${
            selectedChat ? "block" : "hidden md:flex"
          }`}
        >
          {selectedChat && (
            <ChatHeader
              onBack={handleBackToList}
              showBackButton={selectedChat !== null}
              user={selectedChat}
              socket={socket.current}
              currentUser={currentUser}
            />
          )}

          <div className="flex-grow overflow-hidden mt-16">
            {selectedChat ? (
              <ChatBody
                selectedUser={selectedChat}
                currentUser={currentUser}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
