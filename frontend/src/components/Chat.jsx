import React from 'react'

const Chat = () => {
  

  const userCarlos = {
    name: "Carlos Galceran",
    messages: [
      { message: "Hello World!" },
      { message: "How are you?" },
      { message: "Let's get this thing going!" },
    ],
  };

  const userDebora = {
    name: "Debora Zaccaria",
    messages: [
      { message: "Hi Carlos!" },
      { message: "I'm studing to be a recruiter" },
      { message: "That's why you need to clean the house right now!" },
    ],
  };
  
  const users = [userCarlos, userDebora]
  
  
  return (
    <main className="grid h-96 w-1/2 grid-cols-2 gap-2">
      <div className="bg-slate-400 outline-double ">
        <ul>{users && users.map((user, i) => <li key={i}>{user.name}</li>)}</ul>
      </div>

      <div>
        <div className="h-80 bg-slate-400 outline-double overflow-y-auto">
          <ul>
            {users &&
              users.map((user, i) => (
                <ul key={i}>
                  {user.messages.map((message, i) => (
                    <li key={i}>{user.name}: {message.message}</li>
                  ))}
                </ul>
              ))}
          </ul>
        </div>

        <div className="grid h-16 grid-cols-3 gap-1 bg-slate-400 outline-double ">
          <input
            type="text"
            className="col-span-2 px-4"
            placeholder=" Write your message"
          />
          <button className="col-span-1 bg-white">send</button>
        </div>
      </div>
    </main>
  );
}

export default Chat