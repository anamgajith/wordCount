import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { HomePage, Dashboard } from "./pages";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
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

export default App;
