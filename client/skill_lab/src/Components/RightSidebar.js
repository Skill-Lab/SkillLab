import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import ProfileList from "./ProfileList";
import Switch from "@material-ui/core/Switch";

import { useDispatch, useSelector } from "react-redux";
import {
  addSubspaceMentor,
  selectSubspaceMentors,
  removeSubspaceMentor,
} from "../store/reducers/userSlice";
import { selectUser } from "../store/reducers/userSlice";
import { db } from "../firebase";

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

export default function RightSidebar({ description, members, doc_id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const subspaceMentors = useSelector(selectSubspaceMentors);

  //Check if user is a mentor in current subpsace
  const isMentor = () => {
    if (subspaceMentors.length === 0) return false;
    for (let i = 0; i < subspaceMentors.length; i++) {
      var mentor = subspaceMentors[i];
      if (mentor.id === user.uid) {
        return true;
      }
    }
    return false;
  };

  //Update status whether user is a mentor for current subpsace or not
  function updateSubspaceMentor(status) {
    //Find user
    //Update
    var docRef = db.collection("userSubspace").doc(doc_id);
    return docRef
      .update({
        isMentor: !status,
      })
      .then(() => {
        console.log("Document successfully updated!");
        if (!status) {
          dispatch(
            addSubspaceMentor({
              id: user.uid,
              name: user.displayName,
              isMentor: true,
            })
          );
        } else {
          dispatch(
            removeSubspaceMentor({
              id: user.uid,
            })
          );
        }
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  const handleChange = (event) => {
    var status = isMentor();
    updateSubspaceMentor(status);
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
                checked={isMentor()}
                onChange={handleChange}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </h4>
          </div>
          <ProfileList name="Mentors" list={subspaceMentors} />
          <ProfileList name="Members" list={members} />
        </div>
      </Drawer>
    </div>
  );
}
