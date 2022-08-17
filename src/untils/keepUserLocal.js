import {setStorage} from "./handleStorage";

export default function keepUserLocal(id,phone,pw,name) {
    setStorage("userId",id);
    setStorage("phone",phone);
    setStorage("pw",pw);
    setStorage("name",name);
    return true;
}

