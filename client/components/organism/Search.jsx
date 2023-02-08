// Home.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Modal
} from "react-native";
import { View } from "../atoms/Themed";
import List from "../atoms/RoutenList";
import SearchBar from "../atoms/SearchBar";

const InfoScreen = (visible, setVisible) => {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Weg Info!</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text> Hide Modal </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

};

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  // get data from api endpoint
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://zk2ezn.deta.dev/api/allroutes"
      );
      const data = await apiResponse.json();
      setData(data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />    
      
        <List
          searchPhrase={searchPhrase}
          data={data}
          setClicked={setClicked}
          setVisible={setVisible}
        />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 1,
    width: '100%',
    alignSelf: 'center',

    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  },
});