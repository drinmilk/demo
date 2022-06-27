import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  EditFilled,
  BellOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
const items = [
  //show: 是否显示和什么相关
  {
    label: <Link to="home">Home</Link>,
    key: "home",
    show: "always",
    is_show: "true",
  },
  {
    label: <Link to="login">Login</Link>,
    key: "login",
    show: "user",
    is_show: "true",
  },
  {
    label: <Link to="register">Register</Link>,
    key: "register",
    show: "user",
    is_show: "true",
  },
  {
    label: "hello",
    key: "user",
    show: "user",
    is_show: "false",
    children: [
      {
        label: (
          <Link to="editor">
            <EditFilled /> Editor
          </Link>
        ),
        key: "editor",
      },
      {
        label: (
          <Link to="contribution">
            <BookOutlined /> Contribution
          </Link>
        ),
      },
      {
        label: (
          <Link to="logout">
            <LogoutOutlined /> Logout
          </Link>
        ),
      },
    ],
  },
  {
    label: <Link to="check">Check</Link>,
    key: "check",
    show: "admin",
    is_show: "false",
  },
  {
    label: (
      <Link to="information">
        <BellOutlined />
      </Link>
    ),
    key: "information",
    show: "user",
    is_show: "false",
  },
];

const getItemsWithoutLogin = () => {
  return items;
};

const getItemsWithLogin = (username) =>
  items.map((item) => {
    if (item.show === "user")
      item.is_show = item.is_show === "true" ? "false" : "true";
    if (item.key === "user")
      item.label = (
        <>
          <UserOutlined /> {username}
        </>
      );
    return item;
  });

const getItemsWithAdmin = (username) =>
  items.map((item) => {
    if (item.show === "user")
      item.is_show = item.is_show === "true" ? "false" : "true";
    if (item.key === "user")
      item.label = (
        <>
          <UserOutlined /> {username}
        </>
      );
    if (item.show === "admin") item.is_show = "true";
    return item;
  });

const getItems = (user) => {
  if (user.isAdmin) {
    return getItemsWithAdmin(user.username);
  }
  return user.username
    ? getItemsWithLogin(user.username)
    : getItemsWithoutLogin();
};

export { getItems };
