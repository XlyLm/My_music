import React from "react";
import Css from "./index.module.css";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import {connect} from "react-redux";
import {Avatar, Button, DatePicker, Form, Input, Radio} from "antd";
import {Link} from "react-router-dom";

function BaseInfo(props) {
    const { user } = props;

    function submit(values) {
        console.log(values);
    }

    return (
        <div className={Css.infoCnt}>
            <div className={Css.info}>
                {
                    user !== null &&
                    <Form
                        name="userInfo"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        initialValues={{
                            nickname: user.nickname,
                            signature: user.avatarDetail,
                            gender: user.gender,
                            birthday: user.birthday>0?user.birthday:0,
                            province: user.province,
                            city: user.city
                        }}
                        onFinish={submit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="昵称"
                            name="nickname"
                            rules={[
                                { required: true, message: '昵称不能为空' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name={"signature"} label="介绍">
                            <Input.TextArea showCount maxLength={120}/>
                        </Form.Item>

                        <Form.Item name={"gender"} label="性别" colon={"0"}>
                            <Radio.Group>
                                <Radio value="1"> 男 </Radio>
                                <Radio value="2"> 女 </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item name={"birthday"} label="生日">
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                }
            </div>

            <div className={Css.headImg}>
                <Avatar shape={"square"}
                        src={user!==null ? user.avatarUrl : ""}
                        size={140} icon={<UserOutlined />} />
                <Link to={"/user/update/avatar"} className={["d_block text_a_c",Css.changeHead].join(" ")}>
                    更换头像
                </Link>
            </div>
        </div>
    )
}

const mapState = (state)=>{
    const { user } = state.get("user");
    return { user };
}
const mapDispatch = (dispatch)=>{
    return {

    }
}

export default connect(mapState,mapDispatch)(BaseInfo);