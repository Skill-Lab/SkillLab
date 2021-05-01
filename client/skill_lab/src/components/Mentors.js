import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Redirect, useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Mentors({ name, list }) {
  const history = useHistory();
  const classes = useStyles();

  //Direct to user profile page
  const goToProfile = (mentorID) => {
    history.push({
      pathname: `/userProfile/${mentorID}}`,
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
        {list.map((mentor) => (
          <AccordionDetails key={mentor.id}>
            <ListItem key={mentor.id} value={mentor.name} button>
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
