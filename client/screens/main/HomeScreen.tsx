import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/organism/EditScreenInfo';
import { Text, View } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';
import Map from '../../components/organism/Map';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Map />
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
