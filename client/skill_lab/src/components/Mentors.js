import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
<<<<<<< HEAD
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Redirect } from "react-router";
=======
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Redirect, useHistory } from "react-router";
>>>>>>> a789ba1a76a2281a9333df9ee0559a1c163526a2

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

<<<<<<< HEAD
//Direct to group subspace page
const goToSubspace = (subspaceName) => {
  <Redirect to={`/subspace/`} />;
  console.log(subspaceName);
};
=======

>>>>>>> a789ba1a76a2281a9333df9ee0559a1c163526a2
export default function Mentors({ name, list }) {
  const history = useHistory();
  const classes = useStyles();

  //Direct to user profile page
  const goToProfile = (mentorID) => {
    history.push({
      pathname: `/userPorfile/${mentorID}}`,
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
<<<<<<< HEAD
        {list.map((text) => (
          <AccordionDetails key={text}>
            <ListItem
              onClick={() => goToSubspace(text)}
              value={text}
              button
              key={text}
            >
=======
        {list.map((mentor) => (
          
          <AccordionDetails key={mentor.id}>
            <ListItem key={mentor.id} value={mentor.name} button >
>>>>>>> a789ba1a76a2281a9333df9ee0559a1c163526a2
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={mentor.name} />
            </ListItem>
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}
