import React, {createContext, useState} from 'react'


const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
  const [userReg, setUserReg] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(null);



  const register = ( firstname,lastname,email,password) => {
    console.log(
      "Email",
      email,
      "Firstname:",
      firstname,
      "Lastname:",
      lastname,
      "Password:",
      password
    );
  }


  const login = (user, pass) => {
    console.log('User:', user, '- Password:', pass)

  }

  const logout = () => {
    setIsAuthorized(false)

  }

  const value = {
    userReg,
    setUserReg,
    userInfo, 
    setUserInfo,
    isAuthorized,
    setIsAuthorized, 
    register, 
    login,
    logout,
  }
  

  
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserContext;
