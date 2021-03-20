import {
  Backdrop,
  Box,
  Card,
  CardActions,
  CssBaseline,
  Grid,
  Fab,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
  Button,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { deepOrange } from "@material-ui/core/colors";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Post from "../components/Feed/Post";
import { auth } from "../firebase";
import { logout, selectUser } from "../store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    backgroundColor: deepOrange[600],
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  postCreationCard: {
    width: "32rem",
  },
}));

function createPosts(pd) {
  let posts = pd.map((post) => {
    return (
      <Box key={JSON.stringify(post)} width="100%">
        <Post
          name={post.name}
          timestamp={post.timestamp}
          message={post.message}
          commentsData={post.commentsData}
        />
      </Box>
    );
  });
  return posts;
}

export default function Homepage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const { DateTime } = require("luxon");

  var postsData = [
    {
      name: "Brian Tao",
      timestamp: DateTime.now(),
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.`,
      commentsData: [
        {
          name: "Cindy Carrillo",
          message: "This is the first comment",
          timestamp: "2020-05-15T08:30:10",
          kudosCount: 8,
          kudosGiven: false,
        },
        {
          name: "Nathan Abegaz",
          message: "This is the second comment",
          timestamp: "2021-02-11T11:33:30",
          kudosCount: 79,
          kudosGiven: false,
        },
        {
          name: "Alexis Huerta",
          message: "This is the third comment",
          timestamp: "2021-01-09T15:01:12",
          kudosCount: 301,
          kudosGiven: true,
        },
      ],
    },
    {
      name: "Alexis Huerta",
      timestamp: DateTime.now(),
      message: `This is a shorter post message.`,
      commentsData: [
        {
          name: "Cindy Carrillo",
          message: "This is the first comment",
          timestamp: "2020-05-15T08:30:10",
          kudosCount: 8,
          kudosGiven: false,
        },
        {
          name: "Nathan Abegaz",
          message: "This is the second comment",
          timestamp: "2021-02-11T11:33:30",
          kudosCount: 79,
          kudosGiven: false,
        },
      ],
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState(createPosts(postsData));
  console.log(posts);
  const [newPostContent, setNewPostContent] = React.useState("");
  const addPost = () => {
    if (newPostContent.trim() !== "") {
      postsData.push({
        name: user.displayName,
        timestamp: DateTime.now(),
        message: newPostContent,
        commentsData: [],
      });
      setPosts(createPosts(postsData));
      // const newPost = {
      //   name: user.displayName,
      //   timestamp: DateTime.now(),
      //   message: newPostContent,
      //   commentsData: [],
      // };
      // posts.push();
      // setPosts(posts);
    }
    setOpen(false);
  };

  //Retrieve User
  //Check if user logged in
  //If not logged in, redirect user to home page
  if (!user) return <Redirect to="/" />;

  // todo: method to push new post data to database?

  return (
    <div className={classes.root}>
      <LeftSidebar />
      <CssBaseline />
      <Box mx="auto" p={2}>
        <Toolbar />
        <>{posts}</>
      </Box>
      <Fab
        variant="extended"
        className={classes.fab}
        onClick={() => setOpen(true)}
      >
        <CreateIcon className={classes.extendedIcon} />
        New Post
      </Fab>
      <Backdrop className={classes.backdrop} open={open}>
        <Card className={classes.postCreationCard}>
          <Box pb={2}>
            <CardActions>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Box p={1}>
                    <TextField
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="What's on your mind?"
                      variant="filled"
                      value={newPostContent}
                      onChange={(event) =>
                        setNewPostContent(event.target.value)
                      }
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item container justify="center" spacing={3}>
                  <Grid item>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addPost}
                    >
                      Post
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>
          </Box>
        </Card>
      </Backdrop>
    </div>
  );
}
