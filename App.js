import React from 'react';
import { 
  View
} from 'react-native';

import Splash from './components/Splash';
import Login from './components/Login';
import Games from './components/Games';

import { StackNavigator } from 'react-navigation'; 

const Navigation = StackNavigator({
  GamesScreen: {
    screen: Games,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: { 
    screen: Login,
    navigationOptions: {
      header: null
    },
  },
  SplashScreen: { 
    screen: Splash,
    navigationOptions: {
      header: null
    },
  }
});

export default Navigation;
