import { Button } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { logout, selectUser } from '../store/reducers/userSlice';

export default function Homepage() {
    const dispatch = useDispatch();
    const history = useHistory();
    
    //Retrieve User 
    const user = useSelector(selectUser);

    //Check if user logged in
    //If not logged in, redirect user to home page
    if(!user) return <Redirect to="/" />


    //Handle logout function from firebase & redux
    const signout = () => {
        dispatch(logout);
        auth.signOut();
        history.push("/");
    };

    return (
        <div>
            <h1>HomePage</h1>
            <h3>Hello {user.displayName}</h3>
            <Button onClick={signout}>Logout</Button>
        </div>
    )
}
