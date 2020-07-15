import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {firebaseApp} from '../FirebaseConfig.js';
import 'firebase/firestore';


export default class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={


            backgroundColorEmail: '#e9e9e9',
            textColorEmail: '#9a9a9a',
            borderColorEmail: '#e9e9e9',

            backgroundColorPass: '#e9e9e9',
            textColorPass: '#9a9a9a',
            borderColorPass: '#e9e9e9',

            email: '',
            password: ''
        };
    }

    onChangeEmail(textInput){
        console.log(textInput);
        this.setState({
            email: textInput
        });
        if(textInput == ""){
            this.setState({
                backgroundColorEmail: '#e9e9e9',
                textColorEmail: '#9a9a9a',
                borderColorEmail: '#e9e9e9',
            });
        }
        else{
            this.setState({
                backgroundColorEmail: 'white',
                textColorEmail: 'black',
                borderColorEmail: 'black',
            });
        }
        
    }

    onFocusEmail(){
        this.setState({
            backgroundColorEmail: 'white',
            textColorEmail: 'black',
            borderColorEmail: 'black',
        }); 
    }

    onBlurEmail(){
        if(this.state.email == '')
        {
            this.setState({
                backgroundColorEmail: '#e9e9e9',
                textColorEmail: '#9a9a9a',
                borderColorEmail: '#e9e9e9',
            })
        }
    }

    onFocusPass(){
        this.setState({
            backgroundColorPass: 'white',
            textColorPass: 'black',
            borderColorPass: 'black',
        }); 
    }

    onBlurPass(){
        if(this.state.password == '')
        {
            this.setState({
                backgroundColorPass: '#e9e9e9',
                textColorPass: '#9a9a9a',
                borderColorPass: '#e9e9e9',
            })
        }
    }

    onBlurSummit(){
        console.log("Hello")
        if(this.state.email != '' && this.state.password != '' && this.state.repassword != ''){
            this.setState({
                backgroundColorSummit: 'red',
                textColorSummit: 'white',
                borderColorSummit: 'white'
            })
        }else{
            this.setState({
                backgroundColorSummit: 'white',
                textColorSummit: 'black',
                borderColorSummit: 'black'
            })
        }
    }

    SignInClick(){
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            this.props.navigation.navigate('Main');
            this.setState({
                email: '',
                password: ''
            })
        })
        .catch(function(error) {
            Alert.alert(
                'Warning',
                'Fail to Login',
                [
                {
                    text: 'Error' + error,
                    onPress: () => console.log('Ask me later pressed')
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }); 
    }
    
    render(){
        return(
            <View style={styles.wrapper}>
                    <Text style={styles.head}>
                        Sign In
                    </Text>
                    <TextInput
                        style={[styles.textInput, {backgroundColor: this.state.backgroundColorEmail, color: this.state.textColorEmail, borderColor: this.state.borderColorEmail}]}
                        placeholder="EMAIL"
                        autoCompleteType="email"
                        onChangeText={email=>this.setState({email})}
                        onFocus={()=>this.onFocusEmail(this.key)}
                        onBlur={()=>this.onBlurEmail()}
                    />
                    <TextInput
                        style={[styles.textInput, {backgroundColor: this.state.backgroundColorPass, color: this.state.textColorPass, borderColor: this.state.borderColorPass}]}
                        placeholder="PASSWORD"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        onChangeText={password=>this.setState({password})}
                        onFocus={()=>this.onFocusPass()}
                        onBlur={()=>this.onBlurPass()}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.SignInClick() }
                    >
                        <Text style={{fontSize: 30, color: 'white'}}>➜</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('SignUp')}
                    >
                        <Text style={styles.text}>Can't Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('SignUp')}
                    >
                        <Text style={styles.text}>Create Account</Text>
                    </TouchableOpacity>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    head: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 50
        
    },

    text: {
        color: '#898989',
        fontWeight: 'bold'
    },

    border: {
        backgroundColor: 'white',
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        margin: 5,
        width: 300,
        padding: 20,
        borderRadius: 10,
        fontWeight: 'bold',
        margin: 10

    },
    button: {
        width: 100,
        height:100,
        borderRadius: 35,
        marginTop: 20,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: '#f54741',
        borderColor: 'black',
        marginTop: 50,
        marginBottom: 50
    }
})