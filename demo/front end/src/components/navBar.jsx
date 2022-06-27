import React from "react";
import { Menu } from "antd";
function NavBar({ current, items }) {
  return (
    <Menu
      selectedKeys={[current]}
      mode="horizontal"
      items={items.filter((item) => item.is_show === "true")}
    />
  );
}

export default NavBar;
