import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { Text, View, Image, TouchabkeOpacity } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const [accesToken, setAccessToken] = React.useState(null);  //Usertoken
  const [user, setUser] = React.useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '869135852892-ufvu94df442bv5ir6681d49f3k4aij6d.apps.googleusercontent.com', //Web
    iosClientId: '869135852892-cjmv7ah73o304dme76uksom3fiseaqdp.apps.googleusercontent.com',  //IOS
    androidClientId: '869135852892-5fh9cm285h0nhhcg8gkg381bvr8ab3sf.apps.googleusercontent.com', //Android
  });

  //fetch user data
  React.useEffect(() => { //when response changes
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken); //set token
      accesToken && fetchUserInfo();
    }
  }, [response, accesToken]);

  async function fetchUserInfo(){
    let response = await fetch("http://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accesToken}`}
    });
    const userInfo = await response.json();
    setUser(userInfo);
    console.log(user)
  }

  //
  const ShowUserInfo = () => {
    if(user){
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Test {user.name} </Text>
        </View>
      );
    }
  }

  return (
    <View>
      {user && <Text>{user.name}</Text>}
      {user === null &&
        <Button 
          disabled={!request}
          title="Google-Login"
          onPress={() => {
            promptAsync();
          }}
      />
      }
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
