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

export default function Comment({ name, message, timestamp }) {
  const classes = useStyles();

  // const name = "Cindy Carrillo";
  // const message = "This is a comment";
  // const timestamp = "Yesterday";

  return (
    // <Card variant="outlined">
    // <div>
    //   <CardHeader
    //     className={classes.header}
    //     avatar={<Avatar></Avatar>}
    //     title={name}
    //     subheader={timestamp}
    //   />
    //   <CardContent>
    //     <Typography className="body" variant="body2" align="left">
    //       {message}
    //     </Typography>
    //   </CardContent>
    // </div>
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Box px={1}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <Avatar alt={name} className={classes.avatar_small}></Avatar>
              </Grid>
              <Grid item xs={10} className={classes.comment_content}>
                {/* <div className="comment-header-container"> */}
                <Typography className="commenterName" variant="subtitle">
                  {name} •&nbsp;
                </Typography>
                <Typography className="timestamp" variant="caption">
                  {timestamp}
                </Typography>
                <Typography variant="body2">{message}</Typography>
                {/* </div> */}
              </Grid>
              <Grid item xs={1}>
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
