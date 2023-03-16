import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import socket from "../utils/socket";
import Bubble from "./Bubble";
import { BsFillCircleFill } from "react-icons/bs";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { userInfo, loggedInUsers, setLoggedInUsers, logout } =
    useContext(UserContext);

  const getMessages = () => {
    const opts = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.get("/api/messages", opts).then((response) => {
      setMessages(response.data);
    });
  };

  // Initial data to chat - (Active Users and Messages)
  useEffect(() => {
    socket.connect(socket);
    const opts = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.get("/api/users/active", opts).then((response) => {
      setLoggedInUsers(response.data);
    });
    getMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_db_messages", (data) => {
      setMessages(data);
      console.log(data);
    });
    socket.on("logged_in_users", (users) => {
      setLoggedInUsers(users);
      console.log(users);
    });
  }, [socket]);

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
    axios(config).then((response) => {
      socket.emit("created a message");
      console.log(response.data);
    });
  };

  const handleLogout = async () => {
    const run = await logout();
    console.log("run constant: ", run )
    navigate("/");
  };

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

      <div className="grid h-96 max-w-3xl grid-cols-2 gap-1">
        <div className="rounded-l-3xl bg-[#171717] ">
          <div className="mt-2 text-center text-white">
            <span>Online Users</span>
          </div>

          <ul className="text-s p-4 text-white">
            {loggedInUsers &&
              loggedInUsers.map((user, i) => (
                <li key={i} className="m-1 flex flex-row">
                  <BsFillCircleFill
                    size="12"
                    className="mt-1.5 mr-1 text-green-500"
                  />{" "}
                  {user.firstname} {user.lastname}{" "}
                </li>
              ))}
          </ul>
        </div>

        <div>
          <div className="h-96 overflow-y-auto rounded-tr-3xl bg-[#171717]">
            <ul className="text-s pl-2 text-white">
              {messages &&
                messages.map((element) => (
                  <Bubble data={element} key={element._id} />
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
};

export default Chat;
