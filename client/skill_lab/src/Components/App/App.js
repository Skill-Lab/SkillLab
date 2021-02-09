import Login from "../Login";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import SignUp from "../SignUp.js";
import WelcomePage from "../WelcomePage";
function App() {
  return (
    <div className="App">
      <Router>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route exact path="/" component={WelcomePage} />
              <Route path="/login" component={Login} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
