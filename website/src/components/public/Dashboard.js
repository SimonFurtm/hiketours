/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
//import { useEffect /*, useState */ } from "react";
//import { Navigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthStatus/User";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  let savedUser = null;
  console.log("dash" + user.username);

  useEffect(() => {
    // Access initial value from session storage
    if (user && user.username) {
      console.log(JSON.stringify(user));
      window.sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } else if (
      window.sessionStorage.getItem("user") !== undefined &&
      window.sessionStorage.getItem("user") != null
    ) {
      savedUser = JSON.parse(window.sessionStorage.getItem("user"));
      console.log("Saveduserinstore: " + savedUser.username);
      setUser(savedUser);
    } else if (!savedUser) {
      savedUser = { username: "Guest" };
      setUser(savedUser);
    } else {
      setUser(savedUser);
    }
  }, []);

  if (user && user.username !== undefined) {
    return (
      <div>
        <p>Welcome to hiketours, {user.username}</p>
        <p>Please Sign In/Up</p>
      </div>
    );
  }
  return <p>Doesn't work</p>;
};

export default Dashboard;
