import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useLocation } from "react-router-dom";
import { url } from "../config";
import axios from "axios";
const { TextArea } = Input;

function Update({ setCurrent, user }) {
  const { state } = useLocation();
  console.log(state); // {id:1,name:"zora"}
  if (state) {
    console.log(state.title);
  }
  useEffect(() => setCurrent("user"));

  const onFinish = async (values) => {
    const newValues = { ...values, author: user.username, id: state.id };
    //console.log(newValues);

    message.success("提交成功");
    await axios.put(url + "video", newValues);

    // window.location = "contribution";
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        style={{ marginTop: 20 }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "标题不能为空",
            },
          ]}
          initialValue={state ? state.title : ""}
        >
          <Input placeholder="标题" showCount maxLength={20} allowClear />
        </Form.Item>

        <Form.Item
          name="link"
          rules={[
            {
              required: true,
              message: "链接不能为空",
            },
          ]}
          initialValue={state ? state.link : ""}
        >
          <TextArea placeholder="链接" autoSize showCount />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "简介不能为空",
            },
          ]}
          initialValue={state ? state.description : ""}
        >
          <TextArea
            placeholder="简介"
            allowClear
            autoSize
            showCount
            maxLength={200}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Update;
