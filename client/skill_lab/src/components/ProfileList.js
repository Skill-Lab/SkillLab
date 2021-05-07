import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addMentor,
  selectMentors,
  selectUser,
} from "../store/reducers/userSlice";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function ProfileList({ name, list }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const mentorsList = useSelector(selectMentors);

  function connectMentor(mentor) {
    dispatch(addMentor(mentor));
    var entry = {
      mentee_id: user.uid,
      mentee_name: user.displayName,
      mentor_id: mentor.id,
      mentor_name: mentor.name,
    };
    db.collection("mentorRelation")
      .add(entry)
      .then((docRef) => {
        console.log("Add mentor");
      });
  }

  //Check if profile is already a mentor
  function mentorExists(mentor_id) {
    for (let i = 0; i < mentorsList.length; i++) {
      if (mentorsList[i].id === mentor_id) {
        return true;
      }
    }
    return false;
  }

  //Direct to group subspace page
  const goToProfile = (profileID) => {
    history.push({
      pathname: `/userProfile/${profileID}`,
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
          <Typography className={classes.heading}>{name}</Typography>
        </AccordionSummary>
        {list.map((text) => (
          <AccordionDetails key={text.id}>
            <ListItem
              onClick={() => goToProfile(text.id)}
              value={text.name}
              button
              key={text.id}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
            {name === "Mentors" &&
            !mentorExists(text.id) &&
            user.uid !== text.id ? (
              <IconButton
                onClick={() => connectMentor({ id: text.id, name: text.name })}
                children={<AddIcon></AddIcon>}
              ></IconButton>
            ) : (
              <></>
            )}
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}
