import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Avatar,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGroups,
  selectUser,
  storeGroups,
} from "../store/reducers/userSlice";
import { getUserSubspaces } from "../domain/Authentication/Login";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function Groups() {
  const classes = useStyles();
  const history = useHistory();
  const subspaces = useSelector(selectGroups);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //Direct to group subspace page
  const goToSubspace = (subspaceName) => {
    history.push({
      pathname: `/subspace/${subspaceName}`,
    });
  };

  useEffect(() => {
    getUserSubspaces(user.uid).then((data) => {
      console.log("REDUX after login " + data[0]);
      //Store groups to redux
      dispatch(
        storeGroups({
          groups: data,
        })
      );
    });
  }, [dispatch, user.uid]);

  return (
    <div className={classes.root}>
      {!subspaces ? (
        <CircularProgress />
      ) : (
        <>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Groups</Typography>
              {/* Retrieve subspaces from redux and render each item */}
            </AccordionSummary>
            {subspaces.map((text) => (
              <AccordionDetails  key={text.id}>
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
        </>
      )}
    </div>
  );
}
