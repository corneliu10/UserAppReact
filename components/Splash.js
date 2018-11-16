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

export default class Splash extends Component {
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