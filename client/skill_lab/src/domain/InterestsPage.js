import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  Grid,
  makeStyles,
  IconButton,
  Backdrop,
  Box,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import LeftSidebar from "../components/LeftSidebar";
import GroupCard from "../components/GroupCard";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/userSlice";

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

  const closeSubspaceCreationCard = () => {
    setOpen(false);
    setNewSubspaceName("");
    setNewSubspaceDesc("");
    setNewSubspaceImgUrl("");
  };

  const createNewSubspace = () => {
    // TODO: post this data to the database and create a new group from the data
    // Also add the user as a member of this group
    console.log(newSubspaceName, newSubspaceDesc, newSubspaceImgUrl);
    closeSubspaceCreationCard();
  };

  useEffect(() => {
    getUserSubspacesList(user).then((data) => {
      getSubspaces(data).then((data) => {
        const groups = createGroups(data);
        const createGroupCard = (
          <Grid key="createGroupCard" item xs={3}>
            <Card className={classes.card}>
              <CardActions>
                <IconButton onClick={() => setOpen(true)}>
                  <AddCircleIcon className={classes.addButton} />
                </IconButton>
              </CardActions>
              Create a New Group
            </Card>
          </Grid>
        );
        setGroups([...groups, createGroupCard]);
      });
    });
  }, [user, classes.card, classes.addButton]);

  return (
    <div>
      <LeftSidebar />
      <div className={classes.title}></div>
      <div className={classes.content}>
        <Grid container spacing={1}>
          {groups}
        </Grid>
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
      </div>
    </div>
  );
}
