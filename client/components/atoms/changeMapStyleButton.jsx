import {TouchableOpacity, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect, Fragment } from 'react';
import Map from '../organism/Map.jsx';
import MapView from 'react-native-maps';

function ChangeMapStyleButton() {

    const changeMapStyle = () => {
        mapRef.mapType="standard";
    }

    return(
        
      
        <TouchableOpacity
        style={styles.UIButtonView}
        onPress={changeMapStyle}
        >
            <AntDesign
            style={styles.locationButtonImage} 
            name="minuscircle"
            size={40}
            color="white"

            />
        </TouchableOpacity>
  
    )
}
const styles = {
    UIButtonView: {
        width: '15%',
        height: '10%',
        position: 'absolute',
        bottom: '10%',
        left: '5%',
     
        zIndex:2,
      },
    locationButtonImage: {
        width: '100%',
        height: '100%',
    
        zIndex:2,
      }
};

export default ChangeMapStyleButton;