import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../Header';
import Collection from './Home/Collection';
import Category from './Home/Category';
import Product from './Home/Product';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class Shop extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <View  style={styles.wrapper}>
                <Header navigation={this.props.navigation}/>
                <Product navigation={this.props.navigation} />
            </View>
        );
    }
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
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
