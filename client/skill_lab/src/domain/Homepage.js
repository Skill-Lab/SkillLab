import { Button, CssBaseline, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import { auth } from "../firebase";
import { logout, selectUser } from "../store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Homepage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  //Retrieve User
  const user = useSelector(selectUser);

  //Check if user logged in
  //If not logged in, redirect user to home page
  if (!user) return <Redirect to="/" />;

  //Handle logout function from firebase & redux
  const signout = () => {
    dispatch(logout);
    auth.signOut();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <LeftSidebar />
      <CssBaseline />

      <main className={classes.content}>
        <Toolbar />
        <h1>HomePage</h1>
        <h3>Hello {user.displayName}</h3>
        <Button onClick={signout}>Logout</Button>
      </main>
    </div>
  );
}
