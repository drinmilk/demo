import React, { useState, useEffect } from "react";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Col, Row, Alert } from "antd";
import MyInput from "./myInput";
import FormButton from "./formButton";
import { url } from "../config";
const RegisterForm = ({ setCurrent }) => {
  const [message, setMessage] = useState();

  useEffect(() => setCurrent("register"));

  const onFinish = async (values) => {
    const res = await axios.post(url + "user", values);

    if (res.data) {
      setMessage(res.data);
    } else {
      window.location = "/login";
    }
  };

  return (
    <Row style={{ marginTop: 200 }}>
      <Col offset={9} span={6}>
        {message && <Alert message={message} type="error" showIcon />}
        <Form name="basic" style={{ marginTop: 20 }} onFinish={onFinish}>
          <MyInput name="username" icon={<UserOutlined />} type="register" />
          <MyInput name="password" icon={<LockOutlined />} type="register" />
          <FormButton label="Register" />
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterForm;
