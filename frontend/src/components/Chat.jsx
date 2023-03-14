import React, {useContext, useEffect, useState }from 'react'
import UserContext from "../contexts/UserContext";
import axios from 'axios';


const Chat = () => {
  const [messages, setMessages] = useState([])
  const { loggedInUsers, setLoggedInUsers } = useContext(UserContext);

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
    axios.get("/api/messages", opts).then((response) => {
      setMessages(response.data)
    });
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    createMessage(e.target.message.value);
    e.target.reset();
  };

  const createMessage = async (message) => {
    console.log(message)
  }
  
  
  return (
    <main className="grid h-96 w-1/2 grid-cols-2 gap-2">
      <div className="bg-slate-400 outline-double ">
        <ul>
          {loggedInUsers &&
            loggedInUsers.map((user, i) => (
              <li key={i}>
                {user.firstname} {user.lastname}{" "}
              </li>
            ))}
        </ul>
      </div>

      <div>
        <div className="h-80 overflow-y-auto bg-slate-400 outline-double">
          <ul>
            {messages &&
              messages.map((element, i) => (
                <li key={i}>
                  {element.username}: {element.message}
                </li>
              ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid h-16 grid-cols-3 gap-1 bg-slate-400 outline-double "
        >
          <input
            onChange={(e) => e.target.value}
            id="message"
            type="text"
            className="col-span-2 px-4"
            placeholder=" Write your message"
          ></input>
          <button type='submit' className="col-span-1 bg-white">send</button>
        </form>
      </div>
    </main>
  );
}

export default Chat