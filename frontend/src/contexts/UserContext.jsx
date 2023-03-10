import React, { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userReg, setUserReg] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(null);

  const register = async (firstname, lastname, email, password) => {
    const data = JSON.stringify({      
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });
    console.log(data)
    const config = {
      method: "post",
      url: "/api/users/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = axios(config)
    return response;
  };

  const login = async (email, password) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: "post",
      url: "/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    setIsAuthorized(false);
  };

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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
