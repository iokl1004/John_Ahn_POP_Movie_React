import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <Link to="/" style={{ textDecoration: "none"}}>Home</Link>
      </Menu.Item>
        <Menu.Item key="favorite">
          <Link to="/favorite" style={{ textDecoration: "none"}}>나의 Favorite</Link>
        </Menu.Item>
      
    </Menu>
  )
}

export default LeftMenu