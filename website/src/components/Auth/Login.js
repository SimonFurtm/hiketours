import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://zk2ezn.deta.dev/api';

const Login = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(API_URL+'/login', { username, password });
      if (res.data.success) {
        console.log("it worked");
      } else {
        console.log("faild as usual");
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="username"
        value={username}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;