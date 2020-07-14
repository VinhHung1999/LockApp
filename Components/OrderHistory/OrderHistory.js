import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import icMenu from '../../media/icon/icMenu.png';
import { firebaseApp } from '../FirebaseConfig';


const { height } = Dimensions.get('window');
export default class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    openMenu() {
        this.props.navigation.openDrawer();
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
                    <Text style={styles.title}>Order History</Text>
                    <View style={{width: 25}}></View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("OrderDetail",{
                            orderId: item.id
                        })}
                    >
                        <View style={styles.list}>
                            <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                                <Text style={styles.txt}>Order id:</Text>
                                <Text style={{color:'#2BD9C8'}}>{item.id}</Text>
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                                <Text style={styles.txt}>OrderTime:</Text>
                                <Text style={{color:'pink'}}>{item.time}</Text>
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                                <Text style={styles.txt}>Status:</Text>
                                <Text style={{color:'#2BD9C8', fontWeight: 'bold'}}>{item.status}</Text>
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                                <Text style={styles.txt}>Total:</Text>
                                <Text style={{color:'pink', fontWeight: 'bold'}}>{item.total}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    }
                />
            </View>
        );
    }

    componentDidMount(){
        let items = [];

        const component=this;
        const db = firebaseApp.firestore();
        const user = firebaseApp.auth().currentUser;

        db.collection("Users").doc(user.uid).collection("Orders").get().then(function(querySnapshot) {
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
        color: 'white'
    },
    img: {
        width: 25, height: 25
    },
    imgList: {
        width: 90,
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
        margin: 10,
        height: 120,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    banner: {
        backgroundColor: '#2BD9C8',
        height: height / 12,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        color: 'white', fontSize: 20
    },
    txt: {
        color: '#AFAEAF',
    }
});
