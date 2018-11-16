import React, { Component } from 'react';
import {
    View,
    ImageBackground, 
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';

import bgImage from '../images/futbol-sport-27097.jpg' 
import logoImage from '../images/modernSpace.png'

import { StackActions, NavigationActions } from 'react-navigation'

export default class Splash extends Component {

    async componentDidMount() {
        let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

        await wait(1000);
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        });

        await this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <StatusBar
                    barStyle="light-content"
                />
                <Image source={logoImage} style={styles.logoImage} />
            </ImageBackground>
        )

    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: 220,
        height: 150
    }
});