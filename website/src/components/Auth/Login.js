import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";//Redirect User after Login
import { AuthContext }from "./AuthStatus/User";

const API_URL = "https://zk2ezn.deta.dev/api";

const Login = () => {
  const [name, setName] = useState("");
  const [passwort, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, password: passwort }),
      });
      const data = await res.json();
      if (data.success) {
        setUser({ username: name});
        console.log("it worked");
        navigate("/");
      } else {
        console.log("faild as usual");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        value={passwort}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
