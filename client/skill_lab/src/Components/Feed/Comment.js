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
  root: {
    width: "100%",
  },
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

export default function Comment({
  name,
  message,
  timestamp,
  kudosCount,
  kudosGiven,
}) {
  const classes = useStyles();
  var { DateTime } = require("luxon");

  const [kc, setKudosCount] = React.useState(kudosCount);
  const [kg, setKudosGiven] = React.useState(kudosGiven);

  const setKudos = () => {
    setKudosCount(kg ? kc - 1 : kc + 1);
    setKudosGiven(!kg);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Box m={-2}>
            <Grid container justify="space-between">
              <Grid item container xs={10}>
                <Grid item>
                  <Box mr={2}>
                    <Avatar
                      alt={name}
                      className={classes.avatar_small}
                    ></Avatar>
                  </Box>
                </Grid>
                <Grid item className={classes.comment_content}>
                  <Box display="inline-block">
                    <Typography className="commenterName" variant="subtitle2">
                      {name} •&nbsp;
                    </Typography>
                  </Box>
                  <Typography className="timestamp" variant="caption">
                    {DateTime.fromISO(timestamp).toLocaleString(
                      DateTime.DATETIME_SHORT
                    )}
                  </Typography>
                  <Typography variant="body2">{message}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="caption">{kc}</Typography>
                <IconButton
                  size="small"
                  color={kg ? "secondary" : "default"}
                  onClick={setKudos}
                >
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
