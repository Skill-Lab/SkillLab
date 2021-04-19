import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { db } from "../firebase";
import { selectUser } from "../store/reducers/userSlice";
import Groups from "./Groups";
import SimpleAccordion from "./SimpleAccordion";

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

  //Retrieve user from redux
  const user = useSelector(selectUser);

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
          <SimpleAccordion name="Members" list={members} />
        </div>
      </Drawer>
    </div>
  );
}
