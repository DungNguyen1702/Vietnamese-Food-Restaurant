import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { RiStackLine } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { ICONS } from '../../constants/icons';
import { IMAGES } from '../../constants/images';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoLocationSharp } from 'react-icons/io5';
import { IoMdPerson } from 'react-icons/io';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { HistoryOutlined } from '@ant-design/icons';

const Header = ({ userInfo }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigage = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');

    navigage('/');
  };

  const getProfile = () => {
    if (userInfo) {
      setProfile(userInfo);
      setIsLoggedIn(true);
    }
    if (!localStorage.getItem('access_token')) {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, [localStorage.getItem('access_token')]);
  return (
    <div className="container-header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#" className="logo-text">
            <img className="logo-header" src={ICONS.logo} alt="logo" />
            Vietnamese Cusine
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Navbar.Text className="location">
                <p className="deliver">Deliver to:</p>
                <IoLocationSharp className="location-icon" />
                <p className="cur-location">Current Location</p>
                <a href="#">172/3 Nguyễn Lương Bằng - Liên Chiểu - Đà Nẵng</a>
              </Navbar.Text>
            </Nav>
            {/* Điều kiện hiển thị */}
            {!isLoggedIn ? (
              <div>
                <Button
                  className="btn-login"
                  onClick={() => {
                    navigage('/auth/login');
                  }}
                >
                  <IoMdPerson className="login-icon" />
                  <div className="login-text">Login</div>
                </Button>
              </div>
            ) : (
              // Nếu chưa đăng nhập, hiển thị nút Login

              // Nếu đã đăng nhập, hiển thị icon cart và user
              <div className="navbar-icons d-flex align-items-center">
                {/* Cart icon */}
                <div className="cart-icon position-relative me-3" style={{ cursor: 'pointer' }}>
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    2
                  </span>

                  <IoCartOutline
                    className="cart-icon-img"
                    alt="Cart"
                    onClick={() => {
                      navigage('/cart');
                    }}
                  />
                </div>

                {/* User icon với Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-user" className="user-dropdown-toggle d-flex">
                    <img
                      src={profile.avatar}
                      alt="User"
                      className="user-icon"
                      style={{ width: '28px', height: '28px' }}
                    />
                    <p className="user-name">{profile.name}</p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item href="#/dashboard">
                      <RiStackLine className="dropdown-icon" />
                      Homepage
                    </Dropdown.Item>
                    <Dropdown.Item href="#/order-history">
                      <MdOutlineHistory className="dropdown-icon" />
                      Lịch sử đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        navigage('/wishlist');
                      }}
                    >
                      <IoMdHeartEmpty className="dropdown-icon" />
                      Danh sách món ăn đã thích
                    </Dropdown.Item>
                    <Dropdown.Item href="#/settings">
                      <IoSettingsOutline className="dropdown-icon" />
                      Cài đặt
                    </Dropdown.Item>
                    <Dropdown.Divider className="dropdown-icon" />
                    <Dropdown.Item href="#/logout" onClick={handleLogout}>
                      <IoLogOutOutline className="dropdown-icon" />
                      Log-out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
