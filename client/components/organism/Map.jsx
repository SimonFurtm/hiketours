import React, { useState, useEffect, Fragment } from 'react';
import MapView, { Geojson } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';



export default function Map() {

  const mapRef = React.createRef()
  const [mapStyle, setMapStyle] = React.useState("hybrid");
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [currGeojson, setCurrGeojson] = useState("");
  const [customRoute, setCustomRoute] = useState([]);
  const [isTracking, setIsTracking] = useState(false);

  const Bischofshofen = {
    latitude: 47.41545773037797,
    longitude: 13.218184887894393,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
  };

  const [location, setLocation] = useState(null);

  const [routes, setRoute] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (isTracking) {
        const watchId = Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1
        }, location => {
          setCustomRoute(customRoute => [...customRoute, location.coords]);
        }
        );
        return () => Location.clearWatch(watchId);
      }

      getRoutes();
    })();
    return
  }, [isTracking]);



  //fetch DB Data
  async function getRoutes() {
    console.log("Fetching routes from server...");
    const response = await fetch(`https://zk2ezn.deta.dev/api/allroutes`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      console.log("Fetched routes:", data);
      setRoute(data);
    } else {
      console.error("Received non-array data from server:", data);
    }
  }


  function moveToLocation() {
    if (location != null) {
      console.log("moving to location");
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00005,
        longitudeDelta: 0.00005
      })
    }
  }

  function handleGeoJsonPress(event) {
    setCurrGeojson(event);
    console.log(currGeojson.name);
    setModalVisible(true);
  };

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

  const trackUserRoute = () => {
    setIsTracking(!isTracking);
    console.log(isTracking);
    moveToLocation();

  }

  const StartRoute = () => {
    setModalVisible(false);
    moveToLocation();
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
              onPress={StartRoute}
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

      {/*I woas immano ned wos des mocht Simon*/}
      <TouchableOpacity style={[styles.RouteStyleButtonView]} onPress={trackUserRoute}>
        <AntDesign
          style={styles.locationButtonImage}
          name="forward"
          size={40}
          color="white"
        />
      </TouchableOpacity>

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

      <MapView style={styles.map}
        showsUserLocation={true}
        ref={mapRef}
        mapType={mapStyle}
        region={Bischofshofen}
        provider="google"
        showsPointsOfInterest={false}
      //onUserLocationChange={setCustomRoute()}
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
          geojson={{
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
          }}
          strokeColor="blue"
            strokeWidth={2}
        />
        )}

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

});