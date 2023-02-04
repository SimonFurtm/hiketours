import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import * as Google from 'expo-auth-session/providers/google';

import { Text, View } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';
import Login from '../../components/organism/login';

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button> style={styles.container}</Button>
      <Login />
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
