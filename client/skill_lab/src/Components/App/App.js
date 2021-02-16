import Login from "../../domain/Authentication/Login";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "../../domain/Authentication/SignUp.js";
import WelcomePage from "../../domain/WelcomePage";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/reducers/userSlice";
import Homepage from "../../domain/Homepage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is logged iin
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        //user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Homepage} />
          <Route path="/login" component={Login} />

          {/* Routes not specified go to root */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
