import {INCREASE, DECREASE} from './types';


export const counterIncrease = (newVal) => ({type:INCREASE, value: newVal});
export const counterDecrease = () => ({type:DECREASE, value: 5});
