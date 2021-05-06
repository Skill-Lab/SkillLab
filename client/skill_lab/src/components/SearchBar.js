import React from "react";
import { AppBar, Avatar, Button, makeStyles, Toolbar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({

Search: {
  position: 'relative',
  borderRadius: "7em",
  width: '100%',
  backgroundColor: deepOrange[600],
  height: '40px',
  display: 'inline-block',
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(-15),
},
searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
inputRoot: {
  color: 'white',
},
inputInput: {
  padding: theme.spacing(1.3, 1, 1, 1),
  paddingLeft: theme.spacing(5), 
  width: '100%',
  color: 'white',
},
searchButton: {
  position: 'relative',
  display: 'inline-block',
},

}));

export default function SearchBar() {
  const classes = useStyles();

  
  return (
    <form >
        <div className={classes.Search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            placeholder="Search interest…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
        />
        </div>
        {/* <button type="submit">Search</button> */}
    </form>
  );
}
