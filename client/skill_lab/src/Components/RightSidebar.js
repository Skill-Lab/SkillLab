import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import ProfileList from "./ProfileList";
import Switch from "@material-ui/core/Switch";

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
  const [state, setState] = React.useState({
    checkedB: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state.checkedB);
  };
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
          <div className={classes.description}>
            <h4>
              Mentor this Subspace
              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </h4>
          </div>
          <ProfileList name="Members" list={members} />
          <ProfileList name="Mentors" list={members} />
        </div>
      </Drawer>
    </div>
  );
}
