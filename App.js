import React from 'react';
import { 
  View
} from 'react-native';

import Splash from './components/Splash';
import Login from './components/Login';
import Games from './components/Games';
import NewAccount from './components/NewAccount'

import { StackNavigator } from 'react-navigation'; 

const Navigation = StackNavigator({
  LoginScreen: { 
    screen: Login,
    navigationOptions: {
      header: null
    },
  },
  NewAccountScreen: {
    screen: NewAccount,
    navigationOptions: {
      header: null
    }
  },
  GamesScreen: {
    screen: Games,
    navigationOptions: {
      header: null
    }
  },
  SplashScreen: { 
    screen: Splash,
    navigationOptions: {
      header: null
    },
  }
});

export default Navigation;
