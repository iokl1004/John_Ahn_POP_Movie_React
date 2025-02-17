/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login" style={{ textDecoration: "none"}}>로그인</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register" style={{ textDecoration: "none"}}>회원가입</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <Link onClick={logoutHandler} style={{ textDecoration: "none"}}>로그아웃</Link>
        </Menu.Item>
        <Menu.Item key="modify">
          <Link to="/Modify" style={{ textDecoration: "none"}}>회원정보 수정</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);