import React from "react";
import { useParams } from "react-router";
import { Button, CssBaseline, makeStyles, Toolbar } from "@material-ui/core";
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

export default function Subspace() {
  const classes = useStyles();

  let { subspaceName } = useParams();

  //Retrieve User
  const user = useSelector(selectUser);

  //Check if user logged in
  //If not logged in, redirect user to home page
  if (!user) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <LeftSidebar />
      <CssBaseline />

      <main className={classes.content}>
        <Toolbar />
        <h1>{subspaceName}</h1>
      </main>
    </div>
  );
}

 
  
