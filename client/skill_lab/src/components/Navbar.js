import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'white',
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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navbar} >
        <Toolbar className={classes.toolbar}>
          {/* TODO: Have button redirect to welcomepage "/" */}
          <Button>
            <Avatar
              alt="Logo"
              src="Skill_Lab_Logo.png"
              className={classes.logo_size}
            />
          </Button>
          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}
          <div className={classes.rightButtons}>
            <Button color="white">Login</Button>
            <Button color="white">Signup</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
