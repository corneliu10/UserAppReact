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
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import bgImage from '../images/futbol-sport-27097.jpg'

import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')

export default class Games extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            isLoading: true,
        }

        token = ''
    }

    reloadGames() {
        var url = 'https://racket-mate-agfsbfyiap.now.sh/api/v1/game/';

        fetch(url, {
            method: 'GET',
            headers: {
                // TODO: change to token
                'x-access-token': this.token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    dataSource: response.rows,
                    isLoading: false
                })
            })
            .catch(error => console.error('Error: ', error));
    }

    componentDidMount() {
        var { params } = this.props.navigation.state;

        this.token = params.token;

        console.log("token: " + this.token);

        this.reloadGames();
    }

    renderItem = ({ item }) => {
        var score = '';
        for (let i in item.score) {
            score = score + " " + item.score[i];
        }
        const addressText = <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'orange' }}>
                                Address: {item.address}
                            </Text>

        return (
            <View style={styles.itemContainer}>
                <Image
                    style={styles.imageContainer}
                    source={{ uri: item.opponent_avatar ? item.opponent_avatar : "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png" }} />
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'lightblue', marginBottom: 10 }}>
                        Name: {item.opponent_name}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'lightgreen', marginBottom: 10 }}>
                        Score: {score}
                    </Text>
                    { item.address != '' ? addressText : <Text></Text>}
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{ height: 3, width: '100%', backgroundColor: 'orange' }}>
            </View>
        )
    }

    render() {
        return (
            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                    <StatusBar
                        barStyle="light-content"
                    />
                    <ScrollView>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </ScrollView>
                    <View style={{ alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 0 }} >
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => {
                                var { navigate } = this.props.navigation;
                                var { params } = this.props.navigation.state;
                                navigate("NewGameScreen", { token: params.token });

                                this.props.navigation.addListener('didFocus', () => {
                                    this.reloadGames();
                                });
                            }}
                        >
                            <Icon name={"md-add"} size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
    },
    addBtn: {
        borderWidth: 1,
        borderColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        margin: 8,
        backgroundColor: 'orange',
        borderRadius: 100,
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