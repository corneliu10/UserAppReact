import React from 'react';
import { 
  View
} from 'react-native';

import Splash from './components/Splash';
import Login from './components/Login';
import Games from './components/Games';
import NewAccount from './components/NewAccount';
import NewGame from './components/NewGame';

import { StackNavigator } from 'react-navigation'; 

const Navigation = StackNavigator({
  SplashScreen: { 
    screen: Splash,
    navigationOptions: {
      header: null
    },
  },
  LoginScreen: { 
    screen: Login,
    navigationOptions: {
      header: null
    },
  },
  GamesScreen: {
    screen: Games,
    navigationOptions: {
      header: null
    }
  },
  NewGameScreen: {
    screen: NewGame,
    navigationOptions: {
      header: null
    }
  },
  NewAccountScreen: {
    screen: NewAccount,
    navigationOptions: {
      header: null
    }
  },
});

export default Navigation;
