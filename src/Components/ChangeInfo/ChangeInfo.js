import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, Alert } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


import icMenu from '../../media/icon/icMenu.png';
import pic from '../../media/img/profile.png';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { firebaseApp } from '../FirebaseConfig';



const { height } = Dimensions.get('window');
export default class ChangeInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                
            ],
            name: "",
            phone: "",
            address: "",
            email: "",
            createdDate: ""
        }
    }
    openMenu() {
        this.props.navigation.openDrawer();
    }

    saveEdit(){
        let db = firebaseApp.firestore();
        let user =firebaseApp.auth().currentUser;
        if(user){
            db.collection("Users").doc(user.uid).set({
                name: this.state.name,
                phone: this.state.phone,
                address: this.state.address,
                email: this.state.email,
                createdDate: this.state.createdDate
            }).then(
                Alert.alert(
                    'Announcement',
                    'Change Info Successfully !!',
                    [
                    { text: 'OK' }
                    ],
                    { cancelable: false }
                )
            )
        }
        


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
                    <View style={{width: 25}}></View>
                    
                </View>
                <View style={styles.title}>
                    <Image source={pic} style={{height: 150, width: 150, borderRadius: 150/2, borderColor:'white', borderWidth: 3}}/>
                    <TextInput
                        style={styles.name}
                        onChangeText={text => this.setState({name: text})}
                        value={this.state.name}
                        />
                    <Text style={styles.email}> {this.state.email} </Text>
                </View>
                <View style={{marginTop: 20}}/>
                <View style={styles.list}>
                    <Ionicons name="md-calendar" color='#2BD9C8' size={40} />
                    <View style={{paddingLeft: 50, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', fontSize:19}}>Joined Date</Text>
                        <Text>{this.state.createdDate}</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <Ionicons name="md-phone-portrait" color='#2BD9C8' size={40} />
                    <View style={{paddingLeft: 50}}>
                        <Text style={{fontWeight: 'bold', fontSize:19}}>Phone</Text>
                        <TextInput
                        placeholder="Input your phone here"
                        style={styles.inputText}
                        onChangeText={text => this.setState({phone: text})}
                        value={this.state.phone}
                        />
                    </View>
                </View>
                <View style={styles.list}>
                    <Ionicons name="md-cloud-upload" color='#2BD9C8' size={40} />
                    <View style={{paddingLeft: 50, paddingRight: 70}}>
                        <Text style={{fontWeight: 'bold', fontSize:19}}>Address</Text>
                        <TextInput
                        placeholder="Input your address here"
                        style={styles.address}
                        onChangeText={text => this.setState({address: text})}
                        value={this.state.address}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.btnWrapper}
                    onPress={()=>this.saveEdit()}
                >
                    <Text style={styles.name}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
    componentDidMount(){
        //const [loading, setLoading] = useState(true);
        const component=this;
        let db = firebaseApp.firestore();
        let user = firebaseApp.auth().currentUser;
            if(user){
                db.collection("Users").doc(user.uid)
                    .get().then(function(doc){
                        if(doc.exists){
                            const { name } = doc.data();
                            const { createdDate } = doc.data();
                            const { phone } = doc.data();
                            const { address } = doc.data();

                            component.setState({
                                name: name,
                                email: user.email,
                                createdDate: createdDate,
                                phone: phone,
                                address: address
                            })
                        }else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    })
                    .catch(function(error) {
                        console.log("Error getting document:", error);
                    });
            }
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
        margin: 30,
        marginBottom: 20,
        height: 100,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 25
    },
    banner: {
        backgroundColor: '#2BD9C8',
        height: 300,
        padding: 10,
        flexDirection: 'row'
    },
    txt: {
        color: '#AFAEAF',
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -250
    },
    name:{
        fontSize: 25,
        paddingTop: 20,
        color: 'white'
    },
    email:{
        color: "#D9D9D9"
    },

    btnWrapper: {
        marginTop: 20,
        marginLeft: 120,
        marginRight: 120,
        height: 70,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#2BD9C8',
    },
});
