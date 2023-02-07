import React, { useState, useEffect, Fragment } from 'react';
import MapView, { Geojson } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



export default function Map() {

  const mapRef = React.createRef()
  const [mapStyle, setMapStyle] = React.useState("hybrid");
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [currGeojson, setCurrGeojson] = useState("");
  const [customRoute, setCustomRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [watcher, setWatcher] = useState(null);
  const Bischofshofen = { latitude: 47.41545773037797, longitude: 13.218184887894393, latitudeDelta: 0.06, longitudeDelta: 0.04, };
  const [location, setLocation] = useState(null);
  const [routes, setRoute] = useState([]);
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
  const [customGejson, setCustomGeojson] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "MultiLineString",
          coordinates: [
            [],
          ],
        },
      },
    ],
  });

  //get foreground permission to access location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  //update location every x seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      (async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log("Location updated successfully");
      })();

    }, 1000 * 50)
    return () => clearInterval(intervalId)
  }, [location]);

  //activate location watcher
  useEffect(() => {
    (async () => {
      if (isTracking) {
        Location.watchPositionAsync({
          enableHighAccuracy: true,
          distanceInterval: 1,
          timeout: 5000
        }, location => {
          setCustomRoute(customRoute => [...customRoute, location.coords]);
          setLocation(location);
        }).then((locationWatcher) => {
          setWatcher(locationWatcher);
        }).catch((err) => {
          console.log(err)
        })
      }
    })();
  }, [isTracking]);

  // whenever the customRoute array changes, update the customGeojson
  useEffect(() => {
    if (isTracking) {
    setCustomGeojson({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "MultiLineString",
            coordinates: [
              customRoute.map((coords) => [coords.longitude, coords.latitude]),
            ],
          },
        },
      ],
    });
  }
  }, [customRoute])
  
  //When the map component renders, fetch all routes from the server
  useEffect(() => {
    getRoutes();
  }, []);

  async function getRoutes() {
    console.log("Fetching routes from server...");
    const response = await fetch(`https://zk2ezn.deta.dev/api/allroutes`);
    if (!response.ok) {
      console.error("Failed to fetch routes from server:", response);
      getRoutes();
      return;
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      console.log("Successfully fetched routes from server");
      setIsFinishedLoading(true);
      setRoute(data);
    } else {
      console.error("Received non-array data from server:", data);
    }
  }

  //move map to current location
  function moveToLocation() {
    if (location != null) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        //latitudeDelta: 0.003,
        //longitudeDelta: 0.003
        latitudeDelta: 0.0003,
        longitudeDelta: 0.0003
      })
    }
  }

  //when clicking on any route
  function handleGeoJsonPress(event) {
    setCurrGeojson(event);
    console.log(currGeojson.name);
    setModalVisible(true);
  };

  //change map style
  function changeMapStyle() {
    switch (count) {
      case 1:
        setMapStyle("satellite");
        setCount(2);
        break;
      case 2:
        setMapStyle("standard");
        setCount(3);
        break;
      case 3:
        setMapStyle("terrain");
        setCount(4);
        break;
      case 4:
        setMapStyle("hybrid");
        setCount(1);
        break;
      default:
        break;
    }
  }

  const handleStartTracking = () => {
    console.log("watcher started");
    setIsTracking(true);
    moveToLocation();

  }

  const handleStopTracking = () => {
    console.log("watcher stopped");
    setIsTracking(false);
    watcher.remove(); 
    moveToLocation();
  }

  const handleDiscardRoute = () => {
    console.log("Custom route discarded");
    watcher.remove();
    setIsTracking(false);
    setCustomRoute([]);
    setCustomGeojson({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "MultiLineString",
            coordinates: [
              [],
            ],
          },
        },
      ],
    }); 
  }

  const handleSaveRoute = () => {
    console.log("Custom route saved");
    watcher.remove();
    setIsTracking(false);
  }

  return (
    <View>

      {/*Popup window when clicking on GeoJson path using a Modal*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{currGeojson.name}</Text>
            <Text style={styles.modalText}>{currGeojson.info}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={moveToLocation}
            >
              <Text style={styles.textStyle}>Weg starten</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Schließen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      {/*Adds a Button that moves to your location when pressed*/}
      <TouchableOpacity style={[styles.UIButtonView]} onPress={moveToLocation}>
        <AntDesign
          style={styles.locationButtonImage}
          name="pluscircle"
          size={40}
          color="white"
        />
      </TouchableOpacity>


      {/*Start to track your own custom route*/}
      {!isTracking && (
        <TouchableOpacity style={[styles.RouteStyleButtonView]} onPress={handleStartTracking}>
          <AntDesign
            style={styles.locationButtonImage}
            name="play"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      )}

      {/*Stops tracking your custom route and prompts you to discard or save*/}
      {isTracking && (
        <TouchableOpacity style={styles.RouteStyleButtonView} onPress={handleStopTracking}>
          <FontAwesome5 name="stop" size={40} color="white" />
        </TouchableOpacity>
      )}

      {/*Discard custom route*/}
      {isTracking && (
        <TouchableOpacity style={styles.DiscardCustomRouteButton} onPress={handleDiscardRoute}>
          <FontAwesome5 name="ban" size={40} color="white" />
        </TouchableOpacity>
      )}

      {/*Save custom route*/}
      {isTracking && (
        <TouchableOpacity style={styles.SaveCustomRouteButton} onPress={handleSaveRoute}>
          <FontAwesome5 name="save" size={40} color="white" />
        </TouchableOpacity>
      )}



      {/*Adds a Button that changes the map type (satelite, hightmap, etc...)*/}
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



      {isFinishedLoading && (
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
              key={route._id}
              tappable
              geojson={route}
              strokeColor="blue"
              strokeWidth={2}
              onPress={() => handleGeoJsonPress(route)}
            />

          ))}

          {customRoute.length > 0 && (
            <Geojson
              geojson={customGejson}
              strokeColor="blue"
              strokeWidth={2}
            />
          )}

        </MapView >
      )}
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

    zIndex: 2,
  },

  MapStyleButtonView: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '50%',
    left: '88%',

    zIndex: 2,
  },
  RouteStyleButtonView: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '40%',
    left: '88%',

    zIndex: 2,
  },
  DiscardCustomRouteButton: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '35%',
    left: '70%',

    zIndex: 2,
  },
  SaveCustomRouteButton: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '45%',
    left: '70%',

    zIndex: 2,
  },
  StopTrackingButton: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '40%',
    left: '10%',

    zIndex: 2,
  },
  PauseTrackingButton: {
    width: '15%',
    height: '10%',
    position: 'absolute',
    bottom: '40%',
    left: '20%',

    zIndex: 2,
  },

});