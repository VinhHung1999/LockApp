import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignIn from './SignIn';

export default class Authentication extends Component {
    render() {
        return (
            <SignIn />
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
});
