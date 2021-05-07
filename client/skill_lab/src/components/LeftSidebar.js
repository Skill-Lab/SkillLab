import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import Groups from "./Groups";
import Mentors from "./Mentors";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

export default function LeftSidebar() {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Groups />
          <Divider />
          <Mentors />
        </div>
      </Drawer>
    </div>
  );
}
