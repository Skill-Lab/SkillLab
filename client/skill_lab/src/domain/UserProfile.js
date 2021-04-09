import React, {Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
      marginLeft:theme.spacing(10),
      marginTop:theme.spacing(20),
      flexGrow: 1,
      '& .MuiFormControl-root':{
        margin: theme.spacing(1),
        width: '60ch',
      },
  },

  input: {
    display: 'none',
  },

  card: {
    width: "40rem",
    border: 'none',
    marginLeft: "5rem",
    alignItems: "start",
    marginTop: "1rem",
  },
  content: {
    align: "center",
    border: 'none',
    ' & .MuiTypography-body2':{
      fontSize: 50,
    },
  },

  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight:"fontWeightBold" ,
    fontSize:"24px",
  },

  form: {
    width: "90%",
  },

  button:{
    height: "30px",
    fontSize:"12px",
    marginLeft:theme.spacing(1),
  },


  description: {
    //margin: theme.spacing(1),
    width: '50ch',
  },
}));

function getInitials(fullName) {
  var splitNames = ("" + fullName).split(" ");
  var initials = "";
  for (const name of splitNames) {
    initials += name.charAt(0);
  }
  return initials;
}

export default function Profile() {
  const classes = useStyles();
  const user = useSelector(selectUser);

  function FormRow() {
    return (
      <Grid container spacing={3}>
            <Card className={classes.card} variant="outlined">
              <Card className={classes.content} variant="outlined">
                <CardHeader
                  avatar={<Avatar className={classes.avatar}>{getInitials(user.displayName)}</Avatar>}
                  title={user.displayName}
                />
              </Card>
              <form className={classes.description} noValidate autoComplete="off">
                    <TextField
                      id="filled-multiline-static"
                      label="Bio"
                      multiline
                      rows={8}
                      defaultValue="My name is John and I have 3 years of industry experience in software development..."
                      variant="filled"
                    />
                </form>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  //onClick={updateBio}
                >
                  Update Bio
                </Button>
            </Card>
      </Grid>
    );
  }

  function FormRowTwo() {
    return (
      <React.Fragment>
        <Grid item xs={12} >
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="linkedin"
              label="LinkedIn"
              id="linkedin"
              autoComplete="linkedin"
              //value={linkedin}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="twitter"
              label="Twitter"
              name="twitter"
              autoComplete="twitter"
              autoFocus
              //value={twitter}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="github"
              label="GitHub"
              name="github"
              autoComplete="github"
              autoFocus
              //value={github}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="dribble"
              label="Dribble"
              name="dribble"
              autoComplete="dribble"
              autoFocus
              //value={dribble}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="website"
              label="Website"
              name="website"
              autoComplete="website"
              autoFocus
              //value={website}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              //className={classes.submit}
              //onClick={updateProfile}
            >
              Update Profile
            </Button>
          </form>     
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        
        <Grid container item xs={6} sm ={6} spacing={2}>
          <FormRow />
        </Grid>
        
        <Grid  container item  direction="row" xs={6} sm ={6} spacing={2}  >
          <FormRowTwo />
        </Grid>
       
      </Grid>
    </div>
  );
    
}