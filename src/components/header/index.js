import React from "react";
import logo from "../../assets/logo.svg";
import user from "../../assets/user.svg";
import "./index.css";
const Header = () => (
  <div className="header-container">
    <div className="header-content">
      <img src={logo} className="logo" />
      <div style={true ? { display: "flex" } : { display: "none" }}>
        <button style={{ color: "#bdbdbd" }}>Login</button>
        <button style={{ backgroundColor: "#0D8BFC", color: "white" }}>
          Sign Up
        </button>
      </div>
      <img  src={user} style={false ? { display: "flex" } : { display: "none" }} className="profile"/>
    </div>
  </div>
);

export default Header;
