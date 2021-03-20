import React  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import  Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles((theme) => ({
  root: {
      marginLeft:theme.spacing(15),
      marginTop:theme.spacing(20),
    flexGrow: 1,
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

}));

export default function Profile() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={12}>

          <Box className = {classes.avatar}>
            <Avatar/>
          </Box>  
          <Box className = {classes.paper}>
            <Typography variant="body1"  component="p" >
                This is my bio and description about myself blah blah blah
            </Typography>
          </Box>  

        </Grid>
      </React.Fragment>
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
              //value={email}
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