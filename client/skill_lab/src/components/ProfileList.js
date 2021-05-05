import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function addMentor() {
  console.log("Add mentor");
}

export default function ProfileList({ name, list }) {
  const classes = useStyles();
  const history = useHistory();

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
            {name === "Mentors" ? (
              <IconButton
                onClick={() => addMentor()}
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
