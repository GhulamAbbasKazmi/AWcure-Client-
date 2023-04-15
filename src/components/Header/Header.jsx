import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getUserDetails } from "../../features/user/userActions";
import { logout } from "../../features/user/userSlice";
import "./header.css";
import logo from "../../assets/logo-dark.png";

import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <MDBNavbar expand="lg" dark bgColor="primary">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <NavLink to="/">
            <img className="logo" src={logo} />
          </NavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <NavLink to="/">
              {({ isActive }) => (
                <MDBNavbarItem
                  className={isActive ? "activeClassName" : undefined}
                >
                  <MDBNavbarLink aria-current="page">Home</MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </NavLink>

            <NavLink to="/profile">
              {({ isActive }) => (
                <MDBNavbarItem
                  className={isActive ? "activeClassName" : undefined}
                >
                  <MDBNavbarLink aria-current="page">Profile</MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </NavLink>

            <NavLink to="/blog">
              {({ isActive }) => (
                <MDBNavbarItem
                  className={isActive ? "activeClassName" : undefined}
                >
                  <MDBNavbarLink aria-current="page">Blog</MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </NavLink>

            <NavLink to="/about">
              {({ isActive }) => (
                <MDBNavbarItem
                  className={isActive ? "activeClassName" : undefined}
                >
                  <MDBNavbarLink aria-current="page">About</MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </NavLink>
          </MDBNavbarNav>

          <div className="col-5 d-flex justify-content-around align-items-center">
            <span className="text-light">
              {userInfo
                ? `Logged in as ${userInfo.email}`
                : "You're not logged in"}
            </span>
            {userInfo ? (
              <button className="button" onClick={() => dispatch(logout())}>
                Logout
              </button>
            ) : (
              <>
                <NavLink className="button" to="/login">
                  Login
                </NavLink>
                <NavLink className="button" to="/register">
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
