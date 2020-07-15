import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {firebaseApp} from '../FirebaseConfig.js';


export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={


            backgroundColorEmail: '#e9e9e9',
            textColorEmail: '#9a9a9a',
            borderColorEmail: '#e9e9e9',

            backgroundColorPass: '#e9e9e9',
            textColorPass: '#9a9a9a',
            borderColorPass: '#e9e9e9',

            backgroundColorRepass: '#e9e9e9',
            textColorRepass: '#9a9a9a',
            borderColorRepass: '#e9e9e9',

            


            email: '',
            password: '',
            repassword: ''
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

    onFocusRepass(){
        this.setState({
            backgroundColorRepass: 'white',
            textColorRepass: 'black',
            borderColorRepass: 'black',
        }); 
    }

    onBlurRepass(){
        if(this.state.repassword == '')
        {
            this.setState({
                backgroundColorRepass: '#e9e9e9',
                textColorRepass: '#9a9a9a',
                borderColorRepass: '#e9e9e9',
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

    Register(){
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            Alert.alert(
                'Alert Title',
                'Register success' + this.state.email,
                [
                {
                    text: 'Ask me later',
                    onPress: () => console.log('Ask me later pressed')
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => this.props.navigation.navigate('SignIn') }
                ],
                { cancelable: false }
            );
            this.setState({
                email: '',
                password: '',
                repassword: ''
            })
        })
        .catch(function(error) {
            Alert.alert(
                'Warning',
                'Fail to register',
                [
                {
                    text:  error,
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
                        Sign Up
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
                    <TextInput
                        style={[styles.textInput, {backgroundColor: this.state.backgroundColorRepass, color: this.state.textColorRepass, borderColor: this.state.borderColorRepass}]}
                        placeholder="RE-ENTER YOUR PASSWORD"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        onChangeText={repassword=>this.setState({repassword})}
                        onFocus={()=>this.onFocusRepass()}
                        onBlur={()=>this.onBlurRepass()}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>this.Register()}
                    >
                        <Text style={{fontSize: 30, color: 'white'}}>➜</Text>
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
        fontWeight: 'bold'

    },
    button: {
        width: 100,
        height:100,
        borderRadius: 35,
        marginTop: 20,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: '#f54741',
        borderColor: 'black'
    }
})