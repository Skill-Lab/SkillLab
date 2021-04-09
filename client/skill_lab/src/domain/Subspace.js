import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  CssBaseline,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { deepOrange } from "@material-ui/core/colors";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import { db } from "../firebase";
import { selectUser } from "../store/reducers/userSlice";
import Post from "../components/Feed/Post";
import { DateTime } from "luxon";

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
          post_id={"posts/" + post.post_id}
        />
      </Box>
    );
  });
  return posts;
}

export default function Subspace() {
  const classes = useStyles();
  var { subspaceName } = useParams();

  var postsData = [];

  const [description, setDescription] = useState();
  const [members, setMembers] = useState();

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [newPostMessage, setNewPostMessage] = React.useState("");

  const addNewPost = () => {
    if (newPostMessage.trim() !== "") {
      // creating newPost is necessary for the key
      const newPost = {
        name: user.displayName,
        timestamp: DateTime.now().toString(),
        message: newPostMessage,
        kudos: 1,
        subspace_id: "subspace/" + subspaceName.toLowerCase(),
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
    }
    setOpen(false);
  };

  // const [subspaceName, setSubspaceName] = useState();
  // setSubspaceName(useParams());

  //Make retrieve data from db
  useEffect(() => {
    setLoading(true);
    var docRef = db.collection("subspace").doc(subspaceName.toLowerCase());
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data().description);
          setDescription(doc.data().description);
          setMembers(doc.data().memebers);
          //setMentors(doc.data().mentors);
          setPosts(doc.data().posts);

          db.collection("posts")
            .where(
              "subspace_id",
              "==",
              "subspace/" + subspaceName.toLowerCase()
            )
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var newPost = {
                  name: doc.data().name,
                  timestamp: doc.data().timestamp,
                  message: doc.data().message,
                  post_id: doc.id,
                  commentsData: [],
                };

                db.collection("comments")
                  .where("post_id", "==", "posts/" + doc.id)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc1) => {
                      var newComment = {
                        name: doc1.data().name,
                        timestamp: doc1.data().timestamp,
                        message: doc1.data().message,
                        post_id: doc1.data().post_id,
                        kudosCount: doc1.data().kudosCount,
                        kudosGiven: doc1.data().kudosGiven,
                        comment_id: "comments/" + doc1.id,
                      };
                      newPost.commentsData.push(newComment);
                      console.log("Reading doc ID ", doc1.data().message);
                    });
                    setPosts(createPosts(postsData));
                  })
                  .catch((error) => {
                    console.log("Error getting documents: ", error);
                  });
                postsData.push(newPost);
              });
              console.log("Reading doc ID ", doc.id);
              setPosts(createPosts(postsData));
              setLoading(false);
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
              setLoading(false);
            });

          console.log(postsData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setPosts(createPosts([]));
          setDescription("");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [subspaceName]);

  //Retrieve User
  const user = useSelector(selectUser);

  //Check if user logged in
  //If not logged in, redirect user to home page
  if (!user) return <Redirect to="/" />;

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addNewPost();
      event.preventDefault();
    }
  }

  return (
    <div className={classes.root}>
      <LeftSidebar />
      <CssBaseline />
      <Box mx="auto" p={2}>
        <Toolbar />
        <h1>{subspaceName}</h1>
        {loading ? <CircularProgress /> : <>{posts}</>}
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
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
