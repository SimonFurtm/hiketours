import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/atoms/Themed';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ups! Diese Seite wurde nicht gefunden.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Gehe zum Startbildschirm!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
