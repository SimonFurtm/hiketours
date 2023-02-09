import * as React from 'react';
import { Button, StyleSheet, Image, TouchabkeOpacity  } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { Text, View} from '../../components/atoms/Themed';
import Colors from '../../constants/Colors';
import { RootTabScreenProps } from '../../types';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(logedIn, setLogedIn) {
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
      //accesToken && getUserData();
    }
  }, [response, accesToken]);

  async function getUserData(){
    let response = await fetch("http://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accesToken}`}
    });
    const userInfo = await response.json();
    setUser(userInfo);
    console.log(user)
  }

  //
  const showUserInfo = () => {
    if(user){
      return(
        <View>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />          
          <Text style={{fontWeight: 'bold', marginBottom: 1}}>Welcome {user.name}</Text>
          <Text style={{fontWeight: 'bold', marginBottom: 1}}>Email: {user.email} </Text>
        </View>
      );
    }else {
      return(
        <View >
          <Text style={{ fontWeight: 'bold', marginBottom: 2}}>Not working.</Text>
        </View>
      );
    }
  }

  return (
    <View>
      
      {/*user === null &&
        <Button 
          disabled={!request}
          title="Google-Login"
          onPress={() => {
            promptAsync();
          }}
      />
        */}
      <TouchabkeOpacity 
        style={styles.button}
        disabled={true}
        onPress={accesToken ? getUserData : () => {promptAsync({showInRecents: true})}}
      >
        <Text>{accesToken ? "Get User Data" : "Login"}</Text>
      </TouchabkeOpacity>
      {/*showUserInfo()*/}
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
  button: {
    backgroundColor: Colors.dark.secondaryDark,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
