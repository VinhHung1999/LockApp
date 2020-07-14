import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Header';
import Collection from './Home/Collection';
import Category from './Home/Category';
import Product from './Home/Product';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class Shop extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    openMenu() {
        this.props.navigation.openDrawer();
    }
    render() {
        return (
            <View  style={styles.wrapper}>
                <Header openMenu={this.openMenu.bind(this)} />
                <Product navigation={this.props.navigation}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#EAEAEA"
    },
    text: {
        color: 'red'
    }
});
