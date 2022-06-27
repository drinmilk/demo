import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Logout from "./components/logout";
import Editor from "./components/editor";
import { tokenKey } from "./config";
import { getItems } from "./components/service/navbarService";
import Information from "./components/information";
import Check from "./components/check";
import Success from "./components/success";
import Contribution from "./components/contribution";
import Update from "./components/update";

function App() {
  const [current, setCurrent] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    isAdmin: "",
  });

  useEffect(() => {
    try {
      const localUser = jwtDecode(localStorage.getItem(tokenKey));
      // console.log(localUser);
      setUser(localUser);
    } catch (ex) {}
  }, []);

  return (
    <>
      <Row>
        <Col offset={5} span={14}>
          <NavBar current={current} items={getItems(user)} />
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="success" element={<Success />} />
            <Route
              path="editor"
              element={<Editor setCurrent={setCurrent} user={user} />}
            />
            <Route
              path="update"
              element={<Update setCurrent={setCurrent} user={user} />}
            />
            <Route
              path="home"
              element={<Home setCurrent={setCurrent} isAdmin={user.isAdmin} />}
            />
            <Route
              path="login"
              element={<LoginForm setCurrent={setCurrent} />}
            />
            <Route
              path="register"
              element={<RegisterForm setCurrent={setCurrent} />}
            />
            <Route path="logout" element={<Logout />} />
            <Route
              path="information"
              element={
                <Information setCurrent={setCurrent} username={user.username} />
              }
            />
            <Route path="check" element={<Check setCurrent={setCurrent} />} />
            <Route
              path="contribution"
              element={
                <Contribution
                  setCurrent={setCurrent}
                  username={user.username}
                />
              }
            />
          </Routes>
        </Col>
      </Row>
    </>
  );
}

export default App;
