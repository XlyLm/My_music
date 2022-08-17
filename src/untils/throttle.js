import { message } from "antd";

function throttle(fun, wait) {
    let context, args;
    let previous = 0;

    return function() {
        let now = +new Date();
        //下次触发 func 剩余的时间
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            fun.apply(context, args);
            previous = now;
        }else{
            message.warning(`请${remaining}ms之后操作!`);
        }
    }
}

export default throttle;