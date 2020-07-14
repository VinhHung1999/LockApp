import React, { useState } from 'react';
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
import { firebaseApp } from '../FirebaseConfig';


export function IsLogin(props){
        const [name, setName] = useState("Loading");
        const [email, setEmail] = useState("Loading");
        let user = firebaseApp.auth().currentUser;
        let db = firebaseApp.firestore();
        if(user){
            db.collection("Users").doc(user.uid).get().then(doc =>{
                if(doc.exists){
                    const { name } = doc.data();
                    const { email } =  doc.data();
                    setName(name);
                    setEmail(email);
                }
                else{
                    console.log("Loxiiii")
                }
            })
        }
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
                                <View style={styles.info}>
                                    <Title>{name}</Title>
                                    <Caption>{email}</Caption>
                                </View>
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
                                    name="history"
                                    color = {color}
                                    size = {size}
                                    />
                                )}
                                label = "Order History"
                                onPress = {() => {props.navigation.navigate("Order")}}
                            />
                            <DrawerItem 
                                icon= {({color,size})=>(
                                    <Icon
                                    name="account-outline"
                                    color = {color}
                                    size = {size}
                                    />
                                )}
                                label = "Profile"
                                onPress = {() => {props.navigation.navigate("Profile")}}
                            />
                        </Drawer.Section>
                        <Drawer.Section style = {styles.signOut}>
                            <DrawerItem 
                                icon= {({color,size})=>(
                                    <Icon
                                    name="exit-to-app"
                                    color = {color}
                                    size = {size}
                                    />
                                )}
                                label = "Signout"
                                onPress = {() => {
                                    firebaseApp.auth().signOut()
                                        .then(()=>{
                                            
                                        })
                                        .catch((error)=>{
                                            
                                        })
                                    }}
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