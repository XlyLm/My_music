import {crypto,decrypto} from "./crypto";

const obj = window.localStorage;

export const setStorage = (key,value)=>{
    obj.setItem(key, crypto(value));
}
export const getStorage = (key)=>{
    return decrypto(obj.getItem(key));
}
export const removeStorage = (key)=>{
    obj.removeItem(key);
}