import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/" style={{ textDecoration: "none"}}>Home</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite" style={{ textDecoration: "none"}}>나의 Favorite</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu