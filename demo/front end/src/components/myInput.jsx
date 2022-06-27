import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
function MyInput({ name, icon, type = "login" }) {
  const [rules, setRules] = useState([
    {
      required: true,
      message: `Please input your ${name}!`,
    },
  ]);
  useEffect(() => {
    if (type === "register" && name === "password" && rules.length < 2) {
      const newRules = [...rules];
      newRules.push({
        min: 6,
        message: `${name} 不少于六位！`,
      });
      setRules(newRules);
    }
  }, [type, name, rules]);

  return (
    <Form.Item name={name} type="string" rules={rules}>
      <Input
        prefix={icon}
        type={name === "username" ? "text" : "password"}
        placeholder={`Enter your ${name}.`}
      />
    </Form.Item>
  );
}

export default MyInput;
