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
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
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
    right: theme.spacing(39),
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
    console.log("Here is post kudosCount: " + post.kudosCount);
    return (
      <Box key={JSON.stringify(post)} width="100%">
        <Post
          name={post.name}
          timestamp={post.timestamp}
          message={post.message}
          kudosCount={post.kudosCount}
          kudosGiven={post.kudosGiven}
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

  const [members, setMembers] = useState([]);
  // const [description, setDescription] = useState(
  //   createSampleDescription(subspaceName, sampleMembers.length)
  // );
  const [description, setDescription] = useState();

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
        kudosCount: 0,
        kudosGiven: false,
        subspace_id: "subspace/" + subspaceName.toLowerCase(),
        commentsData: [],
        user_id: user.uid,
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
    }
    setOpen(false);
  };

  //Make retrieve posts from db
  useEffect(() => {
    setLoading(true);
    var docRef = db.collection("subspace").doc(subspaceName.toLowerCase());
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data().description);
          setDescription(doc.data().description);
          //setMentors(doc.data().mentors);
          setPosts(doc.data().posts);

          db.collection("posts")
            .where(
              "subspace_id",
              "==",
              "subspace/" + subspaceName.toLowerCase()
            )
            .orderBy("timestamp")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                var newPost = {
                  name: doc.data().name,
                  timestamp: doc.data().timestamp,
                  message: doc.data().message,
                  post_id: doc.id,
                  kudosCount: doc.data().kudosCount,
                  kudosGiven: doc.data().kudosGiven,
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
              var orderedPostsData = postsData.reverse();
              setPosts(createPosts(orderedPostsData));
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

  //Render group memebers from db
  useEffect(() => {
    const groupMemberList = [];

    //Retreive collection userSubspace
    db.collection("userSubspace")
      //Search through each doc ref
      //Find where subspace name for each doc is equal to current subspace name
      .where("subspace_id", "==", subspaceName.toLowerCase())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //Store each member as an object
          var member = {
            id: doc.data().user_id,
            name: doc.data().user_name,
          };
          //Add member to list

          //TODO: add memeber as object instead of string array
          groupMemberList.push(member);
        });
        console.log("I have entedred to ");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setMembers(groupMemberList);
  }, [subspaceName]);

  //Retrieve User
  const user = useSelector(selectUser);

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
      {/* Right now the members are sample data bc database doesn't have members for subspaces, it seems */}
      <RightSidebar description={description} members={members} />
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
