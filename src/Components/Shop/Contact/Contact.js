import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import Header from '../../Header'

import icBack from '../../../media/icon/icBack.png'
import picSp from '../../../media/img/sp1.jpg'
import picMap from '../../../media/img/map.png'

const { height, width } = Dimensions.get('window');

export default class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                {
                    id: '1',
                    name: 'Lace Sleeve Si',
                    price: '117$',
                    material: 'silk',
                    color:  'RoyalBlue',
                    img: picSp
                },
                {
                    id: '2',
                    name: 'Lace Sleeve Si',
                    price: '117$',
                    material: 'silk',
                    color:  'RoyalBlue',
                    img: picSp
                },
                {
                    id: '3',
                    name: 'Lace Sleeve Si',
                    price: '117$',
                    material: 'silk',
                    color:  'RoyalBlue',
                    img: picSp
                },
                {
                    id: '4',
                    name: 'Lace Sleeve Si',
                    price: '117$',
                    material: 'silk',
                    color:  'RoyalBlue',
                    img: picSp
                },
                {
                    id: '5',
                    name: 'Lace Sleeve Si',
                    price: '117$',
                    material: 'silk',
                    color:  'RoyalBlue',
                    img: picSp
                },
                {
                    id: '6',
                    name: 'Lace Sleeve Si',
                    price: '117$',
                    material: 'silk',
                    color:  'RoyalBlue',
                    img: picSp
                }
            ]
        }
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} />
                <View style={styles.list}>
                    <Image source={picMap} style={{width: width - 40, height: height /3}}/>
                    
                </View>
                <View style={styles.contact}>
                    <View style={styles.contactItem}>
                        <Ionicons name="md-flag" color='#2BD9C8' size={40} />
                        <Text style={{color: '#FF0070'}}>97 Ky Con, Nguyen Thai Binh, Quan 1, TP HCM</Text>
                    </View>
                    <View style={styles.contactItem}>
                    <Ionicons name="md-phone-portrait" color='#2BD9C8' size={40} />
                        <Text style={{color: '#FF0070'}}>(+84) 0908144880</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Ionicons name="md-flag" color='#2BD9C8' size={40} />
                        <Text style={{color: '#FF0070'}}>phuvinhhung1999@gmail.com</Text>
                    </View>
                    <View style={styles.contactLastItem}>
                        <Ionicons name="md-mail" color='#2BD9C8' size={40} />
                        <Text style={{color: '#FF0070'}}>(+84) 0908144880</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        color: 'white',
        backgroundColor: "#EAEAEA"
    },

    list: {
        flexDirection: 'row',
        margin: 10,
        paddingTop: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    contact: {
        margin: 10,
        paddingTop: 20,
        backgroundColor: 'white',
        
        padding: 10,
        borderRadius: 10
    },
    contactItem: {
        flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1.5, paddingBottom: 20, paddingTop: 20
    },
    contactLastItem: {
        flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingBottom: 20, paddingTop: 20
    }
});
