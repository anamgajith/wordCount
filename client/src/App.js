import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { HomePage, Dashboard } from "./pages";
function App() {
  const [isAuthenticated, setAuthentication] = useState(false);
  return (
    <div className="App">
      <Header
        isAuthenticated={isAuthenticated}
        setAuthentication={setAuthentication}
      />
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

export default App;
