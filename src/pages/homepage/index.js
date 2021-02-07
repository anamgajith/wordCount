import React from "react";
import Office from "../../assets/office.svg";
import "./index.css";
const HomePage = () => (
  <div className="container">
    <div className="top-section">
      <div className="title">
        <div class="main-title">Unable to check your webpage word count ?</div>
        <div class="sub-title">
          No worries! <b style={{ color: "#0d8bfc" }}>Globex</b> will guide you!
        </div>
      </div>
      <img src={Office} style={{ width: "442px" }} />
    </div>
    <div class="text-regular">
      Check the last time when you checked the webpage word count.
    </div>
    <div className="search-bar">
      <input type="text" placeholder="Put your website URL here. Eg. https://www.growth.cx/"/>
      <button>Get Insights</button>
    </div>
  </div>
);

export default HomePage;
