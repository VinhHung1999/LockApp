import React, {Component} from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
import collectionBanner from '../../../media/img/collectionBanner.jpg'
import Collection from './Collection';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');


export default class Category extends Component {
    render(){
        return(
            <View style={styles.wrapper}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={styles.text}>LOCK CATEGORY</Text>
                </View> 
                <View style={{flex: 8}}>
                    <Swiper style= {styles.swiper}>
                        <TouchableOpacity
                            onPress = { () => this.props.navigation.navigate('ListProduct', {
                                    type: 'SmartLock'
                                })
                            }
                        >
                            
                            <ImageBackground source={collectionBanner} style={styles.imgSize} imageStyle={{borderRadius: 10}}>
                                <Text style={styles.text}>SMART LOCK</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = { () => this.props.navigation.navigate('ListProduct', {
                                    type: 'CardLock'
                                })
                            }
                        >
                            <ImageBackground source={collectionBanner} style={styles.imgSize} imageStyle={{borderRadius: 10}}>
                                <Text style={styles.text}>CARD LOCK</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = { () => this.props.navigation.navigate('ListProduct', {
                                    type: 'SimpleLock'
                                })
                            }
                        >
                            <ImageBackground source={collectionBanner} style={styles.imgSize} imageStyle={{borderRadius: 10}}>
                                <Text style={styles.text}>SIMPLE LOCK</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Swiper>
                </View>
            </View>
        )
    }
}

const imgWidth = width-40;
const imgHeight = (imgWidth / 933) * 465;


const styles = StyleSheet.create({
    wrapper: {
        height: height * 0.3,
        backgroundColor: 'white',
        borderRadius: 10,
        width: width - 20,
        marginTop: 10,
        marginBottom: 10,
        padding: 10
    },
    text: {
        color:'#AFAEAF',
        fontSize: 20
    },
    imgSize: {
        width: imgWidth,
        height: imgHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    swiper: {
        paddingTop: 20,
        
    }
})