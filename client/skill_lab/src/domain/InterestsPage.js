import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import LeftSidebar from "../components/LeftSidebar";
import GroupCard from "../components/GroupCard";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/userSlice";

const groupsData = [
  {
    id: "computer science",
    name: "Computer Science",
    description: "This is a computer science subspace",
    isJoined: false,
    imageURL:
      "https://www.mercy.edu/sites/default/files/2020-07/iStock-1182604339.jpg",
  },
  {
    id: "biology",
    name: "Biology",
    description: "This is a biology subspace",
    isJoined: true,
    imageURL:
      "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
  },
  {
    id: "enterpreneurship",
    name: "Enterpreneurship",
    description: "This is a enterpreneurship subspace",
    isJoined: false,
    imageURL:
      "https://i0.wp.com/www.iedunote.com/img/245/entrepreneurship-what-is-the-modern-definition-of-entrepreneur.jpg?fit=2190%2C1689&quality=100&ssl=1",
  },

  {
    id: "ai",
    name: "AI",
    description: "This is an AI subspace",
    isJoined: false,
    imageURL:
      "https://images.idgesg.net/images/article/2018/10/ai_artificial-intelligence_circuit-board_circuitry_mother-board_nodes_computer-chips-100777423-large.jpg",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "This is a chemistry subspace",
    isJoined: false,
    imageURL:
      "https://jobs.newscientist.com/getasset/c40a5488-11be-43b0-843f-a2e6ef9f0612/",
  },
  {
    id: "math",
    name: "Math",
    description: "This is a math subspace",
    isJoined: false,
    imageURL: "https://miro.medium.com/max/6000/1*L76A5gL6176UbMgn7q4Ybg.jpeg",
  },
];

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
    paddingLeft: theme.spacing(60),
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
    <div className={classes.root}>
      <LeftSidebar />
      <div className={classes.title}> Select at least 3 interests</div>
      <div className={classes.content}>
        <Grid container spacing={1}>
          {groups}
        </Grid>
      </div>
    </div>
  );
}
