import {INCREASE, DECREASE, CLEAR, DELETE} from  '../actions/types';


import {firebaseApp} from '../Components/FirebaseConfig.js';
import { ActionSheetIOS } from 'react-native';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            // var db = firebaseApp.firestore();
            // var newState = state;
            // var length = state.length;
            // db.collection("Products").doc(action.value).get().then(doc => {
            //     if(length == 0){
            //         var tempOJ = new Object();
            //         tempOJ = doc.data();
            //         tempOJ.size = 1;
            //         newState.push(tempOJ);
            //         return newState;
            //     }
            //     else{
            //         for(var i = 0; i < length; i++){
            //             if(newState[i].id==action.value){
            //                 newState[i].size = newState[i].size +1;
            //                 return state = newState;
            //             }
            //         }
            //         var temp123 = new Object();
            //         temp123 = doc.data();
            //         temp123.size = 1;
            //         newState.push(temp123);
            //         return state = newState;
            //     }
                
            // })
            state.push(action.value);
            return state;
        case DECREASE:
            const newCartG = state.concat(action.value);
        case CLEAR:
            return [];
        case DELETE:
            let newCar = [];
            state.map(product => {
                if(product!=action.value){
                    newCar.push(product);
                }
            })
            console.log(newCar);
            return newCar;

        default: 
            return state;
    }
}