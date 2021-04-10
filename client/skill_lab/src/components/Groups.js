import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups, storeGroups } from "../store/reducers/userSlice";
import { db } from "../firebase";
import { setGroups, selectUser } from "../store/reducers/userSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

async function getUserSubspaces(user) {
  var userSubspaces = [];

  await db
    .collection("userSubspace")
    .where("user_id", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        var subspace = {
          id: doc.data().subspace_id,
          name: doc.data().subspace_name,
          imageURL: doc.data().imageURL,
        };
        console.log("Subspace name: " + doc.data().subspace_name);
        userSubspaces.push(subspace);
      });
    });
  console.log("User subspaces list: " + userSubspaces);
  return userSubspaces;
}

export default function Groups() {
  const classes = useStyles();
  const history = useHistory();
  //Retrieve user from redux
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const subspaces = useSelector(selectGroups);
  const [groups, setGroups] = useState([]);

  //Call useEffect to run when componenet mounted for Groups
  //Need to do more research
  useEffect(() => {
    getUserSubspaces(user)
      .then((data) => {
        console.log("Data from LS " + data[0]);

        //Store groups to redux
        dispatch(
          storeGroups({
            groups: data,
          })
        );
      })
      .then(function () {
        //Assigning groups to state
        setGroups(subspaces);
      });
  }, []);
  //Direct to group subspace page
  const goToSubspace = (subspaceName) => {
    history.push({
      pathname: `/subspace/${subspaceName}`,
    });
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Groups</Typography>
        </AccordionSummary>
        {subspaces.map((text) => (
          <AccordionDetails key={text.id}>
            <ListItem
              onClick={() => goToSubspace(text.name)}
              value={text.name}
              button
              key={text.id}
            >
              <ListItemIcon>
                <Avatar src={text.imageURL} />
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}
