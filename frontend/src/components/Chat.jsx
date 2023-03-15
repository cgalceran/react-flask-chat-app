import React, {useContext, useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import socket from '../utils/socket';


const Chat = () => {
  const [messages, setMessages] = useState([])
  const navigate = useNavigate();
  const { userInfo, loggedInUsers, setLoggedInUsers, logout } = useContext(UserContext);

  const getMessages = () => {
    const opts = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
    axios.get("/api/messages", opts).then((response) => {
      setMessages(response.data);
    });
  }

  socket.on('updatedMessages', (data) => {
    console.log(data)
  })
  
  // Initial data to chat - (Active Users and Messages)
  useEffect(() => {
    const opts = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    };
    axios
      .get("/api/users/active", opts)
      .then((response) => {
        setLoggedInUsers(response.data);
      });
    getMessages()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    createMessage(e.target.message.value);
    e.target.reset();
  };

  const createMessage = async (message) => {
     const data = JSON.stringify({
       message: message,
       email: userInfo.email,
     });

     const config = {
       method: "post",
       url: "/api/messages",
       headers: {
         "Content-Type": "application/json",
       },
       data: data,
     };
     axios(config)
      .then((response) => {
        console.log(response.data)
      })
  socket.emit('created message')    
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  
  return (
    <main>
      <div className="flex flex-row justify-between">
        {userInfo && (
          <p className="pt-4 text-black dark:text-[#e8e8e8]">
            Hi, {userInfo.firstname}!
          </p>
        )}
        <button
          onClick={handleLogout}
          className="mb-1 rounded-lg border-none bg-[#252525] p-2 px-3 text-white outline-none ease-in-out hover:bg-black hover:text-white"
        >
          {" "}
          Logout
        </button>
      </div>

      <div className="grid h-96 grid-cols-2 gap-1">
        <div className="rounded-l-3xl bg-[#171717] ">
          <ul className="p-4 text-xs text-white">
            {loggedInUsers &&
              loggedInUsers.map((user, i) => (
                <li key={i}>
                  {user.firstname} {user.lastname}{" "}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <div className="h-96 overflow-y-auto rounded-tr-3xl bg-[#171717]">
            <ul className="pl-2 text-xs text-white">
              {messages &&
                messages.map((element, i) => (
                  <li key={i}>
                    {element.username}: {element.message}
                  </li>
                ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="grid h-10 grid-cols-3 gap-1 ">
            <input
              onChange={(e) => e.target.value}
              id="message"
              type="text"
              className="col-span-2 px-4"
              placeholder=" Write your message"
            ></input>
            <button
              type="submit"
              className="col-span-1 rounded-br-3xl bg-white"
            >
              send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Chat