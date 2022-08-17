// 获取时分秒
function changeTime(time) {
    if (parseInt(time) !== time)
        return new Error("changeTime: 请输入数字!");
    let timer = parseInt(time);
    let h = parseInt(timer/3600000);
    let m = parseInt((timer - h*3600000)/60000);
    let s = parseInt((timer - h*3600000 - m*60000)/1000);

    let res = `${m.toString().padStart(2,0)} : ${s.toString().padStart(2,0)}`;
    if( h === 0 ){
        return res;
    }else{
        return `${h.toString().padStart(2,0)} : ${res}`;
    }
}

export default changeTime;