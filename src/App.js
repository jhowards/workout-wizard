import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";

import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
