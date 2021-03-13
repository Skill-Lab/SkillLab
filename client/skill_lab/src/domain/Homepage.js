import { Box, CssBaseline, Fab, makeStyles, Toolbar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { deepOrange } from "@material-ui/core/colors";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Post from "../components/Feed/Post";
import { auth } from "../firebase";
import { logout, selectUser } from "../store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    backgroundColor: deepOrange[600],
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

  // todo: method to pull post data
  // store posts in state

  // todo: method to push new post data to database?

  return (
    <div className={classes.root}>
      <LeftSidebar />
      <CssBaseline />

      {/* <h1>HomePage</h1>
        <h3>Hello {user.displayName}</h3> */}
      <Box mx="auto" p={5}>
        <Toolbar />

        <Post />
      </Box>
      <Fab variant="extended" className={classes.fab}>
        <CreateIcon className={classes.extendedIcon} />
        New Post
      </Fab>
    </div>
  );
}
