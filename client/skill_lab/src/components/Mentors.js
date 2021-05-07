import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMentor,
  selectMentors,
  selectUser,
  storeMentors,
} from "../store/reducers/userSlice";
import RemoveIcon from "@material-ui/icons/Remove";
import { db } from "../firebase";
import { getMentorList } from "../domain/Authentication/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function Mentors() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const mentorsList = useSelector(selectMentors);

  //Direct to user profile page
  const goToProfile = (mentorID) => {
    history.push({
      pathname: `/userProfile/${mentorID}`,
    });
  };

  function removeMentor(mentor) {
    dispatch(deleteMentor(mentor));
    console.log("Delete mentor");
    db.collection("mentorRelation")
      .where("mentee_id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().mentor_id === mentor) {
            doc.ref.delete();
            console.log("Successfully deleted docREF: " + doc.id);
          }
        });
      });
  }

  useEffect(() => {
    getMentorList(user.uid).then((data) => {
      //Store groups to redux
      dispatch(
        storeMentors({
          mentors: data,
        })
      );
    });
  }, [dispatch, user.uid]);

  return (
    <div className={classes.root}>
      {!mentorsList ? (
        <CircularProgress />
      ) : (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Mentors</Typography>
            </AccordionSummary>
            {mentorsList.map((mentor) => (
              <AccordionDetails key={mentor.id}>
                <ListItem
                  key={mentor.id}
                  value={mentor.name}
                  button
                  onClick={() => goToProfile(mentor.id)}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={mentor.name} />
                </ListItem>
                <IconButton
                  onClick={() => removeMentor(mentor.id)}
                  children={<RemoveIcon></RemoveIcon>}
                ></IconButton>
              </AccordionDetails>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
}
