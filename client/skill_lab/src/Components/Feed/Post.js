import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 500,
    display: "inline-block",
    alignItems: "start",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  body: {
    textAlign: "start",
  },
});

export default function Post() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <CardHeader
          avatar={<Avatar>B</Avatar>}
          title="Brian Tao"
          subheader="Feb 19, 2021"
        />
        <Typography className="body" variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button color="secondary" size="small" startIcon={<WhatshotIcon />}>
              Kudos
            </Button>
          </Grid>
          <Grid item xs>
            <Button color="primary" size="small" startIcon={<ShareIcon />}>
              Share
            </Button>
          </Grid>
          <Grid item xs>
            <Button size="small" startIcon={<ReportIcon />}>
              Report
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
