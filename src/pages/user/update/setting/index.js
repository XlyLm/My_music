import React, {useEffect, useState} from "react";
import {Checkbox, Form, Radio, Space} from "antd";
import {getUserSet} from "@/api/user";
import Css from "./index.module.css";

export default function Setting(props) {
    const [setting ,setSetting] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(()=>{
        setOptions([
            { label: "歌单被收藏", value: "songs" },
            { label: "视频被收藏", value: "video" },
            { label: "电台被订阅", value: "dj" },
            { label: "收到赞", value: "liked" },
            { label: " 新粉丝", value: "fans" }
        ]);
        // getUserSet().then(res=>{
        //     console.log(res);
        // })
    },[])
    
    function change(checkedValues) {
        console.log(checkedValues);
    }

    return (
        <div className={Css.setting}>
            <Form
                name="setting"
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 12,
                }}
                initialValues={{
                    private: "follow",
                    playlist: "me",
                    server: 0
                }}
                autoComplete="off"
            >
                <div className={Css.item}>
                    <h3 className={Css.title}>私信 <span>接受新私信提醒</span></h3>
                    <Form.Item
                        name="private"
                    >
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="all"> 所有人 </Radio>
                                <Radio value="follow"> 我关注的人 </Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className={Css.item}>
                    <h3 className={Css.title}>通知</h3>
                    <Form.Item
                        name="notify"
                    >
                        <Checkbox.Group onChange={change}>
                            <Space direction="vertical">
                                {
                                    options.map((item,index)=>{
                                        return <Checkbox value={item.value} key={index}>{item.label}</Checkbox>
                                    })
                                }
                            </Space>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
                <div className={Css.item}>
                    <h3 className={Css.title}>听歌排行榜</h3>
                    <Form.Item
                        name="playlist"
                    >
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="all"> 所有人可见 </Radio>
                                <Radio value="me"> 仅自己可见 </Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div className={Css.item}>
                    <h3 className={Css.title}>个性化服务</h3>
                    <Form.Item
                        name="server"
                    >
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value="1"> 开启 </Radio>
                                <Radio value="0">  关闭（关闭后，将不会使用你的个性信息提供个性化服务） </Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}