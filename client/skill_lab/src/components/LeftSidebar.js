import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import Groups from "./Groups";
import Mentors from "./Mentors";
import SimpleAccordion from "./SimpleAccordion";

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
        <Divider />
        <div className={classes.drawerContainer}>
          <Groups
            name="Groups"
            list={["Biology", "Chemistry", "Computer Science", "Geology"]}
          />

          <Divider />
          <Mentors
            name="Mentors"
            list={["Bob", "John", "Susan", "Jack"]}
          />
        </div>
      </Drawer>
    </div>
  );
}
