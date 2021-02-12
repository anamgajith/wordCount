import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import Office from "../../assets/office.svg";
import { Loading } from "../../components";
import "./index.css";
const HomePage = ({ history }) => {
  const [url, setUrl] = useState("");
  const submit = () => {
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(url)) {
      alert("Please enter a valid url");
    } else {
      history.push({
        pathname: "/dashBoard",
        url,
      });
    }
  };
  const { isAuthenticated, isLoading } = useAuth0();
  return isLoading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="top-section">
        <div className="title">
          <div className="main-title">
            Unable to check your webpage word count ?
          </div>
          <div className="sub-title">
            No worries! <b style={{ color: "#0d8bfc" }}>Globex</b> will guide
            you!
          </div>
        </div>
        <img src={Office} style={{ width: "442px" }} />
      </div>
      {isAuthenticated && (
        <>
          <div className="text-regular">
            Check the last time when you checked the webpage word count.
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Put your website URL here. Eg. https://www.growth.cx/"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={submit}>Get Insights</button>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <>
          <div className="text-regular">Please login to continue.</div>
        </>
      )}
    </div>
  );
};

export default withRouter(HomePage);
