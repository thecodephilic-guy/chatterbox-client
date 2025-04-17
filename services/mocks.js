export const mockCurrentUser = {
  id: "0",
  name: "Current User",
  gender: "male",
}

export const mockChatList = [
  {
    id: "1",
    name: "John Doe",
    gender: "male",
    lastMessage: "Hey, how's it going?",
    updatedAt: "2024-10-01T12:00:00Z",
    unreadCount: 2,
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Let's catch up soon!",
    updatedAt: "2025-04-08T14:30:00Z",
    unreadCount: 0,
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Alice Johnson",
    lastMessage: "Did you finish the report?",
    updatedAt: "2025-04-07T09:15:00Z",
    unreadCount: 1,
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Bob Brown",
    gender: "male",
    lastMessage: "Meeting at 3 PM tomorrow.",
    updatedAt: "2025-04-02T11:45:00Z",
    unreadCount: 0,
    avatarUrl: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Charlie Green",
    gender: "male",
    lastMessage: "Can you send me the files?",
    updatedAt: "2025-04-08T00:20:00Z",
    unreadCount: 3,
    avatarUrl: "https://via.placeholder.com/150",
  },
];

export const mockConversation = [
  // John Doe (id: "1")
  { id: "1", senderId: "1", receiverId: "0", message: "Hey, how's it going?", timestamp: "2024-10-01T12:00:00Z" },
  { id: "2", senderId: "0", receiverId: "1", message: "Doing well, John! You?", timestamp: "2024-10-01T12:02:00Z" },
  { id: "3", senderId: "1", receiverId: "0", message: "Just chilling.", timestamp: "2024-10-01T12:05:00Z" },

  // Jane Smith (id: "2")
  { id: "4", senderId: "2", receiverId: "0", message: "Let's catch up soon!", timestamp: "2025-04-08T14:30:00Z" },
  { id: "5", senderId: "0", receiverId: "2", message: "Absolutely! When are you free?", timestamp: "2025-04-08T14:32:00Z" },

  // Alice Johnson (id: "3")
  { id: "6", senderId: "3", receiverId: "0", message: "Did you finish the report?", timestamp: "2025-04-07T09:15:00Z" },
  { id: "7", senderId: "0", receiverId: "3", message: "Yes, just sent it over email.", timestamp: "2025-04-07T09:18:00Z" },

  // Bob Brown (id: "4")
  { id: "8", senderId: "4", receiverId: "0", message: "Meeting at 3 PM tomorrow.", timestamp: "2025-04-02T11:45:00Z" },
  { id: "9", senderId: "0", receiverId: "4", message: "Got it. Will be there.", timestamp: "2025-04-02T11:46:00Z" },

  // Charlie Green (id: "5")
  { id: "10", senderId: "5", receiverId: "0", message: "Can you send me the files?", timestamp: "2025-04-08T00:20:00Z" },
  { id: "11", senderId: "0", receiverId: "5", message: "Sure, sending now.", timestamp: "2025-04-08T00:21:00Z" },
  { id: "12", senderId: "5", receiverId: "0", message: "Thanks!", timestamp: "2025-04-08T00:22:00Z" },
];