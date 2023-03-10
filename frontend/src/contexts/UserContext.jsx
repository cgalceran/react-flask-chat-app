import React, { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [alertLogin, setAlertLogin] = useState(false);
  const [alertTextLogin, setAlertTextLogin] = useState("");

  const register = async (firstname, lastname, email, password) => {
    const data = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    console.log(data);
    const config = {
      method: "post",
      url: "/api/users/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = axios(config);
    return response;
  };

  const login = (email, password) => {
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

    axios(config)
      .then((response) => {
        if (response.data == "User not found") {
          setAlertTextLogin(response.data)
          setAlertLogin(true)
        } else if (response.data == "Incorrect password") {
          setAlertTextLogin(response.data);
          setAlertLogin(true);
        } else {
          localStorage.setItem("token", response.data.access_token);
          setIsAuthorized(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
  };

  const value = {
    alertLogin,
    setAlertLogin,
    alertTextLogin,
    setAlertTextLogin,
    loggedInUsers,
    setLoggedInUsers,
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
