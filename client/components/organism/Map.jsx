import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, Circle, Polyline, Geojson } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Pressable, TouchableOpacity, Platform, Modal } from 'react-native';
import * as Location from 'expo-location';
import { Popup } from 'react-native-map-link';

export default function Map() {

  const Hubertusweg = require('../../assets/Routes/Hubertusweg.json');
  const Erzweg = require('../../assets/Routes/Erzweg.json');

  const [pinBlue, setPinBlue] = React.useState({ latitude: 47.41545773037797, longitude: 13.218184887894393, })
  const [pinRed, setPinRed] = React.useState({ latitude: 47.41545773037797, longitude: 13.218184887894393, })

  //modal state
  const [modalVisible, setModalVisible] = useState(false);

  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(0);

  const mapRef = React.createRef()

  const Bischofshofen = {
    latitude: 47.41545773037797,
    longitude: 13.218184887894393,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
  };

  const [region, setRegion] = React.useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);

  useEffect(() => {
    setCount(count + 1);
    console.log(count);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let lastLocation = await Location.getLastKnownPositionAsync({});
      setLocation(location);
      setPinRed({ latitude: location.coords.latitude, longitude: location.coords.longitude })
      setLastLocation(lastLocation);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onPressTest = () => {
    if (location != null) {
      let currLatitude = location.coords.latitude
      let currLongitude = location.coords.longitude
      let currLatitudeDelta = location.coords.latitudeDelta
      let currLongitudeDelta = location.coords.longitudeDelta

      console.log(currLatitude, currLongitude, currLatitudeDelta, currLongitudeDelta)
      setPinRed({ latitude: currLatitude, longitude: currLongitude })

    } else {
      console.log("location is not known")
    }

  }
  const moveToLocation = () => {
    if (location != null) {
      console.log("moving to location");
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      })
    }
  }


  //When pressing on a route
  const handleGeoJsonPress = (event) => {
    //print the name of the route
    console.log(event.properties);
    //set the state of the modal to true
    setModalVisible(true);
  };



  return (
<View>
     {/*Popup window when clicking on GeoJson path using a Modal*/}
     <Modal
     animationType="slide"
     
     transparent={false}
     visible={modalVisible}
     onRequestClose={() => {
       Alert.alert("Modal has been closed.");
     }}
   >
     <View style={styles.centeredView}>
       <View style={styles.modalView}>
         <Text style={styles.modalText}>Hello World!</Text>

         <Pressable
           style={[styles.button, styles.buttonClose]}
           onPress={() => setModalVisible(false)}
         >
           <Text style={styles.textStyle}>Hide Modal</Text>
         </Pressable>
       </View>
   </View>
   </Modal>
   {/*End of Modal*/}

    <MapView style={styles.map}
      showsUserLocation={true}
      ref={mapRef}
      mapType="hybrid"
      region={Bischofshofen}
      provider="google"
      onLongPress={moveToLocation}
    >


      <Geojson
        tappable
        geojson={Hubertusweg}
        //fillColor="transparent"
        strokeColor="#27c7be"
        strokeWidth={2}
        onPress={handleGeoJsonPress}
      />

      <Geojson
        tappable
        geojson={Erzweg}
        strokeColor="blue"
        fillColor="green"
        strokeWidth={2}
        //Open a popup window and show the name of the route
        onPress={handleGeoJsonPress}
      />

      
    

      <Marker
        coordinate={pinBlue}
        pinColor="blue"
        draggable={true}
        onDragStart={(e) => {
          console.log("Drag start", e.nativeEvent.coordinate);
        }}
        onDragEnd={(e) => {
          setPinBlue({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          }
          )
        }}
      >
      </Marker>

      <Marker
        coordinate={pinRed}
        pinColor="red"
        draggable={true}
        onDragStart={(e) => {
          console.log("Drag start", e.nativeEvent.coordinate);
        }}
        onDragEnd={(e) => {
          setPinRed({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          }
          )
        }}
      >
      </Marker>
    </MapView >

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 50
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#218123",
    padding: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  coordText: {
    fontSize: 13,
    fontWeight: 'bold',

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  

});