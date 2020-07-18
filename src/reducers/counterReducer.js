import {ADD, INCREASE, DECREASE, CLEAR, DELETE} from  '../actions/types';


import {firebaseApp} from '../Components/FirebaseConfig.js';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD:
            var length = state.length;
            var newObject = JSON.parse(action.value);
            newObject.size=1;
            
            if(length == 0){
                state.push(newObject);
                return [...state];
            }
            else{
                for(var i = 0; i < length; i++){
                    if(state[i].id==newObject.id){
                        state[i].size = state[i].size +1;
                        return [...state];
                    }
                }
                
                state.push(newObject);
                return [...state];
            }
        case CLEAR:
            state=[];
            return [...state];
        case DELETE:
            for(var i = 0; i < state.length; i++){
                if(state[i].id==action.value){
                    state.splice(i,1);
                    return [...state];
                }
            }
        case DECREASE:
            for(var i = 0; i < state.length; i++){
                if(state[i].id==action.value){
                    if(--state[i].size==0){
                        state.splice(i,1);
                        return [...state]
                    }
                }
            }
            return [...state];
        case INCREASE:
            for(var i = 0; i < state.length; i++){
                if(state[i].id==action.value){
                    state[i].size++;
                    return [...state];
                }
            }

        default: 
            return state;
    }
} 