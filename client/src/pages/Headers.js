import React from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const Headers = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/signin");
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;
  return (
    <Header>
      <Link to="/">
        <span style={{ fontSize: 24, color: "white" }}>ContactKeeper</span>
      </Link>
      <div style={{ float: "right" }}>
        {isLoggedIn && (
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="0">
              <Link to="/" >Home</Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/contacts">Contacts</Link>
            </Menu.Item>
            <Menu.Item key="4">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a onClick={logOut}>Logout</a>
            </Menu.Item>
          </Menu>
        )}
        {!isLoggedIn && (
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="2">
              <Link to="/signin">SignIn</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/signup">SignUp</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </Header>
  );
};

export default Headers;
