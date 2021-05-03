import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { useParams } from "react-router";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(20),
    flexGrow: 1,
    "& .MuiFormControl-root": {
      margin: theme.spacing(1),
      width: "60ch",
    },
  },

  input: {
    display: "none",
  },

  card: {
    width: "40rem",
    border: "none",
    marginLeft: "5rem",
    alignItems: "start",
    marginTop: "1rem",
  },
  content: {
    align: "center",
    border: "none",
    " & .MuiTypography-body2": {
      fontSize: 50,
    },
  },

  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontWeight: "fontWeightBold",
    fontSize: "24px",
  },

  form: {
    width: "90%",
  },

  button: {
    height: "30px",
    fontSize: "12px",
    marginLeft: theme.spacing(1),
  },

  description: {
    //margin: theme.spacing(1),
    width: "50ch",
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin] = useState("");
  const [twitter] = useState("");
  const [github] = useState("");
  const [dribbble] = useState("");
  const [website] = useState("");

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  function updateProfile() {
    var userRef = db.doc("users/" + user.uid);

    return userRef
      .update({
        email: email,
        linkedin: linkedin,
        twitter: twitter,
        github: github,
        dribbble: dribbble,
        website: website,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }

  var { user_id } = useParams();
  useEffect(() => {
    var docRef = db.collection("users").doc(user_id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("User first name:", doc.data().firstName);
          setName(doc.data().firstName + doc.data().lastName);
          setEmail(doc.data().email);
          setIsCurrentUser(user_id === user.uid);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setName("");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });
  function FormRow() {
    return (
      <Grid container spacing={3}>
        <Card className={classes.card} variant="outlined">
          <Card className={classes.content} variant="outlined">
            <CardHeader
              avatar={
                <Avatar className={classes.avatar}>{getInitials(name)}</Avatar>
              }
              title={name}
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
              disabled={!isCurrentUser}
            />
          </form>
          {isCurrentUser ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              //onClick={updateBio}
            >
              Update Bio
            </Button>
          ) : (
            <></>
          )}
        </Card>
      </Grid>
    );
  }

  function FormRowTwo() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
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
              defaultValue={email}
              disabled={!isCurrentUser}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="linkedin"
              label="LinkedIn"
              id="linkedin"
              autoFocus
              autoComplete="linkedin"
              disabled={!isCurrentUser}
              defaultValue={linkedin}
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
              disabled={!isCurrentUser}
              defaultValue={twitter}
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
              disabled={!isCurrentUser}
              defaultValue={github}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="dribbble"
              label="Dribbble"
              name="dribbble"
              autoComplete="dribbble"
              autoFocus
              disabled={!isCurrentUser}
              defaultValue={dribbble}
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
              disabled={!isCurrentUser}
              defaultValue={website}
            />
            {isCurrentUser ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                //className={classes.submit}
                onClick={() => updateProfile()}
              >
                Update Profile
              </Button>
            ) : (
              <></>
            )}
          </form>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid container item xs={6} sm={6} spacing={2}>
          <FormRow />
        </Grid>

        <Grid container item direction="row" xs={6} sm={6} spacing={2}>
          <FormRowTwo />
        </Grid>
      </Grid>
    </div>
  );
}
