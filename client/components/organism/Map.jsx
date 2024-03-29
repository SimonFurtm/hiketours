import React, { useState, useEffect, Fragment } from 'react';
import MapView, { Geojson } from 'react-native-maps';
import { StyleSheet, View, Dimensions, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { Text, } from '../atoms/Themed';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Colors from '../../constants/Colors';

{/**https://fontawesome.com/v5/search?o=r&c=design */}

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
  const [saveCustomRouteModalVisible, setSaveCustomRouteModalVisible] = useState(false);
  const [customRouteName, setCustomRouteName] = useState("ma");
  const [customRouteInfo, setCustomRouteInfo] = useState("ma");
  const [customGeojson, setCustomGeojson] = useState({
    type: "FeatureCollection",
    name: customRouteName,
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

    }, 1000 * 10)
    return () => clearInterval(intervalId)
  }, []);

  //activate location watcher
  useEffect(() => {
    (async () => {
      if (isTracking) {
        Location.watchPositionAsync({
          accuracy: Location.Accuracy.Balanced,
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
        name: customRouteName,
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
      console.log("Routes fetched: ", data);
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
        setMapStyle("terrain");
        setCount(3);
        break;
      case 3:
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
      name: customRouteName,
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
    })
    console.log("Name of route: "+customGeojson.name);
    
  }

  function handleSaveRoute() {
    watcher.remove();
    setIsTracking(false);
    postCustomRoute();
    console.log(JSON.stringify(customGeojson));
    setSaveCustomRouteModalVisible(true);

  }

  function postCustomRoute() {
    fetch('https://zk2ezn.deta.dev/api/add/route', {
      method: 'POST',
      body: JSON.stringify({
        type: "FeatureCollection",
        name: customRouteName,
        info: customRouteInfo,
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
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (!response.ok) {
          postCustomRoute();
          throw new Error(`fetch failed with status ${response.status}`);

        }
        console.log("Custom route saved");
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <View>

      {/*Popup for when the user Saves a custom route*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={saveCustomRouteModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Gib hier den Namen der Route ein</Text>
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Name"
              onChangeText={text => setCustomRouteName(text)}
            />
            <Text style={styles.modalText}>Gib hier Infos ein</Text>
            <TextInput
              style={styles.TextInputStyle}
              placeholder="Info"
              onChangeText={text => setCustomRouteInfo(text)}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>{
                handleSaveRoute();
                setSaveCustomRouteModalVisible(false);
              }
              }
            >
              <Text style={styles.textStyle}>Speichern</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setSaveCustomRouteModalVisible(false);
                setIsTracking(true);
              }}
            >
              <Text style={styles.textStyle}>Abbrechen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


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
        <FontAwesome5 name="search-location" size={40} color={Colors.dark.primary} />
      </TouchableOpacity>


      {/*Start to track your own custom route*/}
      {!isTracking && (
        <TouchableOpacity style={[styles.RouteStyleButtonView]} onPress={handleStartTracking}>
          <FontAwesome5 name="play" size={40} color={Colors.dark.primary} />
        </TouchableOpacity>
      )}

      {/*Stops tracking your custom route and prompts you to discard or save*/}
      {isTracking && (
        <TouchableOpacity style={styles.RouteStyleButtonView} onPress={handleStopTracking}>
          <FontAwesome5 name="pause" size={40} color={Colors.dark.primary} />
        </TouchableOpacity>
      )}

      {/*Discard custom route*/}
      {isTracking && (
        <TouchableOpacity style={styles.DiscardCustomRouteButton} onPress={handleDiscardRoute}>
          <FontAwesome5 name="ban" size={40} color={Colors.dark.primary} />
        </TouchableOpacity>
      )}

      {/*Open a popup where you can save the custom route*/}
      {isTracking && (
        <TouchableOpacity style={styles.SaveCustomRouteButton}
          onPress={() => {
            setSaveCustomRouteModalVisible(true);
            setIsTracking(false);
          }}>
          <FontAwesome5 name="save" size={40} color={Colors.dark.primary} />
        </TouchableOpacity>
      )}

      {/*Adds a Button that changes the map type (satelite, hightmap, etc...)*/}
      <TouchableOpacity
        style={styles.MapStyleButtonView}
        onPress={changeMapStyle}
      >
        <FontAwesome5 name="layer-group" size={40} color={Colors.dark.primary} />
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
              geojson={customGeojson}
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
    backgroundColor: Colors.dark.secondary,
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
    backgroundColor: Colors.dark.secondaryDark,
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  TextInputStyle: {
    backgroundColor: Colors.dark.primary,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});