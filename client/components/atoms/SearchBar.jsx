// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import Colors from '../../constants/Colors';


const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <TouchableOpacity onPress={() => { setSearchPhrase(""); Keyboard.dismiss(); setClicked(false);}}>
            <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: Colors.dark.primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchBar__clicked: {
    //marginTop: 30,
    padding: 10,
    flexDirection: "row",
    backgroundColor: Colors.dark.primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});