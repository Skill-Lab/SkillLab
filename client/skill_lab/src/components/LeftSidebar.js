import { Divider, Drawer, makeStyles, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { selectUser } from "../store/reducers/userSlice";
import Groups from "./Groups";
import Mentors from "./Mentors";
import SimpleAccordion from "./SimpleAccordion";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));



export default function LeftSidebar() {
  const classes = useStyles();


  //Retrieve user from redux
  const user = useSelector(selectUser);

  //Create state for data being retrieved from db
  const [groups, setGroups] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentorsRefs, setMentorsRefs] = useState([]);

  //Call useEffect to run when componenet mounted for Mentors
  useEffect(() => {
    //Retrieving a specific user data from the collection called "users"
    //Using their user.uid to select specific user
    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
      //Check if the the user exists
      if (doc.exists) {
          setMentorsRefs(doc.data().mentors);
          console.log("Mentor refs " + mentorsRefs)
          mentorsRefs.forEach((item) => {
            console.log("Mentors start " + item)

            item.get().then((doc) => {
              if(doc.exists){
                var mentor = {
                  id: doc.id,
                  name: doc.data().firstName + " " + doc.data().lastName,
                }
                var mentorList = mentors;
                mentorList.push(mentor);
                setMentors(mentorList);
                console.log("Mentor " + mentor.name)

                
                //setMentors([...mentors, mentor ]);


                console.log("Mentors enter if " + mentors)
              }else{
                console.log("Mentors enter else " + mentors)
                setMentors([...mentors]);
              }
            })
          })

      } else {
          // doc.data() will be undefined in this case if user does not exist
          console.log("No such document!");
          setMentors([]); 
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });



  
  }, []);

  //Call useEffect to run when componenet mounted for Groups
  useEffect(() => {
    //Retrieving a specific user data from the collection called "users"
    //Using their user.uid to select specific user
    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
      //Check if the the user exists
      if (doc.exists) {
          //Set state with specific user data from db 
          // doc.data().<enter specific firebase attribute >
          setGroups(doc.data().groups) ;

      } else {
          // doc.data() will be undefined in this case if user does not exist
          console.log("No such document!");
          setGroups([]); 
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  
  }, []);

  

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Divider />
        <div className={classes.drawerContainer}>
          <Groups
            name="Groups"
            list={groups}
          />

          <Divider />
          <Mentors
            name="Mentors"
            list={mentors}
          />
        </div>
      </Drawer>
    </div>
  );
}
