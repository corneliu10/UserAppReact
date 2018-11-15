import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    StatusBar,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator
} from 'react-native';

import bgImage from '../images/futbol-sport-27097.jpg'

const { width: WIDTH } = Dimensions.get('window')
export default class Splash extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }

    componentDidMount() {
        var { params } = this.props.navigation.state;
        var url = 'https://racket-mate-agfsbfyiap.now.sh/api/v1/game/';

        fetch(url, {
            method: 'GET',
            headers: {
                // TODO: change to token
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZTQ0MzAxMC1kYjU5LTRiMjAtYTMwMi1jYmM0MmUxNGU1ZGQiLCJpYXQiOjE1NDIxMzY3MTYsImV4cCI6MTU0Mjc0MTUxNn0.q7V1z5YR1uMCg-vJra0dL8On06yacSY_lFdyV2NUmkY'
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response.rows);
                this.setState({
                    dataSource: response.rows,
                    isLoading: false
                })
            })
            .catch(error => console.error('Error: ', error));
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image 
                    style={styles.imageContainer}
                    source={{ uri: item.opponent_avatar ? item.opponent_avatar : "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png" }} />
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFCF9E', marginBottom: 10 }}>
                        {item.opponent_name}
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'lightblue' }}>
                        {item.address}
                    </Text>
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        retunr (
            <View
                style={{ height: 1, width: '100%', backgroundColor: 'black' }}>

            </View>
        )
    }

    render() {
        return (
            this.state.isLoading
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen'}}>
                <ActivityIndicator size="large" color= "#330066" animating />
            </View>
            :
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <StatusBar
                    barStyle="light-content"
                />

                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3,
        marginTop: 3
    },
    imageContainer: {
        width: 100,
        height: 100,
        margin: 5
    },
    textContainer: {
        flex: 1, 
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    }

});