import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import socket from "../utils/socket";
import jwt_decode from "jwt-decode";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [alertLogin, setAlertLogin] = useState(false); // Alerts
  const [alertTextLogin, setAlertTextLogin] = useState(""); // Alerts
  const [isGuest, setIsGuest] = useState(false); // Guest Login

  useEffect(() => {
    const tokenFromApp = localStorage.getItem("token");
    if (!tokenFromApp) return;
    const decoded = jwt_decode(tokenFromApp);
    setIsAuthorized(true);
    const opts = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios.get(`/api/users/${decoded.sub.email}`, opts).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  const register = async (firstname, lastname, email, password) => {
    const data = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
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
          setAlertTextLogin(response.data);
          setAlertLogin(true);
        } else if (response.data == "Incorrect password") {
          setAlertTextLogin(response.data);
          setAlertLogin(true);
        } else {
          localStorage.setItem("token", response.data.access_token);
          setIsAuthorized(true);
          const opts = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
          axios.get(`/api/users/${email}`, opts).then((response) => {
            setUserInfo(response.data);
            if (response.data.email == "guest@guest.com") {
              setIsGuest(true);
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    const data = JSON.stringify({
      email: userInfo.email,
    });

    const config = {
      method: "post",
      url: "/api/logout",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };
    const response = axios(config);
    if (response) {
      localStorage.removeItem("token");
      setIsAuthorized(false);
      socket.disconnect();
    }
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
    isGuest,
    setIsGuest,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
