import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header } from "./components";
import { HomePage, Dashboard } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
function App({ history }) {
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);
  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/dashboard"
          render={() => (isAuthenticated ? <Dashboard /> : <HomePage />)}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
