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
    width: "32rem",
    display: "inline-block",
    alignItems: "start",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    marginTop: "1rem",
  },
  header: {
    textAlign: "start",
  },
});

function createComments(cd) {
  let comments = cd.map((comment) => {
    return (
      <AccordionDetails key={JSON.stringify(comment)}>
        <Comment
          name={comment.name}
          timestamp={comment.timestamp}
          message={comment.message}
          kudosCount={comment.kudosCount}
          kudosGiven={comment.kudosGiven}
        />
      </AccordionDetails>
    );
  });
  return comments;
}

function getInitials(fullName) {
  var splitNames = ("" + fullName).split(" ");
  var initials = "";
  for (const name of splitNames) {
    initials += name.charAt(0);
  }

  return initials;
}

export default function Post({ name, timestamp, message, commentsData }) {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const { DateTime } = require("luxon");

  const [comments, setComments] = React.useState(createComments(commentsData));
  const [newCommentMessage, setNewCommentMessage] = React.useState("");

  const addNewComment = () => {
    console.log("Adding new comment");
    if (newCommentMessage.trim() !== "") {
      console.log("new comment: ", newCommentMessage);
      console.log("current comments: ", comments);
      const newComment = {
        name: user.displayName,
        timestamp: DateTime.now().toString(),
        message: newCommentMessage,
        kudosCount: 0,
        kudosGiven: false,
      };
      setComments([
        <AccordionDetails key={JSON.stringify(newComment)}>
          <Comment
            name={newComment.name}
            timestamp={newComment.timestamp}
            message={newComment.message}
            kudosCount={newComment.kudosCount}
            kudosGiven={newComment.kudosGiven}
          />
        </AccordionDetails>,
        ...comments,
      ]);
      console.log("after update: ", comments);
      setNewCommentMessage("");
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Card className={classes.content} variant="outlined">
        <CardHeader
          className={classes.header}
          avatar={<Avatar>{getInitials(name)}</Avatar>}
          title={name}
          subheader={DateTime.fromISO(timestamp).toLocaleString(
            DateTime.DATETIME_MED
          )}
        />
        <CardContent>
          <Typography className="body" variant="body2" align="left">
            {message}
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
                value={newCommentMessage}
                onChange={(event) => setNewCommentMessage(event.target.value)}
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
      <Accordion disabled={comments.length === 0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Comments ({comments.length})
          </Typography>
        </AccordionSummary>
        <>{comments}</>
      </Accordion>
    </Card>
  );
}
