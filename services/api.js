import axios from "axios";
import { mockConversation } from "./mocks.js";

const baseURL = "http://localhost:8080";

class Api {
  constructor() {
    this.baseURL = baseURL;
  }

  async fetchConversation(userId, page =  1, pageSize = 10) {
    try {
      //simulate API call with pagination
      const allMessages = mockConversation.filter(
        msg => (msg.senderId === userId || msg.receiverId === userId)
      );
    
      const start = (page - 1) * pageSize;
      const paginated = allMessages.slice(start, start + pageSize);

      //simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        data : paginated,
        hasMore: start + pageSize < allMessages.length,
      };
    }
    catch (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }
  }

  //User APIs:

  async getAllUsers() {
    try {
      const response = await axios.get(`${baseURL}/users/all-users`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async searchUser(username) {
    try {
      const response = await axios.get(`${baseURL}users/${username}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(`${baseURL}users/by/${id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  //Chat APIs:
  async userChats(loggedInUserId) {
    try{
      const response = await axios.get(`${baseURL}/chats/user-chats/${loggedInUserId}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } 
    catch (error) {
      return error.response.data;
    }
  }

  async createChat(id1, id2) {
    const data = {
      user1Id: id1,
      user2Id: id2
    }
    try {
      const response = await axios.post(`${baseURL}chats/create/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  } 

  async findChat(user1Id, user2Id){
    try{
      const response = await axios.get(`${baseURL}chats/find/${user1Id}/${user2Id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } 
    catch (error) {
      return error.response.data;
    }
  }

  //Message APIs:
  async getMessages(chatId){
    try{
      const response = await axios.get(`${baseURL}messages/${chatId}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } 
    catch (error) {
      return error.response.data;
    }
  }

  async addMessage(chatId, senderId, content){
    const data = {
      chatId: chatId,
      senderId: senderId,
      content: content
    }
    const response = await axios.post(`${baseURL}messages/add/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

const apiService = new Api();
export default apiService;
