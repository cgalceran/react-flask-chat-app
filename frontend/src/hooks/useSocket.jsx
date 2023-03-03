import { useContext, useEffect } from "react";
import socket from '../utils/socket'
import UserContext from "../contexts/UserContext";


// This is just an idea... craete a reusable hook for every connection... do not know if possible.

const useSocket = () => {
    const {setUserInfo, setIsAuthorized} = useContext(UserContext)
    useEffect(() => {
      socket.connect();
      socket.emit("hello this is Carlos from the Client")
      socket.on('connect_error', ()=> {
        setIsAuthorized(false);
      })
      return () => {
        socket.off('connect_error');
      }

    }, []);
};

export default useSocket;


