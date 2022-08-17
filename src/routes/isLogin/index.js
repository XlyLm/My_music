import {connect} from "react-redux";
import React from "react";
import LoginPage from "@/pages/loginPage";

function IsLogin(props) {
    const { user, component } = props;
    if(user === null){
        return <LoginPage/>
    }else{
        return component;
    }
}

const mapState = (state)=>{
    const { user } = state.get("user");
    return { user };
}
const mapDispatch = (dispatch)=>{
    return {

    }
}

export default connect(mapState,mapDispatch)(IsLogin);