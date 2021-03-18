import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, CssBaseline, makeStyles, Toolbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import { auth,db } from "../firebase";
import { logout, selectUser } from "../store/reducers/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Subspace() {
  const classes = useStyles();

  let { subspaceName } = useParams();
  subspaceName = subspaceName.toLowerCase(); //set param to all lowercase
  
  const [description, setDescription] = useState();
  const [members, setMembers] = useState();
  const [mentors, setMentors] = useState();
  const [posts, setPosts] = useState();

  //Make retrieve data from db
  useEffect(() => {
    var docRef = db.collection("subspace").doc(subspaceName);
    docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data().description);
          setDescription(doc.data().description) 
          setMembers(doc.data().memebers)
          setMentors(doc.data().mentors)
          setPosts(doc.data().posts)
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  
  }, []);

  //Retrieve User
  const user = useSelector(selectUser);

  //Check if user logged in
  //If not logged in, redirect user to home page
  if (!user) return <Redirect to="/" />;


  return (
    <div className={classes.root}>
      <LeftSidebar />
      <CssBaseline />

      <main className={classes.content}>
        <Toolbar />
        <h1>{subspaceName}</h1>
        <h2>{description}</h2>
      </main>
    </div>
  );
}
