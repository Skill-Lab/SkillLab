import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import LeftSidebar from "../components/LeftSidebar";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({

  title: {
    padding: theme.spacing(10),
    paddingLeft:theme.spacing(90),
    fontWeight: "bold",
    color: "#ffa366",
    fontFamily: "Verdana ",
    fontSize: 20,  
  },

  content: {
    margin: 'auto',
    paddingLeft:theme.spacing(60),
},

  buttonColor: {
    "&.Mui-selected": {
      backgroundColor: "#ff6666",
    },
    "&.Mui-hover": {
      backgroundColor: "blue",
    },
  },
}));

export default function InterestPage() {
  const classes = useStyles();
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    if (newFormats.length) {
      setFormats(newFormats);
    }
  };

  return (
    <div className={classes.root}>
      <LeftSidebar />

      <div  className={classes.title}> Select at least 3 interests</div>

      <div className={classes.content}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              className={classes.toggleButton}
              value={formats}
              onChange={handleFormat}
            >
              <ToggleButton value="physics" className={classes.buttonColor}>
                Physics
              </ToggleButton>
              <ToggleButton value="chemistry" className={classes.buttonColor}>
                Chemistry
              </ToggleButton>
              <ToggleButton value="biology" className={classes.buttonColor}>
                Biology
              </ToggleButton>
              <ToggleButton value="computer" className={classes.buttonColor}>
                Computer Science
              </ToggleButton>
              <ToggleButton value="psychology" className={classes.buttonColor}>
                Psychology
              </ToggleButton>
              <ToggleButton value="geology" className={classes.buttonColor}>
                Geology
              </ToggleButton>
              <ToggleButton value="geography" className={classes.buttonColor}>
                Geography
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.toggleContainer}>
              <ToggleButtonGroup value={formats} onChange={handleFormat}>
                <ToggleButton value="resume" className={classes.buttonColor}>
                  Resume
                </ToggleButton>
                <ToggleButton
                  value="interviews"
                  className={classes.buttonColor}
                >
                  Interviews
                </ToggleButton>
                <ToggleButton value="studying" className={classes.buttonColor}>
                  Studying
                </ToggleButton>
                <ToggleButton
                  value="networking"
                  className={classes.buttonColor}
                >
                  Networking
                </ToggleButton>
                <ToggleButton value="time" className={classes.buttonColor}>
                  Time Management
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.toggleContainer}>
              <ToggleButtonGroup value={formats} onChange={handleFormat}>
                <ToggleButton value="ai" className={classes.buttonColor}>
                  Artificial Intelligence
                </ToggleButton>
                <ToggleButton value="ml" className={classes.buttonColor}>
                  Machine Learning
                </ToggleButton>
                <ToggleButton value="web" className={classes.buttonColor}>
                  Web Development
                </ToggleButton>
                <ToggleButton value="mobile" className={classes.buttonColor}>
                  Mobile Development
                </ToggleButton>
                <ToggleButton value="hardware" className={classes.buttonColor}>
                  Hardware
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </Grid>
        </Grid>

        <Button
            type="submit"
            variant="contained"
            className={classes.submit}
            //onClick={}
          >
            Submit
          </Button>
      </div>
    </div>
  );
}
