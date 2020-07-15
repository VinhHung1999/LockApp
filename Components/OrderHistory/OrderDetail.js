import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, AsyncStorage, RefreshControl } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import icMenu from '../../media/icon/icMenu.png';

import {firebaseApp} from '../FirebaseConfig.js';

export default class OrderDetails extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            data:[],
            total: 0
        }
    }
    
    
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.banner}>
                    <TouchableOpacity
                    onPress={this.props.navigation.openDrawer}
                    >
                        <Image 
                            source={icMenu}
                            style={styles.img}
                        />
                    </TouchableOpacity>
                    <Text style = {styles.title}>Order Detail</Text>
                    <View style={{width: 25}}></View>
                    
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                    <View style={styles.list}>
                        <Image source={{uri: item.img}} style={styles.imgList}/>
                        <View style={{justifyContent: 'space-between', paddingLeft: 20, width: 240}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.textName}>{item.id}</Text>
                                
                            </View>
                            <Text style={styles.textPrice}>{item.price} VND</Text>
                            <View style={styles.detailInfo}>  
                                
                                <Text style={{color: '#AFAEAF', fontWeight: 'bold'}}>Amount: {item.size}</Text>
                                
                                <TouchableOpacity 
                                    style={styles.detailBtn}
                                    onPress={()=>this.props.navigation.navigate('Detail',{
                                        id: item.id
                                    })}
                                >
                                    <Text style={styles.textBtn}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    }
                />
                <View style={styles.totalPrice}
                    onPress={()=>this.makeOrder()}
                >
                    <Text style={{fontSize: 20, color: 'white'}}>TOTAL {this.state.total} VND</Text>
                </View>
            </View>
        );
    }
    componentDidMount(){
        let items = [];

        const component=this;
        const db = firebaseApp.firestore();
        const user = firebaseApp.auth().currentUser;
        
        db.collection("Users").doc(user.uid).collection("Orders").doc(this.props.orderId).collection("OrderDetails").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                items.push(doc.data());
                
            });
            component.setState({
                data:items
            });
            //Sum total cost
            let total= 0;
            for(var i = 0; i<items.length;i++){
                total+=items[i].price*items[i].size;
            }

            component.setState({
                total: total
            })
        });

    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        color: 'white',
        backgroundColor: "#EAEAEA"
    },
    img: {
        width: 25, height: 25
    },
    imgList: {
        width: 100,
        height: (90*452)/361
    },
    textBtn: {
        color: '#FF1FA3'
    },
    textHeader: {
        color: '#FF1FA3',
        fontSize: 20
    },
    container: {
        margin: 10,
        backgroundColor: 'white'
    },
    list: {
        flexDirection: 'row',
        margin: 10,
        paddingTop: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    textName: {
        fontSize: 20, color:'#AFAEAF'
    },
    textPrice: {
        color:'#FF1FA3', fontWeight:'bold', fontSize: 20
    },
    detailInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    banner: {
        backgroundColor: '#2BD9C8',
        height: 50,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 20,
        color: 'white'
    },
    totalPrice: {
        backgroundColor: '#2BD9C8',
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10
    }
});
