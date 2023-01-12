import React, { useState, useEffect, Fragment } from 'react';
import MapView, { Marker, Callout, Circle, Polyline, Geojson } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button, Pressable, TouchableOpacity, Platform, Modal, Image } from 'react-native';
import * as Location from 'expo-location';
import { Popup } from 'react-native-map-link';
import { AntDesign } from '@expo/vector-icons';



export default function Map() {

  const Hubertusweg = require('../../assets/Routes/Hubertusweg.json');
  const Erzweg = require('../../assets/Routes/Erzweg.json');

  const [pinBlue, setPinBlue] = React.useState({ latitude: 47.41545773037797, longitude: 13.218184887894393, })
  const [pinRed, setPinRed] = React.useState({ latitude: 47.41545773037797, longitude: 13.218184887894393, })

  const mapRef = React.createRef()

  //map style
  const [mapStyle, setMapStyle] = React.useState("hybrid");

  //modal state
  const [modalVisible, setModalVisible] = useState(false);

  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(1);

  const [currGeojson, setCurrGeojson] = useState(Hubertusweg);


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

  const [routes, setRoute] = useState([]); //javascript
  //const [routen, setRoute] = useState<any[]>([]); //typescript

  useEffect(() => {
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
    
    //fetch DB Data
    async function getRoutes() {
      //console.log("Fetching routes from server...");
      const response = await fetch(`http://localhost:7000/api/allroutes`);

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
        console.error("Received non-array data from server:", data);
      }
    }
    getRoutes();
    return;
  }, [routes]);


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

  const nextRout = () => {
    if (routes != null) {
      () => getRouten();
      console.log("Getting Data");
    }else{
      console.log("Check the DB-Connection");
    }
  }


  //When pressing on a route
  const handleGeoJsonPress = (event) => {
    //print the name of the route to the console
    setCurrGeojson(event);
    console.log(currGeojson.name);
    //set the state of the modal to true
    setModalVisible(true);
  };

  const changeMapStyle = () => {
    //change x every third time
    console.log(count);
    if (count == 1) {
    setMapStyle("satellite");
    setCount(2);
    }
    if (count == 2) {
    setMapStyle("standard");
    setCount(3);
    }
    if (count == 3) {
    setMapStyle("terrain");
    setCount(4);
    }
    if (count == 4) {
    setMapStyle("hybrid");
    setCount(1);
    }
}


  return (
    <View>
      {/*Popup window when clicking on GeoJson path using a Modal*/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{currGeojson.name}</Text>
            <Text style={styles.modalText}>{currGeojson.name}</Text>


            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}

              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/*End of Modal*/}

       {/*Adds a Button that moves to your location when pressed*/}
      <TouchableOpacity style={[styles.UIButtonView]}onPress={moveToLocation}>
        <AntDesign
          style={styles.locationButtonImage} 
          name="pluscircle"
          size={40}
          color="white"
        />
      </TouchableOpacity>
      
      {/*Adds a Button that moves to your location when pressed*/}
      <TouchableOpacity style={[styles.RouteStyleButtonView]}onPress={nextRout}>
        <AntDesign
          style={styles.locationButtonImage} 
          name="forward"
          size={40}
          color="white"
        />
      </TouchableOpacity>
      
      {/*Adds a Button that changes the map type*/}
      <TouchableOpacity
        style={styles.MapStyleButtonView}
        onPress={changeMapStyle}
        >
            <AntDesign
            style={styles.ButtonImage} 
            name="earth"
            size={40}
            color="white"
            />
        </TouchableOpacity>

      <MapView style={styles.map}
        showsUserLocation={true}
        ref={mapRef}
        mapType={mapStyle}
        region={Bischofshofen}
        provider="google"
      >

        {/*Map all routes from the database*/}
        {routes.map((route) => (
          <Geojson
            tappable
            geojson={route}
            strokeColor="green"
            strokeWidth={2}
            onPress={() => handleGeoJsonPress(route)}
          />
        
      ))}
      
        <Geojson
          tappable
          geojson={Hubertusweg}
          strokeColor="#27c7be"
          strokeWidth={2}
          onPress={() => handleGeoJsonPress(Hubertusweg)}
        />

        <Geojson
          tappable
          geojson={Erzweg}
          strokeColor="blue"
          strokeWidth={2}
          //Open a popup window and send the name of the route to the popup
          onPress={() => handleGeoJsonPress(Erzweg)}
        />
        {/*
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
        */}
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
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#218123",
    padding: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f194ff",
    padding: 10,
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
  UIButtonView: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '30%',
    left: '88%',
 
    zIndex:2,
  },
  
  MapStyleButtonView: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '50%',
    left: '88%',
 
    zIndex:2,
  },
  RouteStyleButtonView: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '40%',
    left: '88%',
 
    zIndex:2,
  },

});