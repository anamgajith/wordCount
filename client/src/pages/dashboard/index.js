import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { BsStar, BsTrash } from "react-icons/bs";
import "./index.css";
const DATA = [
  {
    id: 1,
    url: "www.google.com",
    wordCount: 124,
  },
  {
    id: 2,
    url: "www.google.com",
    wordCount: 220,
  },
  {
    id: 3,
    url: "www.google.com",
    wordCount: 184,
  },
  {
    id: 4,
    url: "www.google.com",
    wordCount: 458,
  },
  {
    id: 5,
    url: "www.google.com",
    wordCount: 365,
  },
];
const DashBoard = () => {
  const actions = (props) => (
    <dvi className="grid-action-container">
      <BsStar className="clickable" />
      <BsTrash className="clickable" />
    </dvi>
  );
  return (
    <div className="dashboard-container">
      <div className="dashboard-dropdown-menu">
        <select>
          <option>growth.cx</option>
        </select>
      </div>
      <div className="dashboard-count-container">
        <div className="dashboard-count">
          <div className="dashboard-count-title">Total Word Count</div>
          <div className="dashboard-count-number">100</div>
        </div>
        <div className="dashboard-count-message">
          "WooHoo! You’re doing a good job!"
        </div>
      </div>
      <div className="dashboard-history-container">
        <div className="dashboard-history-title">Word Count History</div>
        <GridComponent
          dataSource={DATA}
          allowPaging={true}
          allowSorting={true}
          pageSettings={{ pageSize: 10 }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="url"
              headerText="URL"
              textAlign="left"
              width="125"
            />
            <ColumnDirective
              field="wordCount"
              headerText="Word Count"
              textAlign="left"
              width="75"
            />
            <ColumnDirective
              headerText="Actions"
              textAlign="left"
              width="50"
              template={actions}
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default DashBoard;
