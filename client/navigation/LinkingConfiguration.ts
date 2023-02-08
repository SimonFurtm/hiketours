/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {//all screens
      Root: { //main screens
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
              
            },
          },
          Search: {
            screens: {
              SearchScreen: 'search',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Routes: {
            screens: {
              RoutesScreen: 'routes',
            },
          },
          Info: {
            screens: {
              InfoScreen: 'info',
            },
          },
        },
      },
      Help: 'help', //sub screens
      NotFound: '*',
    },
  },
};

export default linking;
