import React, {Component} from 'react';
import { View, Text, Image, Dimensions, StyleSheet, FlatList } from 'react-native';
import collectionBanner from '../../../media/img/collectionBanner.jpg'
import sp1 from '../../../media/img/sp1.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../../FirebaseConfig.js';

import Collection from './Collection';
import Category from './Category';



export default class Product extends Component {
    _isMounted=false;
    constructor(props){
        super(props);
        this.state = {
            data:[],
        }
    }
    render(){
        const { wrapper, titleContainer, title, body, productContainer, productImage, productName, productPrice } = styles;
        return(
            <View style={wrapper}>
                
                <FlatList
                        ListHeaderComponent={
                            <>
                                <Collection navigation={this.props.navigation}/>
                                <Category navigation={this.props.navigation}/>
                                <View style={titleContainer}>
                                    <Text style={title}>TOP PRODUCT</Text>
                                </View>
                            </>
                        }
                        nestedScrollEnabled={true}
                        style={styles.body}
                        data={this.state.data}
                        numColumns={2}
                        renderItem={({item}) => 
                            <TouchableOpacity 
                                style={productContainer}
                                onPress={()=>this.props.navigation.navigate('Detail', {
                                    id:item.id
                                })}>
                                <Image source={{uri: item.img}} style={productImage}></Image>
                                <Text style={productName}>{item.name}</Text>
                                <Text style={productPrice}>{item.price}VND</Text>
                            </TouchableOpacity>
                    }
                /> 
            </View>
        )
    }
    componentDidMount(){
        this._isMounted = true;
        const items=[];
        //const [loading, setLoading] = useState(true);
        const component=this;
        var db = firebaseApp.firestore();
        var storage = firebaseApp.storage();
        
        db.collection("Products").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                items.push(doc.data());
                
            });
            component.setState({
                data:items
            })
        });
        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}


const { width } = Dimensions.get('window');
const productWidth = (width -50) / 2;
const productImageHeight= (productWidth / 450) * 675;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: 10,
        borderWidth: 0

    },
    titleContainer: {
        justifyContent: "center",
        backgroundColor: 'white',
        height: 50,
        padding: 10,
        borderRadius: 10,
        width: width -20
    },
    title: {
        color: '#AFAEAF',
        fontSize: 20

    },
    body: {
        backgroundColor: "#EAEAEA",
        flexWrap: 'wrap',
        paddingBottom: 15,
        borderRadius:10
    },
    productContainer:{
        width: width/2 -20,
        paddingBottom: 20,
        paddingTop: 10,
        paddingLeft: 10,
        borderWidth: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5

    },
    productImage: {
        width: productWidth - 20,
        height: productImageHeight - 20,
    },
    productPrice: {
        paddingLeft: 10,
        color: 'purple'
    },
    productName: {
        paddingLeft: 10,
        
        color: '#AFAEAF'
    }
});