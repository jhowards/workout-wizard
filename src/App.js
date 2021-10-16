import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import Schedule from "./components/Schedule/Schedule";
import Routines from "./components/Routines/Routines";
import Goals from "./components/Goals/Goals";
import MainCalendar from "./components/Calendar/MainCalendar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import About from "./components/About";
import Intro from "./components/Intro";
import Settings from "./components/Settings";
import Register from "./components/Register";

const mapStateToProps = (state) => ({
  loggedin: state.loggedIn,
});

function App(props) {
  return (
    <Router>
      <div className="App">
        <NavBar loggedin={props.loggedin} />
        {props.loggedin ? (
          <Route exact path="/">
            {/* // if loggedin TRUE redirect to home */}
            <Redirect to="/home" />
          </Route>
        ) : (
          <Route exact path="*">
            {/* // if loggedin FALSE redirect to login */}
            <Redirect to="/login" />
          </Route>
        )}

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/calendar" component={MainCalendar} />
        <Route path="/routines" component={Routines} />
        <Route path="/about" component={About} />
        <Route path="/goals" component={Goals} />
        <Route path="/intro" component={Intro} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
