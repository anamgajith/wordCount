import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { FaSignOutAlt } from "react-icons/fa";
import "./index.css";
const Header = ({ history }) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  console.log(user);
  return (
    <div className="header-container">
      <div className="header-content">
        <img
          src={logo}
          className="logo clickable"
          onClick={() => history.push("/")}
        />
        <div
          style={!isAuthenticated ? { display: "flex" } : { display: "none" }}
        >
          <button
            style={{ backgroundColor: "#0D8BFC", color: "white" }}
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        </div>
        <div
          className="sign-out clickable"
          onClick={() => logout({ returnTo: window.location.origin })}
          style={isAuthenticated ? { display: "flex" } : { display: "none" }}
        >
          <FaSignOutAlt size={25} />
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
