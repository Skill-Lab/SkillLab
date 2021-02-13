import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logo_size: {
    width: "50%",
    height: "50%",
  },
}));

export default function WelcomePage() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Card variant="outlined">
        <CardContent>
          <img className={classes.logo_size} src="Skill_Lab_Logo.png" alt="" />
          <Typography variant="h5" component="h2">
            Creating a Mentorship Community of Shared Skills & Interests
          </Typography>
          <br></br>
          <Button color="primary" href="/signup">
            Sign Up
          </Button>
          <Button color="primary" href="/login">
            Login
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
