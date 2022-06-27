import { Button, Result } from "antd";

const Success = () => (
  <Result
    status="success"
    title="投稿成功, 等待审核"
    extra={[
      <Button
        type="primary"
        key="console"
        onClick={() => (window.location = "home")}
      >
        返回首页
      </Button>,
      <Button key="buy" onClick={() => (window.location = "editor")}>
        继续投稿
      </Button>,
    ]}
  />
);

export default Success;
