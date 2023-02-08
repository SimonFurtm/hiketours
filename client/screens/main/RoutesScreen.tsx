import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import { Text, View } from '../../components/atoms/Themed';
import { RootTabScreenProps } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Search from "../../components/organism/Search";

export default function RoutesScreen({ navigation }: RootTabScreenProps<'Routes'>) {
  return(
    <View>
      <Search />
    </View>
  );
}
