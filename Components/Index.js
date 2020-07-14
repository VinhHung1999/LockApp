import React, { Component, useState } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import global from './global';
import Authentication from './Authentication/Authentication';
import OrderHistory from './OrderHistory/OrderHistory';
import OrderDetail from './OrderHistory/OrderDetail';
import ChangeInfo from './ChangeInfo/ChangeInfo';



import Shop from './Shop/Shop';
import Cart from './Shop/Cart/Cart';
import Contact from './Shop/Contact/Contact';
import Search from './Shop/Search/Search';

import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';

import Detail from './ProductDetail/Detail';
import ListProduct from './ListProduct/ListProduct';


import { IsLogin } from './DrawerContent/IsLogin';
import { NotLogin } from './DrawerContent/NotLogin';

import {firebaseApp} from './FirebaseConfig.js';





StatusBar.setHidden(true);

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProductStack = createStackNavigator();
const CartStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const OrderStack = createStackNavigator();




export default class Index extends Component {
    _isMounted=false;
    constructor(props){
        super(props);
        this.state = {
            isSingedIn: false,
            cartArray: []
        };
        global.addProductToCart= this.addProductToCart.bind(this);
        global.clearCart = this.clearCart.bind(this);
        global.cartGlobal = this.state.cartArray;
    }

    render() {
        
        return (
            <NavigationContainer>
                { this.state.isSingedIn ? (
                    <Drawer.Navigator initialRouteName="Main" drawerContent = { props => <IsLogin { ... props} />}>
                        <Drawer.Screen name="Main" component={createHomeStack} />
                        <Drawer.Screen name="Profile" component={Profile} />
                        <Drawer.Screen name="Order" component={createOrderStack} />
                </Drawer.Navigator>
                ) : (
                    <Drawer.Navigator initialRouteName="Main" drawerContent = { props => <NotLogin { ... props} />}>
                        <Drawer.Screen name="Main" component={createHomeStack} />
                        <Drawer.Screen name="SignInDrawer" component={SignInScreen} />
                        <Drawer.Screen name="SignUpDrawer" component={SignUpScreen} />
                </Drawer.Navigator>
                )}
                
            </NavigationContainer>
        );
    }


    componentDidMount(){
        this._isMounted = true;
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    isSingedIn: true
                })
                var user = firebaseApp.auth().currentUser;
                var db= firebaseApp.firestore();
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;

                db.collection('Users').doc(user.uid).get()
                .then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        db.collection("Users").doc(user.uid).set({
                            email: user.email,
                            createdDate: today,
                            name: "",
                            address: "",
                            phone: ""
                            }).then(()=>{
                        });
                    }
                });
            }
            else{
                this.setState({
                    isSingedIn: false
                })
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    addProductToCart = (product) => {
        let items= this.state.cartArray.concat(product);
        this.setState({
            cartArray: items
        },()=>{
            global.cartGlobal=this.state.cartArray;
        });
    }

    clearCart = () => {
        this.setState({
            cartArray: []
        },()=>{
            global.cartGlobal=this.state.cartArray;
        });
    }

}

function createHomeStack() {
    return(
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ title: 'Home', headerShown: false, header: null}} 
                initialParams={{ login: false }}
            />
            <Stack.Screen name="Authentication" component={AuthenticationScreen} options={{ headerShown: false, header: null}} />
            {/* <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false, header: null}} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, header: null}} /> */}
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, header: null}} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false, header: null}} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false, header: null}} />
        </Stack.Navigator>
    )
}

function createOrderStack() {
    return(
        <OrderStack.Navigator initialRouteName="OrderHistory">
            <OrderStack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false, header: null}} />
            <OrderStack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: false, header: null}} />
        </OrderStack.Navigator>
    )
}

function createProductStack(){
    return(
        <ProductStack.Navigator>
            <ProductStack.Screen 
                name="Shop" 
                component={ShopScreen} 
                options={{  headerShown: false, header: null }}
            />
            <ProductStack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false, header: null}} />
            <ProductStack.Screen name="ListProduct" component={ListProductScreen} options={{ headerShown: false, header: null}} />
        </ProductStack.Navigator>
    )
    
} 


function createCartStack(){
    return(
        <CartStack.Navigator>
            <CartStack.Screen 
                name="Cart" 
                component={CartScreen} 
                options={{  headerShown: false, header: null }} 
            />
            <CartStack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false, header: null}} />
        </CartStack.Navigator>
    )
    
} 
        

function createSearchStack(){
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{  headerShown: false, header: null }} 
            />
            <SearchStack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false, header: null}} />
        </SearchStack.Navigator>
    )
    
} 

function Profile({navigation}){
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen 
                name="ChangeInfo" 
                component={ChangeInfoScreen} 
                options={{  headerShown: false, header: null }} 
            />
        </ProfileStack.Navigator>
    )
}


function Home({ navigation }) {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Shop') {
                iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Cart') {
                iconName = focused ? 'md-cart' : 'md-cart';
            } else if (route.name === 'Search') {
                iconName = focused ? 'md-search' : 'md-search';
            } else if (route.name === 'Contact') {
                iconName = focused ? 'md-contacts' : 'md-contacts';
            }
              // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#2BD9C8',
            inactiveTintColor: '#AFAEAF',
        }}
        >
            <Tab.Screen name="Shop" component={createProductStack} />
            <Tab.Screen name="Cart" component={createCartStack} />
            <Tab.Screen name="Search" component={createSearchStack} />
            <Tab.Screen name="Contact" component={ContactScreen} />
        </Tab.Navigator>
    );

}


function SignInScreen({ navigation }) {
    return (
        <SignIn navigation={navigation} />
    );
}

function SignUpScreen({ navigation }) {
    return (
        <SignUp navigation={navigation} />
    );
}


function AuthenticationScreen({ navigation }) {
    return (
        <Authentication navigation={navigation} />
    );
}

function ChangeInfoScreen({ navigation }) {
    return (
        <ChangeInfo navigation={navigation} />
    );
}


function OrderHistoryScreen({ navigation }) {
    return (
        <OrderHistory navigation={navigation} />
    );
}

function OrderDetailScreen({ route, navigation }) {
    const { orderId } = route.params;
    return (
        <OrderDetail navigation={navigation} orderId={orderId}/>
    );
}


function ShopScreen({ navigation }) {

    return (
    <Shop navigation={ navigation } />
    );
}

function ContactScreen({ navigation }) {
    return (
    <Contact navigation={navigation} />
    );
}

function SearchScreen({ navigation }) {
    return (
    <Search navigation={navigation} />
    );
}

function CartScreen({ navigation }) {
    return (
    <Cart navigation={navigation} />
    );
}


function DetailScreen({ route, navigation }) {
    const { id } = route.params;
    return (
    <Detail navigation={navigation} id={id}/>
    );
}

function ListProductScreen({ route, navigation }) {
    const { type } = route.params;
    return (
    <ListProduct navigation={navigation} type={type} />
    );
}


/* <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen 
                        name="Main" 
                        component={Main} 
                        options={{ title: 'Overview' }} 
                    />
                    <Stack.Screen name="Authentication" component={Authentication} />
                    <Stack.Screen name="OrderHistory" component={OrderHistory} />
                    <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
                </Stack.Navigator>
            </NavigationContainer> */
