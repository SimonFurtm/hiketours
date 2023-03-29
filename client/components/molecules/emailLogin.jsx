import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from "axios";

import Colors from '../../constants/Colors';
import { Text, View } from '../atoms/Themed';

import { useContext, createContext, useState } from 'react';

const API_URL = "https://zk2ezn.deta.dev/api";

export default function EmailLogin({loggedIn, setLoggedIn, user, setUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser({ username: username});
        console.log("it worked");
      } else {
        console.log("faild as usual");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/register`, {
        username,
        password,
      })
      .then((res) => {
        setUser({ username: username});
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View>
      {}
      <Text style={styles.title}>{loggedIn ? 'Login' : 'Register'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={loggedIn ?handleLogin : handleRegister}>
        <Text style={styles.buttonText}>
          {loggedIn ? 'Login' : 'Create Account'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleLogin}>
        <Text style={styles.link}>
          {loggedIn ? 'Create an account' : 'Already have an account?'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    alignSelf: 'center',
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: Colors.dark.secondaryDark,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 18,
    borderRadius: 25,
    backgroundColor: Colors.dark.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: Colors.dark.secondaryDark,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    alignItems: 'center',
    color: Colors.dark.primary,
    fontSize: 18,
    margin: 20,
  },
});
