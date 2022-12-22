import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView} from 'react-native';

import EditScreenInfo from '../../components/organism/EditScreenInfo';
import { Text, View } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';
import { Button } from "@material-ui/core";

export default function RoutesScreen({ navigation }: RootTabScreenProps<'Routes'>) {

  //const [routen, setRoute] = useState([]); javascript
  const [routen, setRoute] = useState<any[]>([]); //typescript
 
  // This method fetches the routes from the database.
  useEffect(() => {
    async function getRouten() {
      //console.log("Fetching routes from server...");
      const response = await fetch(`http://192.168.0.28:7000/api/allroutes`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
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
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Routen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {routen.map((route) => (
        <>
          <Text style={styles.listTitle}>Name:</Text>
          <Text style={styles.list}>{route.name}</Text>
          <Text style={styles.listTitle}>Info:</Text>
          <Text style={styles.list}>{route.info}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </>
        
      ))}
    </ScrollView>
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
  },
  listTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center',
  },
});
