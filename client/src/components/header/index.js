import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import "./index.css";
const Header = ({ history }) => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
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
        {isAuthenticated && (
          <div>
            <button
              style={{ backgroundColor: "white", color: "#0D8BFC" }}
              onClick={() => {
                history.push("/dashboard");
              }}
            >
              Dashboard
            </button>
            <button
              style={{ backgroundColor: "#0D8BFC", color: "white" }}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
