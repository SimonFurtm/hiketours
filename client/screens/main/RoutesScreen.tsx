import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../../components/organism/EditScreenInfo';
import { Text, View } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function RoutesScreen({ navigation }: RootTabScreenProps<'Routes'>) {

  //const [routen, setRoute] = useState([]); javascript
  const [routen, setRoute] = useState<any[]>([]); //typescript
 
  // This method fetches the routes from the database.
  useEffect(() => {
    async function getRouten() {
      //console.log("Fetching routes from server...");
      const response = await fetch(`https://zk2ezn.deta.dev/api/allroutes`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        //window.alert(message);
        //setTimeout(getRouten, 1000);
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        //console.log("Fetched routes:", data);
        setRoute(data);
      } else {
        //console.error("Received non-array data from server:", data);
      }
    }
 
    getRouten();
 
    return;
  }, [routen]);

  return (
    <View>
      <Text style={styles.title}>Routen</Text>
      <View style={styles.separator1} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView style={styles.scrollView}>
        
        {routen.map((route) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.listTitle}>Name:</Text>
            <Text style={styles.list}>{route.name}</Text>
            <Text style={styles.listTitle}>Info:</Text>
            <Text style={styles.list}>{route.info}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: "100%",
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20
  },
  list: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  listTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: Colors.dark.secondaryDark,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  separator1: {
    marginTop: 10,
    height: 1,
    width: '100%',
    alignSelf: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center',
  },
});
