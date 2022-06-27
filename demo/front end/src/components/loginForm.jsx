import React, { useEffect, useState } from "react";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Col, Row, Alert } from "antd";
import MyInput from "./myInput";
import FormButton from "./formButton";
import { url, token, tokenKey } from "../config";
function LoginForm({ setCurrent }) {
  const [message, setMessage] = useState();
  useEffect(() => setCurrent("login"));

  const onFinish = async (values) => {
    const res = await axios.get(url + "user", { params: values });
    // console.log(res.data);
    if (res.data["hasError"]) {
      setMessage(res.data[token]);
    } else {
      localStorage.setItem(tokenKey, res.data[token]);
      window.location = "/home";
    }
  };

  return (
    <Row style={{ marginTop: 200 }}>
      <Col offset={9} span={6}>
        {message && <Alert message={message} type="error" showIcon />}
        <Form name="basic" style={{ marginTop: 20 }} onFinish={onFinish}>
          <MyInput name="username" icon={<UserOutlined />} />
          <MyInput name="password" icon={<LockOutlined />} />
          <FormButton label="Login" />
        </Form>
      </Col>
    </Row>
  );
}

export default LoginForm;
