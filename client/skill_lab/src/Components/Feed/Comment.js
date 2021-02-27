import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: "start",
  },
  avatar_small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  card: {
    border: "none",
    boxShadow: "none",
  },
}));

// function getInitials(fullName) {
//   var splitNames = ("" + fullName).split(" ");
//   var initials = "";
//   for (const name of splitNames) {
//     initials += name.charAt(0);
//   }

//   return initials;
// }

export default function Comment({ name, message, timestamp, kudosCount }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Box px={1}>
            <Grid container justify="space-between">
              <Grid item container xs={10}>
                <Grid item>
                  <Box mr={1}>
                    <Avatar
                      alt={name}
                      className={classes.avatar_small}
                    ></Avatar>
                  </Box>
                </Grid>
                <Grid item className={classes.comment_content}>
                  <Typography className="commenterName" variant="subtitle">
                    {name} •&nbsp;
                  </Typography>
                  <Typography className="timestamp" variant="caption">
                    {timestamp}
                  </Typography>
                  <Typography variant="body2">{message}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="caption">5</Typography>
                <IconButton size="small" color="secondary">
                  <WhatshotIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
