import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ShareIcon from "@material-ui/icons/Share";
import ReportIcon from "@material-ui/icons/Report";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/reducers/userSlice";

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

function createComments(cd) {
  let comments = cd.map((comment) => {
    return (
      <AccordionDetails>
        <Comment
          name={comment.name}
          message={comment.message}
          timestamp={comment.timestamp}
          kudosCount={comment.kudosCount}
          kudosGiven={comment.kudosGiven}
        />
      </AccordionDetails>
    );
  });

  return comments;
}

export default function Post(commentsData) {
  const classes = useStyles();
  const user = useSelector(selectUser);
  var { DateTime } = require("luxon");
  const cd = commentsData.commentsData;

  const [comments, setComments] = React.useState(createComments(cd));
  const [newComment, setNewComment] = React.useState("");

  const addNewComment = () => {
    cd.push({
      name: user.displayName,
      message: newComment,
      timestamp: DateTime.now().toString(),
      kudosCount: 0,
      kudosGiven: false,
    });
    setComments(createComments(cd));
    setNewComment("");
  };

  return (
    // <Box mx="auto" bgcolor="skyblue">
    <Card className={classes.root} variant="outlined">
      <Card className={classes.content} variant="outlined">
        <CardHeader
          className={classes.header}
          avatar={<Avatar>BT</Avatar>}
          title="Brian Tao"
          subheader={DateTime.now().toLocaleString(DateTime.DATETIME_MED)}
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
                id="textfield-comment"
                fullWidth
                placeholder="Add a comment..."
                multiline
                variant="outlined"
                size="small"
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={addNewComment}>
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Comments</Typography>
        </AccordionSummary>
        <>{comments}</>
      </Accordion>
    </Card>
    // </Box>
  );
}
