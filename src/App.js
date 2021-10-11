import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import Schedule from "./components/Schedule/Schedule";
import Routines from "./components/Routines/Routines";
import Goals from "./components/Goals/Goals";
import MainCalendar from "./components/Calendar/MainCalendar";
import { useState } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
function App() {
  const [loggedin, setloggedin] = useState(true);
  return (
    <Router>
      <div className="App">
        <NavBar loggedin={true} />
        <Route exact path="/">
          // if loggedin true redirect to home
          {<Redirect to="/login" />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/calendar" component={MainCalendar} />
        <Route path="/routines" component={Routines} />
        <Route path="/goals" component={Goals} />
      </div>
    </Router>
  );
}

export default App;
