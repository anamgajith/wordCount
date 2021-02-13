import React, { useState, useEffect } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
  Sort,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { BsStar, BsStarFill, BsTrash } from "react-icons/bs";
import { withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../../components";
import axios from "axios";
import "./index.css";

const DashBoard = ({ location, history }) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const { url } = location;
  const { user } = useAuth0();
  const uid = user && user.sub;

  const getWordCount = async () => {
    try {
      const response = await axios.post("getWordCount", { url });
      const wc = response.data && response.data.wordCount;
      if (wc === undefined) {
        alert("Sorry Website Does Not Exist");
        history.push("/");
      }
      return wc;
    } catch (error) {
      console.error(error);
      alert("Sorry Something Went Wrong");
      history.push("/");
    }
  };

  const getNumberString = (number) => {
    if (number < 1000) {
      return number;
    } else if (number < 1000000) {
      return `${number / 1000}K`;
    } else if (number < 1000000000) {
      return `${number / 1000000}M`;
    } else {
      return `${number / 1000000000}B`;
    }
  };

  const addHistory = async (newHistory) => {
    try {
      await axios.post("addHistory", newHistory);
    } catch (error) {
      console.error(error);
      alert("Sorry Something Went Wrong");
      history.push("/");
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.post("getHistory", { uid });
      setHistoryData(response.data);
    } catch (error) {
      console.error(error);
      alert("Sorry Something Went Wrong");
      history.push("/");
    }
  };

  const updateHistory = async (historyId, updatedHistory) => {
    try {
      setLoading(true);
      await axios.patch("upateHistory", {
        uid,
        historyId,
        updatedHistory,
      });
      await fetchHistory();
    } catch (error) {
      console.error(error);
      alert("Sorry Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryData = async (historyId) => {
    try {
      setLoading(true);
      await axios.delete("deleteHistory", {
        data: {
          uid,
          historyId,
        },
      });
      await fetchHistory();
    } catch (error) {
      console.error(error);
      alert("Sorry Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const setFavorite = async (id, isFavorite) => {
    try {
      await updateHistory(id, { isFavorite: !isFavorite });
    } catch (error) {
      console.error(error);
      alert("Sorry Something Went Wrong");
    }
  };

  useEffect(() => {
    async function initialLoad() {
      if (url !== undefined) {
        const wordCount = await getWordCount();
        setCount(wordCount);
        const newHistory = {
          uid,
          newHistory: {
            wordCount,
            time: new Date(),
            url,
            isFavorite: false,
          },
        };
        await addHistory(newHistory);
      }
      await fetchHistory();
      setLoading(false);
    }
    initialLoad();
  }, []);

  const actions = ({ _id, isFavorite }) => {
    return (
      <div className="grid-action-container">
        {isFavorite && (
          <BsStarFill
            color="yellow"
            className="clickable"
            onClick={() => setFavorite(_id, isFavorite)}
          />
        )}
        {!isFavorite && (
          <BsStar
            className="clickable"
            onClick={() => setFavorite(_id, isFavorite)}
          />
        )}
        <BsTrash className="clickable" onClick={() => deleteHistoryData(_id)} />
      </div>
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="dashboard-container">
      {url !== undefined && (
        <>
          <div className="dashboard-dropdown-menu">
            <select>
              <option>{url}</option>
            </select>
          </div>
          <div className="dashboard-count-container">
            <div className="dashboard-count">
              <div className="dashboard-count-title">Total Word Count</div>
              <div className="dashboard-count-number">
                {getNumberString(count)}
              </div>
            </div>
            <div className="dashboard-count-message">
              "WooHoo! You’re doing a good job!"
            </div>
          </div>
        </>
      )}
      <div className="dashboard-history-container">
        <div className="dashboard-history-title">Word Count History</div>
        <GridComponent
          dataSource={historyData}
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

export default withRouter(DashBoard);
