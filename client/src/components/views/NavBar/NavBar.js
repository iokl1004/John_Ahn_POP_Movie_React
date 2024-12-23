import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import Icon from '@ant-design/icons';
import './Sections/Navbar.css';
import { Link } from 'react-router-dom';

function NavBar() {

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
      
        <Link to="/" style={{ textDecoration: "none"}}>POP Movie</Link>
      </div>
      
      <div className="menu__container">
        {/* 개발 서버에서만 보이게끔 적용 */}
        {process.env.NODE_ENV !== 'production' &&
            <div className="menu_left">
              <LeftMenu mode="horizontal" />
            </div>
        }
        {process.env.NODE_ENV !== 'production' &&
            <div className="menu_rigth">
              <RightMenu mode="horizontal" />
            </div>
        }
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar