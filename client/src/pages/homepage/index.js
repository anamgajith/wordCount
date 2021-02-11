import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import Office from "../../assets/office.svg";
import "./index.css";
const HomePage = ({ history }) => {
  const submit = () => {
    history.push("/dashboard");
  };
  const { isAuthenticated } = useAuth0();
  return (
    <div className="container">
      <div className="top-section">
        <div className="title">
          <div class="main-title">
            Unable to check your webpage word count ?
          </div>
          <div class="sub-title">
            No worries! <b style={{ color: "#0d8bfc" }}>Globex</b> will guide
            you!
          </div>
        </div>
        <img src={Office} style={{ width: "442px" }} />
      </div>
      {isAuthenticated && (
        <>
          <div class="text-regular">
            Check the last time when you checked the webpage word count.
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Put your website URL here. Eg. https://www.growth.cx/"
            />
            <button onClick={submit}>Get Insights</button>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <>
          <div class="text-regular">Please login to continue.</div>
        </>
      )}
    </div>
  );
};

export default withRouter(HomePage);
