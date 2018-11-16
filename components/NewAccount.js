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

import Toast from 'react-native-simple-toast'
import { TextInput } from 'react-native-gesture-handler';

const util = require('util');

const { width: WIDTH} = Dimensions.get('window')
export default class NewAccount extends Component {
    constructor() {
        super()
        this.state = {
          hidePass: true,
          press: false,
          email: '',
          password: '',
          fullName: ''
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
        if(field == 'email') {
            this.setState({
                email: text
            })
        } else if(field == 'password') {
            this.setState({
                password: text
            })
        } else if(field == 'fullName') {
            this.setState({
                fullName: text
            })
        }
    }

    createAccount() {
        /// TODO: check if valid format for email

        var url = 'https://racket-mate-agfsbfyiap.now.sh/api/v1/users/';
        var data = {
            password: this.state.password,
            email: this.state.email,
            fullName: this.state.fullName
        };
        var {navigate} = this.props.navigation;

        fetch(url, { 
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => {
            console.log(response);
            if(response.hasOwnProperty('token')) {
                console.log(response.token);

                Toast.show("Account created!", Toast.LONG);
                
                navigate("LoginScreen", null);
            }
            else {
                console.log(response.message);
                Toast.show(response.message, Toast.LONG);
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
                        <Image source={logo} style={styles.logo} />        
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.textFieldInput}>
                            <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.85)'}
                                style={styles.inputIcon} />
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'Full Name'}
                                    returnKeyType="next"
                                    onChangeText={(text)=>this.textChanged(text, 'fullName')}
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.emailInput.focus()}
                                    placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                                />
                        </View>

                        <View style={styles.textFieldInput}>
                            <Icon name={'ios-mail'} size={28} color={'rgba(255, 255, 255, 0.85)'}
                                style={styles.inputIcon} />
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder={'Email'}
                                    returnKeyType="next"
                                    keyboardType='email-address'
                                    autoCapitalize="none"
                                    onChangeText={(text)=>this.textChanged(text, 'email')}
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    ref={(input) => this.emailInput = input}
                                    placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                                />
                        </View>

                        <View style={styles.textFieldInput}>
                            <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.85)'}
                                style={styles.inputIcon} />
                            <TextInput 
                                style={styles.textInput}
                                placeholder={'Password'}
                                returnKeyType="go"
                                onChangeText={(text)=>this.textChanged(text, 'password')}
                                secureTextEntry={this.state.hidePass}
                                onSubmitEditing={() => this.createAccount()}
                                placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
                                ref={(input) => this.passwordInput = input}
                            />
                        
                        <TouchableOpacity style={styles.btnEye}
                            onPress={this.hidePass.bind(this)}>
                            <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.85)'} />
                        </TouchableOpacity>
                        </View>
                    </View>


                    <TouchableOpacity 
                        style={styles.btnCreate}
                        activeOpacity={0.6}
                        onPress={()=>this.createAccount()}>
                        <Text style={styles.text}>Create Account</Text>
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
    logo: {
        width: 220,
        height: 150,
        opacity: 0.9
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
    btnEye: {
        position: 'absolute',
        top: 5,
        right: 37
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
    }
    
});
