import React, {useContext} from 'react'
import Login from './Login';
import Chat from "./Chat";
import UserContext from "../contexts/UserContext";

const MainComponent = () => {
    const {isAuthorized} = useContext(UserContext);
  return (
    <>
        { isAuthorized ? <Chat/> : <Login/>}
        
    </>
  )
}

export default MainComponent