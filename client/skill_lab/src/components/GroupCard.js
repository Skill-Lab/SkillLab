import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/userSlice";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function GroupCard({
  id,
  name,
  description,
  isJoined,
  imageURL,
}) {
  const [joinGroup, setJoinGroup] = useState(isJoined);

  //Retrieve user from redux
  const user = useSelector(selectUser);
  const classes = useStyles();

  //Add group to db
  function addGroup(id) {
    //groupData.name.isJoined = tr
    var entry = {
      subspace_id: id,
      subspace_name: name,
      user_id: user.uid,
      imageURL: imageURL,
    };
    db.collection("userSubspace")
      .add(entry)
      .then((docRef) => {
        console.log("Added Group to list" + docRef.id);
        setJoinGroup(true);
      });
  }

  //Delete group from db
  async function leaveGroup(id) {
    await db
      .collection("userSubspace")
      .where("user_id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().subspace_id === id) {
            doc.ref.delete();
            console.log("Successfully deleted group");
            setJoinGroup(false);
          }
        });
      });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Check if user has alread joined or not  */}
        {!joinGroup ? (
          <Button onClick={() => addGroup(id)} size="small" color="primary">
            Join
          </Button>
        ) : (
          <Button size="small" color="default" disabled={true}>
            Joined
          </Button>
        )}

        {!joinGroup ? (
          <Button size="small" color="primary">
            Learn More
          </Button>
        ) : (
          <Button onClick={() => leaveGroup(id)} size="small" color="secondary">
            Leave
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
