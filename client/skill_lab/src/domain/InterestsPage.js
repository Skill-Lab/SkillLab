import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  Grid,
  makeStyles,
  IconButton,
  Backdrop,
  Box,
  TextField,
  Button,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import LeftSidebar from "../components/LeftSidebar";
import GroupCard from "../components/GroupCard";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/userSlice";
import CreateIcon from "@material-ui/icons/Create";
import SearchBar from "../components/SearchBar";
import { deepOrange } from "@material-ui/core/colors";
import Fuse from "fuse.js";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(10),
    paddingLeft: theme.spacing(90),
    fontWeight: "bold",
    color: "#ffa366",
    fontFamily: "Verdana",
    fontSize: 20,
  },
  content: {
    margin: "auto",
    paddingLeft: theme.spacing(31),
  },
  buttonColor: {
    "&.Mui-selected": {
      backgroundColor: "#ff6666",
    },
    "&.Mui-hover": {
      backgroundColor: "blue",
    },
  },
  card: {
    maxWidth: 345,
    height: 178,
    padding: 50,
  },
  addButton: {
    height: 100,
    width: 100,
  },
  createSubspaceCard: {
    width: "32rem",
  },
  createSubspaceFormControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  searchbar: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    alignItems: "center",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    alignItems: "center",
  },
  fab: {
    color: theme.palette.common.white,
    backgroundColor: deepOrange[600],
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export async function getUserSubspacesList(user) {
  const userSubspaces = [];

  await db
    .collection("userSubspace")
    .where("user_id", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        userSubspaces.push(doc.data().subspace_id);
      });
    });
  return userSubspaces;
}

async function getSubspaces(userSubspaces) {
  console.log("Groups data: " + userSubspaces);

  const subspaces = [];

  await db
    .collection("subspace")
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        var subspace = {
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          imageURL: doc.data().imageURL,
          isJoined: userSubspaces.includes(doc.id),
        };
        subspaces.push(subspace);
      });
    });
  return subspaces;
}

async function getSubspacesNames() {
  const subspacesNames = [];

  await db
    .collection("subspace")
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        subspacesNames.push(doc.data().name.toLowerCase());
      });
    });
  return subspacesNames;
}

function createGroups(groupsData) {
  let groups = groupsData.map((group) => {
    return (
      <Grid key={JSON.stringify(group)} item xs={3}>
        <GroupCard
          id={group.id}
          name={group.name}
          description={group.description}
          isJoined={group.isJoined}
          imageURL={group.imageURL}
        />
      </Grid>
    );
  });
  return groups;
}

export default function InterestPage() {
  const classes = useStyles();
  const [groups, setGroups] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [newSubspaceName, setNewSubspaceName] = React.useState("");
  const [newSubspaceDesc, setNewSubspaceDesc] = React.useState("");
  const [newSubspaceImgUrl, setNewSubspaceImgUrl] = React.useState("");
  //Retrieve user from redux
  const user = useSelector(selectUser);
  const [groupsJSON, setGroupsJSON] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const [loading, setLoading] = useState(true);

  const fuse = new Fuse(groupsJSON, {
    keys: ["name"],
  });
  const results = fuse.search(query);
  console.log("Results: " + JSON.stringify(results));
  const matchedResults = query
    ? results.map((result) => result.item)
    : groupsJSON;

  const closeSubspaceCreationCard = () => {
    setOpen(false);
  };
  const clearFields = () => {
    setNewSubspaceName("");
    setNewSubspaceDesc("");
    setNewSubspaceImgUrl("");
  };
  const createNewSubspace = () => {
    getSubspacesNames().then((data) => {
      //Check if subspaces already exists
      if (data.includes(newSubspaceName.toLowerCase())) {
        alert("Subspaces already exists");
      } else if (newSubspaceName.trim() === "") {
        alert("Please enter Subspace Name");
      } else {
        console.log("Subspaces does not exists");
        // Add a new group to DB
        db.collection("subspace")
          .doc(newSubspaceName.toLowerCase())
          .set({
            name: newSubspaceName,
            description: newSubspaceDesc,
            imageURL: newSubspaceImgUrl,
          })
          .then(() => {
            setGroupsJSON([
              {
                id: newSubspaceName,
                name: newSubspaceName,
                description: newSubspaceDesc,
                isJoined: false,
                imageURL: newSubspaceImgUrl,
              },
              ...groupsJSON,
            ]);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        closeSubspaceCreationCard();
      }
    });
    clearFields();
  };

  useEffect(() => {
    setLoading(true);
    getUserSubspacesList(user).then((data) => {
      getSubspaces(data).then((data) => {
        setGroupsJSON(data);
        setLoading(false);
      });
    });
  }, [user, classes.card, classes.addButton]);
  //const results = fuse.search("AI");
  //console.log("Groups JSON: " + JSON.stringify(groupsJSON));
  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    <div>
      <LeftSidebar />
      <div className={classes.title}></div>
      <div className={classes.content}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={classes.searchbar}>
              <SearchBar value={query} onChange={handleOnSearch} />
            </div>
            <Grid container spacing={1}>
              {createGroups(matchedResults)}
            </Grid>
            <Fab
              variant="extended"
              className={classes.fab}
              onClick={() => setOpen(true)}
            >
              <CreateIcon className={classes.extendedIcon} />
              New Group
            </Fab>
            <Backdrop className={classes.backdrop} open={open}>
              <Card className={classes.createSubspaceCard}>
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
                            label="Subspace Name"
                            fullWidth
                            variant="filled"
                            value={newSubspaceName}
                            onChange={(event) =>
                              setNewSubspaceName(event.target.value)
                            }
                          ></TextField>
                        </Box>
                        <Box p={1}>
                          <TextField
                            label="Subspace Description"
                            multiline
                            rows={5}
                            fullWidth
                            variant="filled"
                            value={newSubspaceDesc}
                            onChange={(event) =>
                              setNewSubspaceDesc(event.target.value)
                            }
                          ></TextField>
                        </Box>
                        <Box p={1}>
                          <TextField
                            label="Link to Subspace Cover Image"
                            fullWidth
                            variant="filled"
                            value={newSubspaceImgUrl}
                            onChange={(event) =>
                              setNewSubspaceImgUrl(event.target.value)
                            }
                          ></TextField>
                        </Box>
                      </Grid>
                      <Grid item container justify="center" spacing={3}>
                        <Grid item>
                          <Button onClick={closeSubspaceCreationCard}>
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={createNewSubspace}
                          >
                            Create
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Box>
              </Card>
            </Backdrop>{" "}
          </>
        )}
      </div>
    </div>
  );
}
