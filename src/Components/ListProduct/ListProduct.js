import React, { Component, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {firebaseApp} from '../FirebaseConfig.js';

import Header from '../Header'

import icBack from '../../media/icon/icBackBlue.png'


export default class ListProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Shop')}
                        >
                            <Image source={icBack} style={styles.img}/>
                        </TouchableOpacity>
                        
                        <Text style={styles.textHeader}>{this.props.type}</Text>
                        <View style={{width: 30}} />
                    </View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => 
                        <TouchableOpacity 
                            style={styles.list}
                            onPress={()=>this.props.navigation.navigate('Detail',{
                                id:item.id
                            })}
                        >
                            <Image source={{uri: item.img}} style={styles.imgList}/>
                            <View style={{justifyContent: 'space-between', paddingLeft: 20}}>
                                <Text style={styles.textName}>{item.name}</Text>
                                <Text style={styles.textPrice}>{item.price}</Text>
                                <Text>Material {item.material}</Text>
                                <View style={styles.detailInfo}>  
                                    <Text>Color {item.color}</Text>
                                    <View style={{backgroundColor: item.color, height: 16, width: 16, borderRadius: 8, marginLeft: 10}} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        );
    }

    componentDidMount(){
        const items=[];
        //const [loading, setLoading] = useState(true);
        const component=this;
        var db = firebaseApp.firestore();
        var storage = firebaseApp.storage();
        
        db.collection("Products").where("type" ,"==", this.props.type).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                items.push(doc.data());
                
            });
            component.setState({
                data:items
            })
        });
        
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, 
        backgroundColor: "#EAEAEA"
    },
    img: {
        width: 25, height: 25
    },
    imgList: {
        width: 90,
        height: (90*452)/361
    },
    textHeader: {
        color: '#2BD9C8',
        fontSize: 20,
        fontWeight: 'bold'
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        padding: 10
    },
    container: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    list: {
        borderTopWidth: 1,
        flexDirection: 'row',
        margin: 10,
        paddingTop: 20,
        borderTopColor: '#E4E4E4'
    },
    textName: {
        fontSize: 20, color:'#AFAEAF'
    },
    textPrice: {
        color:'#2BD9C8', fontWeight:'bold'
    },
    detailInfo: {
        flexDirection: 'row',
    },
    detailBtn: {
    },
    textBtn: {
        color: '#2BD9C8'
    }
});
