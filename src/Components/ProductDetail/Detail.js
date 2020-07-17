import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import {firebaseApp} from '../FirebaseConfig.js';
import global from '../global.js';


import Header from '../Header';

import icBack from '../../media/icon/icBackBlue.png';
import picSp from '../../media/img/sp1.jpg';

//Redux
import { connect } from 'react-redux';
import * as actions from '../../actions';


const { height, width } = Dimensions.get('window');


class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            price: 0,
            material: "",
            color: "",
            description: "",
            img: "empty",
            imgA: "empty"
        }
    }
    openMenu() {
        
        this.props.navigation.openDrawer();
    }

    addThisProductToCart() {
            this.props.counterIncrease(this.props.id);
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <Header openMenu={this.openMenu.bind(this)} />
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Shop')}
                        >
                            <Image source={icBack} style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>setTimeout(() => {
                                this.props.counterIncrease(this.props.id);
                            }, 3000)
                        }
                        >
                            <Ionicons name="md-cart" color='#2BD9C8' size={40} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Image source={{uri:this.state.img}} style={styles.img}/>
                        <Image source={{uri:this.state.imgA}} style={styles.img}/>
                    </View>
                    <View style={styles.title}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.name} /<Text style={{color: '#E4E4E4'}}> {this.state.price} VND</Text></Text>
                    </View>
                    <View style={styles.detail}>
                        <Text style={{color: 'gray'}}>{this.state.description}</Text>
                    </View>
                    <View style={styles.color}>
                        <TouchableOpacity>
                            <Text style={{color: 'pink', fontSize:20}}>Material {this.state.material}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <Text style={{color: 'pink', fontSize:20}}>Color {this.state.color}</Text>
                            <View style={{marginLeft: 10, backgroundColor: this.state.color, height: 25, width: 25, borderRadius: 25/2, borderColor: 'pink', borderWidth:1}}></View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount(){
        //const [loading, setLoading] = useState(true);
        const component=this;
        var db = firebaseApp.firestore();

        db.collection("Products").doc(this.props.id).get().then(function(doc) {
            if (doc.exists) {
                const { name } = doc.data();
                const { price } = doc.data();
                const { material } = doc.data();
                const { color } = doc.data();
                const { description } = doc.data();
                const { img } = doc.data();
                const { imgA } = doc.data();
                component.setState({
                    name: name,
                    price: price,
                    material: material,
                    color: color,
                    description: description,
                    img:img,
                    imgA:imgA
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        

        
}
}


const mapStateToProps = state => ({
    counter: state.counter
})


export default connect(mapStateToProps, actions)(Detail);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, 
        backgroundColor: 'white'
    },
    img: {
        width: width /2 -40, height: height /3,
        margin: 10
    },
    icon: {
        width: 25,
        height: 25
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        padding: 15
    },
    container: {
        margin: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        borderRadius: 10
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        paddingBottom: 20,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1.5
    },
    detail: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,

    },
    color: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 20
    }
});
