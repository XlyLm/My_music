export function setCookie(cookie){
    console.log(cookie);
    document.cookie = cookie;
}
export function getCookie(key) {
    let str = document.cookie;
    let startIndex = str.indexOf(key);
    let value="";
    if(startIndex === -1){//找不到
        return value;
    }
    let endIndex = str.indexOf(";",startIndex);
    if(endIndex === -1){//找不到
        value = str.substring(startIndex + key.length + 1);
    }else{
        value = str.substring(startIndex + key.length + 1,endIndex);
    }
    return value;
}
export function removeCookie(key) {
    document.cookie = key + "";
}