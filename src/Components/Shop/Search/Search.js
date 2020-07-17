import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Header from '../../Header'

import icBack from '../../../media/icon/icBack.png'
import picSp from '../../../media/img/sp1.jpg'

//redux
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keys: "",
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
    openMenu() {
        this.props.navigation.navigate("Cart");
    }

    handleIncrease = () => {
        this.props.counterIncrease();
    }


    handleDecrease = () => {
        this.props.counterDecrease();
    }


    render() {
        return (
            <View style={styles.wrapper}>
                {/* <Header openMenu={this.openMenu.bind(this)} navigation={this.props.navigation} />
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => 
                    <View style={styles.list}>
                        <Image source={item.img} style={styles.imgList}/>
                        <View style={{justifyContent: 'space-between', paddingLeft: 20}}>
                            <Text style={styles.textName}>{item.name}</Text>
                            <Text style={styles.textPrice}>{item.price}</Text>
                            <Text>Material {item.material}</Text>
                            <View style={styles.detailInfo}>  
                                <Text>Color {item.color}</Text>
                                <View style={{backgroundColor: 'pink', height: 16, width: 16, borderRadius: 8, marginLeft: 5}} />
                                <TouchableOpacity 
                                    style={styles.detailBtn}
                                    onPress={()=>this.props.navigation.navigate('Detail')}
                                >
                                    <Text style={styles.textBtn}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    }
                /> */}
                <TouchableOpacity
                    onPress={()=>this.handleIncrease()}
                >
                    <Text style={{fontSize: 20}}>Cong</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {()=>this.handleDecrease()}
                >
                    <Text style={{fontSize: 20}}>Tru</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>{this.props.counter}</Text>
                </View>
        );
    }
}

const mapStateToProps = state => ({
    counter: state.counter
})


export default connect(mapStateToProps, actions)(Search);

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
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
    },
    container: {
        margin: 10,
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
    textName: {
        fontSize: 20, color:'#AFAEAF'
    },
    textPrice: {
        color:'#FF1FA3', fontWeight:'bold'
    },
    detailInfo: {
        flexDirection: 'row',
    },
    detailBtn: {
        
    },
    textBtn: {
        color: '#FF1FA3',
        paddingLeft: 25
    }
});
