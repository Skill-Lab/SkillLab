import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { selectGroups } from "../store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Groups({ name }) {
  const classes = useStyles();
  const history = useHistory();

  const subspaces = useSelector(selectGroups);
  const [groups, setGroups] = useState(subspaces.groups);
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
          <Typography className={classes.heading}>{name}</Typography>
        </AccordionSummary>
        {groups.map((text) => (
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
