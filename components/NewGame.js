import React, { Component } from 'react';
import { 
  Text, 
  View, 
  ImageBackground, 
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';

import bgImage from  '../images/futbol-sport-27097.jpg'
import logo from '../images/modernSpace.png'
import Icon from 'react-native-vector-icons/Ionicons'

//import Toast from 'react-native-simple-toast'
import { TextInput } from 'react-native-gesture-handler';

const util = require('util');

const { width: WIDTH} = Dimensions.get('window')
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            opponentName: '',
            score: '',
            address: ''
        }
    }
    
    hidePass = () => {
        if(this.state.press == false) {
            this.setState({ hidePass: false, press: true})
        } else {
            this.setState({ hidePass: true, press: false})
        }
    }

    textChanged(text, field) {
        if(field == 'opponentName') {
            this.setState({
                opponentName: text
            })
        } else if(field == 'score') {
            this.setState({
                score: text
            })
        } else if(field == 'address') {
            this.setState({
                address: text
            })
        }
    }

    createGame() {
        /// TODO: check if valid format for email

        var url = 'https://racket-mate-agfsbfyiap.now.sh/api/v1/users/';
        var data = {
            opponentName: this.state.opponentName,
            score: this.state.score,
            address: this.state.address
        };

        console.log(data);

        fetch(url, { 
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZTQ0MzAxMC1kYjU5LTRiMjAtYTMwMi1jYmM0MmUxNGU1ZGQiLCJpYXQiOjE1NDIxMzY3MTYsImV4cCI6MTU0Mjc0MTUxNn0.q7V1z5YR1uMCg-vJra0dL8On06yacSY_lFdyV2NUmkY',
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => {
            console.log(response);
            if(response.hasOwnProperty('token')) {
                console.log(response.token);

                //Toast.show("Account created!", Toast.LONG);
                
                navigate("Login", null);
            }
            else {
                console.log(response.message);
                //Toast.show(response.message, Toast.LONG);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.loginContainer} >
                <StatusBar
                    barStyle="light-content"
                />
                <ImageBackground  source={bgImage} style={styles.backgroundContainer}>
                    <View style={styles.logoContainer}>
                        <Image 
                            style={styles.imageContainer}
                            //TODO on click select photo from gallery
                            source={{ uri: "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png" }} />        
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.textFieldInput}>
                            <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.85)'}
                                style={styles.inputIcon} />
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'Opponent Name'}
                                    returnKeyType="next"
                                    onChangeText={(text)=>this.textChanged(text, 'opponentName')}
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.scoreInput.focus()}
                                    placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                                />
                        </View>

                        <View style={styles.textFieldInput}>
                            <Icon name={'ios-american-football'} size={28} color={'rgba(255, 255, 255, 0.85)'}
                                style={styles.inputIcon} />
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'Score'}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    onChangeText={(text)=>this.textChanged(text, 'score')}
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.addressInput.focus()}
                                    ref={(input) => this.scoreInput = input}
                                    placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                                />
                        </View>

                        <View style={styles.textFieldInput}>
                            <Icon name={'ios-pin'} size={28} color={'rgba(255, 255, 255, 0.85)'}
                                style={styles.inputIcon} />
                            <TextInput 
                                style={styles.textInput}
                                placeholder={'Address'}
                                returnKeyType="go"
                                onChangeText={(text)=>this.textChanged(text, 'address')}
                                onSubmitEditing={() => this.createGame()}
                                placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                                ref={(input) => this.addressInput = input}
                            />
                        
                        </View>
                    </View>


                    <TouchableOpacity 
                        style={styles.btnCreate}
                        activeOpacity={0.6}
                        onPress={()=>this.createGame()}>
                        <Text style={styles.text}>Create Game</Text>
                    </TouchableOpacity>

                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    logoContainer: {
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 25
    },
    textInput: {
        width: WIDTH - 100,
        height: 40,
        borderRadius: 25,
        fontSize: 20,
        paddingLeft: 38,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'rgba(0, 0, 0, 1.0)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 5,
        left: 37
    },
    textFieldInput: {
        marginTop: 10
    },
    btnCreate: {
        width: WIDTH - 100,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginTop: 15,
        marginHorizontal: 25,
        justifyContent: "center",
    },
    text: {
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    imageContainer: {
        width: 150,
        height: 150,
        margin: 5,
        marginBottom: 2
    },
    
});
