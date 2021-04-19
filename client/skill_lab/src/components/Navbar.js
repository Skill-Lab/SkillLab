import { AppBar, Avatar, Button, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/reducers/userSlice";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "white",
    opacity: "0.93",
    boxShadow: "0px 0.5px 7px -1px rgba(0,0,0,0.3)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo_size: {
    width: theme.spacing(15),
    height: theme.spacing(7),
    flexGrow: 1,
  },
  rightButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function Navbar() {
  //Retrieve User
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const classes = useStyles();
  const icon_Logo = (
    <Avatar
      alt="Logo"
      src="Skill_Lab_Logo.png"
      href="/"
      className={classes.logo_size}
    />
  );
  //Handle logout function from firebase & redux
  const signout = () => {
    dispatch(logout);
    auth.signOut();
    <Redirect to="/" />;
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <Button startIcon={icon_Logo} href="/"></Button>

          {/* Check if user is signed in or not */}
          {!user ? (
            //User is not signed in
            //Display Login/SignUp
            <div className={classes.rightButtons}>
              <Button href="/login">Login</Button>
              <Button href="/signup">Signup</Button>
            </div>
          ) : (
            //User is logged in
            //Display interests, logout on navbar
            <div className={classes.rightButtons}>
              <Button href="/interestPage">Interests</Button>
              <Button onClick={signout}>Logout</Button>
              <IconButton
                href="/userProfile"
                //onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
