import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import icMenu from '../media/icon/icMenu.png';
import icLock from '../media/icon/lock.png';

const { height } = Dimensions.get('window');

export default class Header extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.row1}>
                    <TouchableOpacity
                    onPress={this.props.openMenu}
                    >
                        <Image 
                            source={icMenu}
                            style={styles.img}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Security Lock</Text>
                    <TouchableOpacity>
                        <Image 
                            source={icLock}
                            style={styles.img}
                        />
                    </TouchableOpacity>
                </View>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="What do you want to buy ?"
                    onBlur={()=>this.props.navigation.navigate("Search")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { height: height / 8, backgroundColor: '#2BD9C8' , padding: 10 },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: { height: height / 23, backgroundColor: 'white', marginTop: 10, paddingLeft: 10 },
    img: { width: 25, height: 25 },
    title: { color: 'white', fontSize: 20 }
});
