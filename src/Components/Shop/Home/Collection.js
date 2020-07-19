import React, {Component} from 'react';
import { View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import collectionBanner from '../../../media/img/collectionBanner.jpg'

const { width, height } = Dimensions.get('window');


export default class Collection extends Component {
    render(){
        return(
            <View style={styles.wrapper}>
                <View style={{flex: 1}}>
                    <Text style={styles.textStyle}>LOCK COLLECTION</Text>
                </View>
                <View style={{flex:4}}>
                    <Image source={collectionBanner} style={styles.imgSize}/>
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
        shadowColor: 'black',
        borderWidth: 0,
        borderRadius: 10,
        width: width - 20,
        padding: 10,
    },
    textStyle: {
        color: '#AFAEAF',
        fontSize: 20
    },
    imgSize: {
        width: imgWidth,
        height: imgHeight,
        borderRadius: 10
    }
})