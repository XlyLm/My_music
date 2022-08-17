//获取当前的毫秒数
function timestamp() {
    return new Date().getTime();
}

//在URL上设置时间戳
function setUrl(url) {
    if(url.indexOf("?") !== -1) {
        url = url + "&timestamp=" + timestamp();
    } else {
        url = url + "?timestamp=" + timestamp();
    }
    return url;
}

export default setUrl;