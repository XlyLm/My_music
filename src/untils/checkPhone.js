export default function checkPhone(phone) {
    const reg = /^1[3-9][0-9]{9}$/;
    const bool = reg.test(phone);
    return new Promise((resolve, reject) => {
        if(phone === ""){
            reject("手机号不能为空");
        }else if(bool){
            resolve(true)
        }else{
            reject("请输入正确的手机号");
        }
    });
}
