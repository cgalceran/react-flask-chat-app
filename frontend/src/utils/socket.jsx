import { io } from "socket.io-client";

const socket = new io({
  autoConnect: false,
  withCredentials: true,
});

export default socket;
