import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import * as Google from 'expo-auth-session/providers/google';

import { Text, View } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '869135852892-cjmv7ah73o304dme76uksom3fiseaqdp.apps.googleusercontent.com',
    iosClientId: '869135852892-ufvu94df442bv5ir6681d49f3k4aij6d.apps.googleusercontent.com',
    androidClientId: '869135852892-5fh9cm285h0nhhcg8gkg381bvr8ab3sf.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  return (
    <Button 
        disabled={!request}
        title="Top G - Login"
        onPress={() => {
          promptAsync();
        }}
      />
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
