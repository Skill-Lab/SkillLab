import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import ProfileList from "./ProfileList";

const drawerWidth = 300;

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
  description: {
    whiteSpace: "pre-line",
    margin: "1rem",
  },
}));

export default function RightSidebar({ description, members }) {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        anchor="right"
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div className={classes.description}>{description}</div>
          <Divider />
          <ProfileList name="Members" list={members} />
        </div>
      </Drawer>
    </div>
  );
}
