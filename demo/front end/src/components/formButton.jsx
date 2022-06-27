import { Button, Form } from "antd";

function FormButton({ label }) {
  return (
    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        {label}
      </Button>
    </Form.Item>
  );
}

export default FormButton;
