import {INCREASE, DECREASE, CLEAR, DELETE} from './types';


export const counterIncrease = (newVal) => ({type:INCREASE, value: newVal});
export const counterDecrease = () => ({type:DECREASE, value: 5});
export const counterClear = () => ({type:CLEAR});
export const counterDelete = (id) => ({type:DELETE, value: id});
