import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Container,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import Comment from "./Comment";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    maxWidth: 450,
    display: "inline-block",
    alignItems: "start",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    margin: "auto",
  },
  header: {
    textAlign: "start",
  },
});

function createComments(commentsData) {
  let comments = commentsData.map((comment) => {
    return (
      <Comment
        name={comment.name}
        message={comment.message}
        timestamp={comment.timestamp}
        kudosCount={comment.kudosCount}
      />
    );
  });

  return comments;
}

export default function Post() {
  const classes = useStyles();

  var commentsData = [
    {
      name: "Cindy Carrillo",
      message: "This is the first comment",
      timestamp: "Today",
      kudosCount: 8,
    },
    {
      name: "Nathan Abegaz",
      message: "This is the second comment",
      timestamp: "Yesterday",
      kudosCount: 79,
    },
    {
      name: "Alexis Huerta",
      message: "This is the third comment",
      timestamp: "Last Friday",
      kudosCount: 301,
    },
  ];

  return (
    // <Box mx="auto" bgcolor="skyblue">
    <Card className={classes.root} variant="outlined">
      <Card className={classes.content} variant="outlined">
        <CardHeader
          className={classes.header}
          avatar={<Avatar>BT</Avatar>}
          title="Brian Tao"
          subheader="Feb 19, 2021"
        />
        <CardContent>
          <Typography className="body" variant="body2" align="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </CardContent>
        <CardActions>
          <Box width={1} mx={1} mb={1}>
            <Grid container justify="center" spacing={6}>
              <Grid item>
                <Button
                  color="secondary"
                  size="small"
                  startIcon={<WhatshotIcon />}
                >
                  Kudos
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" size="small" startIcon={<ShareIcon />}>
                  Share
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" startIcon={<ReportIcon />}>
                  Report
                </Button>
              </Grid>
            </Grid>
            <Box mt={2}>
              <TextField
                fullWidth
                placeholder="Add a comment..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </CardActions>
      </Card>
      <>{createComments(commentsData)}</>
    </Card>
    // </Box>
  );
}
