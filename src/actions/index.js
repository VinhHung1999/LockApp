import {ADD ,INCREASE, DECREASE, CLEAR, DELETE} from './types';


export const counterAdd = (newVal) => ({type:ADD, value: newVal});
export const counterDecrease = (id) => ({type:DECREASE, value: id});
export const counterIncrease = (id) => ({type:INCREASE, value: id});
export const counterClear = () => ({type:CLEAR});
export const counterDelete = (id) => ({type:DELETE, value: id});
