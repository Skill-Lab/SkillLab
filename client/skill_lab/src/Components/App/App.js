import Login from "../../domain/Authentication/Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "../../domain/Authentication/SignUp.js";
import WelcomePage from "../../domain/WelcomePage";
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
