import React, { useState } from "react";
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
  CaretDownOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="person" icon={<UserOutlined />}>
        <Link to="/person">Person</Link>
      </Menu.Item>
      {!user && (
        <Menu.Item key="register" icon={<SettingOutlined />} className="float-end">
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item key="login" icon={<LoginOutlined />} className="float-end">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
      {user && (
        <Menu.SubMenu key="SubMenu" icon={<CaretDownOutlined />}title={user.name} className="float-end">
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export default Navbar;
