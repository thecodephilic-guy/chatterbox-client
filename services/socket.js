import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL;
const socket = io(URL, {
  autoConnect: false, // Prevent it from connecting automatically
});

export default socket;