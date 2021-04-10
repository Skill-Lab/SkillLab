import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
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
    fontFamily: "Verdana ",
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

  //Retrieve user from redux
  const user = useSelector(selectUser);

  useEffect(() => {
    getUserSubspacesList(user).then((data) => {
      getSubspaces(data).then((data) => {
        setGroups(createGroups(data));
      });
    });
  }, [user]);
  return (
    <div >
      <LeftSidebar />
      <div className={classes.title}></div>
      <div className={classes.content}>
        <Grid container spacing={1}>
          {groups}
        </Grid>
      </div>
    </div>
  );
}
