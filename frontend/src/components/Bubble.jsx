import React, {useContext} from 'react'
import UserContext from "../contexts/UserContext";


const Bubble = ({ data }) => {
    const { userInfo } = useContext(UserContext);
  return (
    <>
      {userInfo._id == data.user_id ? (
        <div key={data._id} className="chat chat-end">
          <div className="chat-header">
            {data.username}
            <time className="text-xs opacity-50">
              {" "}
              {data.created_at.split("-")[1].slice(0, 5)}
            </time>
          </div>
          <div className="chat-bubble break-before-right bg-indigo-400 font-light">
            {data.message}
          </div>
        </div>
      ) : (
        <div key={data._id} className="chat chat-start">
          <div className="chat-header">
            {data.username}
            <time className="text-xs opacity-50">
              {" "}
              {data.created_at.split("-")[1].slice(0, 5)}
            </time>
          </div>
          <div className="chat-bubble break-before-right font-light">
            {data.message}
          </div>
        </div>
      )}
    </>
  );
}

export default Bubble

