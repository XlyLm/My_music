export default function checkPw(pw) {
    return new Promise((resolve, reject) => {
        let res = 0;

        if(pw.length<6||pw.length>12){
            reject("密码长度为6~12");
            return ;
        }
        if(pw.search(' ') !== -1){
            reject("密码不能包含空格");
            return ;
        }
        if(pw.search(/[0-9]/g) !== -1){
            res++;
        }
        if(pw.search(/[a-z]/gi) !== -1){
            res++;
        }
        if(pw.search(/['@'|'$'|'#'|'*'|'_']/g) !== -1){
            res++;
        }
        if(res<2){
            reject("密码必须包含数字、字母、特殊字符之二");
            return ;
        }

        resolve(true);
    })
}
