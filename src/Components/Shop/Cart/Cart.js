import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, RefreshControl, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {firebaseApp} from '../../FirebaseConfig.js';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import Header from '../../Header';



//Redux
import { connect } from 'react-redux';
import * as actions from '../../../actions';



class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing:false,
            total: 0
        }
    }
    openMenu() {
        this.props.navigation.openDrawer();
    }

    // Load new Data to cart
    loadNewData(){
        
        let total= 0;
        for(var i = 0; i<this.props.counter.length;i++){
            total+=this.props.counter[i].price*this.props.counter[i].size;
        }

        this.setState({
            total: total
        })
    }


    //generate ID
    generateID(){
        return '_' + Math.random().toString(36).substr(2, 9);
    }


    //get Date
    todate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        return today;
    }

    //Send order to the shop
    makeOrder(){
        const ID = this.generateID();
        const db = firebaseApp.firestore();
        const user = firebaseApp.auth().currentUser;
        if(this.props.counter.length==0){
            Alert.alert(
                'Announcement',
                'Empty Cart !!',
                [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Shop')}
                ],
                { cancelable: false }
            )
        }
        else if(user==null){
            Alert.alert(
                'Announcement',
                'You must Login First !!',
                [
                { text: 'OK', onPress: () => this.props.navigation.navigate('SignIn')}
                ],
                { cancelable: false }
            )
        }
        else
        {
            this.props.counter.map(product => {
                db.collection("Users").doc(user.uid).collection("Orders").doc(ID).collection("OrderDetails").doc(product.id).set({
                    size: product.size,
                    id: product.id,
                    img: product.img,
                    price: product.price
                });
            });

            const today = this.todate();
            db.collection("Users").doc(user.uid).collection("Orders").doc(ID).set({
                time: today,
                status: "pending",
                total: this.state.total,
                id: ID
            });


            //clear store
            this.props.counterClear();

            this.setState({
                total: 0
            },()=>Alert.alert(
                    'Announcement',
                    'Order Successfully !!',
                    [
                    { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            )
        }
        

    }

    calTotal(){
        let total= 0;
        if(this.props.counter.length>0)
        {
            for(var i = 0; i<this.props.counter.length;i++){
                total+=this.props.counter[i].price*this.props.counter[i].size;
            }
        }
        else return 0;
        

        return total;
    }

    deleteItem(id){
        this.props.counterDelete(id);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Header navigation={this.props.navigation} />
                <FlatList
                    data={this.props.counter}
                    renderItem={({item}) => 
                    <View 
                        style={styles.list}
                        
                    >
                        <Image source={{uri: item.img}} style={styles.imgList}/>
                        <View style={{justifyContent: 'space-between', paddingLeft: 10}}>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Detail',{
                                    id: item.id
                                })}
                            >
                                <Text style={styles.textName}>{item.name}</Text>
                            </TouchableOpacity>
                            <Text style={styles.textPrice}>{item.price} $</Text>
                            <View style={styles.detailInfo}>  
                                <TouchableOpacity
                                    onPress={()=>this.props.counterDecrease(item.id)}
                                >
                                    <View style={{backgroundColor: '#2BD9C8', width: 25, height: 25, borderRadius: 12.5, alignItems:'center', justifyContent: "center" }}>
                                        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>-</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{fontSize: 20, fontWeight:'bold'}}>{item.size}</Text>
                                <TouchableOpacity
                                    onPress={()=>this.props.counterIncrease(item.id)}
                                >
                                    <View style={{backgroundColor: '#2BD9C8', width: 25, height: 25, borderRadius: 12.5, alignItems:'center', justifyContent: "center" }}>
                                        <Text style={{color: 'white', fontSize: 20}}>+</Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.counterDelete(item.id)}
                        >
                            <Ionicons name="ios-close-circle" size= {25} color='red'/>
                        </TouchableOpacity>

                    </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.loadNewData.bind(this)}
                        />
                    }
                />
                <TouchableOpacity style={styles.banner}
                    onPress={()=>this.makeOrder()}
                >
                    <Text style={{fontSize: 20, color: 'white'}}>TOTAL {this.calTotal()} $ CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const mapStateToProp = state => ({
    counter: state.counter
})

export default connect(mapStateToProp, actions)(Cart);

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
        margin: 5,
        paddingTop: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    textName: {
        fontSize: 20, color:'#AFAEAF',
        fontWeight: 'bold'
    },
    textPrice: {
        color:'#FF1FA3', fontWeight:'bold', fontSize: 20
    },
    detailInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: -15,
        paddingRight: 70
    },
    detailBtn: {
        
    },
    textBtn: {
        color: '#FF1FA3'
    },
    banner: {
        backgroundColor: '#2BD9C8',
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10
    },
});


// AsyncStorage.getItem('cartArray')
        // .then(req => JSON.parse(req))
        // .then(json => {
        //     json.map(product => {
        //         db.collection("Products").doc(product).get().then(doc => {
        //             items.push(doc.data());
        //             component.setState({
        //                 data:items
        //             })
        //         })
        //     })
        
        // })
        // .catch(error => console.log('error!'));