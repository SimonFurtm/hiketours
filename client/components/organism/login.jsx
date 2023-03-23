import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from "axios";

import Colors from '../../constants/Colors';
import { MonoText } from '../molecules/StyledText';
import { Text, View } from '../atoms/Themed';
import AppleLogin from '../molecules/appleLogin';
import GoogleLogin from '../molecules/googleLogin';
import { useContext, createContext, useState } from 'react';
import EmailLogin from '../molecules/emailLogim';

const API_URL = "https://zk2ezn.deta.dev/api";
const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function Login() {
  
  return (
    <View>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EmailLogin />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/*<GoogleLogin 
          logedIn = {logedIn}
          setLogedIn = {setLogedIn}
        />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
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
