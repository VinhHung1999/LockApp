import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Text,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch,
    IconButton
} from 'react-native-paper';

import porfilePic from '../../media/img/profile.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'


export function NotLogin(props){
        return (
            <DrawerContentScrollView { ... props} style ={{flex:1}}>
                <View style={{flex: 1}}>
                        <View style = {styles.container}>
                            <View style={styles.userInfo}>
                                <Avatar.Image
                                    source={porfilePic}
                                    size= {150}
                                    style ={{marginTop: 60, marginLeft: 70}}
                                />
                            </View>
                        </View>
    
                        <Drawer.Section style={{paddingTop: 50}}>
                            <DrawerItem 
                                icon= {({color,size})=>(
                                    <Icon
                                    name="home-outline"
                                    color = {color}
                                    size = {size}
                                    />
                                )}
                                label = "Home"
                                onPress = {() => {props.navigation.navigate("Home")}}
                            />
                            <DrawerItem 
                                icon= {({color,size})=>(
                                    <Icon
                                    name="login"
                                    color = {color}
                                    size = {size}
                                    />
                                )}
                                label = "Sign In"
                                onPress = {() => {props.navigation.navigate("SignIn")}}
                            />
                            <DrawerItem 
                                icon= {({color,size})=>(
                                    <Icon
                                    name="registered-trademark"
                                    color = {color}
                                    size = {size}
                                    />
                                )}
                                label = "Sign Up"
                                onPress = {() => {props.navigation.navigate("SignUp")}}
                            />
                        </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        )
}

const styles = StyleSheet.create({
    container: {
        
    },
    userInfo: {

    },
    info: {
        justifyContent : 'center',
        alignItems: "center"
    },
    signOut: {
        marginTop: 300
    }
})