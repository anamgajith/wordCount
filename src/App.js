import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components";
import { HomePage } from "./pages";
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={() => <div>Hello</div>} />
      </Router>
    </div>
  );
}

export default App;
