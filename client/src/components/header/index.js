import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/logo.svg";
import user from "../../assets/user.svg";
import "./index.css";
const Header = ({ history, isAuthenticated, setAuthentication }) => (
  <div className="header-container">
    <div className="header-content">
      <img
        src={logo}
        className="logo clickable"
        onClick={() => {
          setAuthentication(false);
          history.push("/");
        }}
      />
      <div style={!isAuthenticated ? { display: "flex" } : { display: "none" }}>
        <button style={{ color: "#bdbdbd" }}>Login</button>
        <button style={{ backgroundColor: "#0D8BFC", color: "white" }}>
          Sign Up
        </button>
      </div>
      <img
        src={user}
        style={isAuthenticated ? { display: "flex" } : { display: "none" }}
        className="profile"
      />
    </div>
  </div>
);

export default withRouter(Header);