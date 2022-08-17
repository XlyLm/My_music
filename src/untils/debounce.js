// 第三版
function debounce(fun, wait) {
    let timer;

    return function () {
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function(){
            fun.apply(context, args);
        }, wait);
    }
}

export default debounce;