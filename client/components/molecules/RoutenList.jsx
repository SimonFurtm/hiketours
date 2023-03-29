import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View
} from "react-native";

// customs
import { Text } from '../../components/atoms/Themed';
import Colors from '../../constants/Colors';

// Filter/Search
const List = ({ searchPhrase, setClicked, data, setVisible }) => {
  const renderItem = ({ item: listItem }) => {
    // when input is empty
    if (searchPhrase === "") {
      return (
        <TouchableOpacity style={styles.card} onPress={() => setVisible(true) & console.log(listItem.name + ": " + listItem.info)}>
          <Text style={styles.listTitle}>{listItem.name}</Text>
          <Text style={styles.list}>{listItem.info}</Text>
        </TouchableOpacity>
      );
    }
    // filter by name
    if (listItem.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return (
        <TouchableOpacity style={styles.card} onPress={() => setVisible(true) & console.log(listItem.name)}>
          <Text style={styles.listTitle}>{listItem.name}</Text>
          <Text style={styles.list}>{listItem.info}</Text>
        </TouchableOpacity>
      );    
    }
    // filter by info
    if (listItem.info.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return (
        <TouchableOpacity style={styles.card} onPress={() => setVisible(true) & console.log(listItem.name)}>
          <Text style={styles.listTitle}>{listItem.name}</Text>
          <Text style={styles.list}>{listItem.info}</Text>
        </TouchableOpacity>
      );    
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(data) => data._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    marginBottom: 15,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
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
});