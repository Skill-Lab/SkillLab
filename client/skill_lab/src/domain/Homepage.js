import {
  Backdrop,
  Box,
  Card,
  CardActions,
  CssBaseline,
  Grid,
  InputLabel,
  Fab,
  FormControl,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Button,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { deepOrange } from "@material-ui/core/colors";

import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import Post from "../components/Feed/Post";
// import { auth } from "../firebase";
import { selectGroups, selectUser } from "../store/reducers/userSlice";
import { db } from "../firebase";

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
  subspaceFormControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
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
          kudosCount={post.kudosCount}
          kudosGiven={post.kudosGiven}
          commentsData={post.commentsData}
        />
      </Box>
    );
  });
  return posts;
}

export default function Homepage() {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const history = useHistory();
  const user = useSelector(selectUser);
  const subspaces = useSelector(selectGroups);
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
      kudosCount: 8,
      kudosGiven: false,
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
      kudosCount: 108,
      kudosGiven: false,
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
  const [newPostMessage, setNewPostMessage] = React.useState("");
  const [selectedSubspace, setSelectedSubspace] = React.useState("");

  const addNewPost = () => {
    if (selectedSubspace === "") {
      alert("Select a subspace");
    }
    if (newPostMessage.trim() !== "") {
      // creating newPost is necessary for the key
      const newPost = {
        name: user.displayName,
        timestamp: DateTime.now().toString(),
        message: newPostMessage,
        kudosCount: 0,
        kudosGiven: false,
        subspace_id: "subspace/" + selectedSubspace,
        commentsData: [],
      };
      // Add a new post to DB with a generated id.
      db.collection("posts")
        .add(newPost)
        .then((docRef) => {
          console.log("Added post: Document written with ID: ", docRef.id);
          newPost.post_id = docRef.id;
        })
        .then(() => {
          console.log("New post id: ", newPost.post_id);
          setPosts([
            <Box key={JSON.stringify(newPost)} width="100%">
              <Post
                name={newPost.name}
                timestamp={newPost.timestamp}
                message={newPost.message}
                kudosCount={newPost.kudosCount}
                kudosGiven={newPost.kudosGiven}
                commentsData={newPost.commentsData}
                post_id={"posts/" + newPost.post_id}
              />
            </Box>,
            ...posts,
          ]);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      setNewPostMessage("");
      setSelectedSubspace("");
      setOpen(false);
    }
  };

  const cancelNewPost = () => {
    setOpen(false);
    setSelectedSubspace("AI");
    setNewPostMessage("");
  };

  //Retrieve User
  //Check if user logged in
  //If not logged in, redirect user to home page
  if (!user) return <Redirect to="/" />;

  // todo: method to push new post data to database?

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addNewPost();
      event.preventDefault();
    }
    if (event.key === "Escape") cancelNewPost();
  }

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
                    <FormControl className={classes.subspaceFormControl}>
                      <InputLabel>Subspace</InputLabel>
                      <Select
                        value={selectedSubspace}
                        onChange={(event) => {
                          setSelectedSubspace(event.target.value);
                          console.log(event.target.value);
                          console.log(selectedSubspace);
                        }}
                      >
                        {subspaces.map((subspace) => (
                          <MenuItem value={subspace.id} key={subspace.id}>
                            {subspace.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="What's on your mind?"
                      variant="filled"
                      value={newPostMessage}
                      onChange={(event) =>
                        setNewPostMessage(event.target.value)
                      }
                      onKeyPress={(event) => handleKeyPress(event)}
                      inputRef={(input) => input && input.focus()}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item container justify="center" spacing={3}>
                  <Grid item>
                    <Button onClick={cancelNewPost}>Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addNewPost}
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
