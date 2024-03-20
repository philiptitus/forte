import React, { useState, useEffect } from 'react';
import { Button, Typography, makeStyles, Paper } from '@material-ui/core';
import { deleteHostel } from '../actions/hostelActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader2';
import {  Snackbar } from '@mui/material';
import { getUserDetails,updateUserProfile} from '../actions/userAction';

import { logout } from '../actions/userAction'




const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  paragraph: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
  },
}));

const HostelDelete = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hostelDelete = useSelector((state) => state.hostelDelete);
  const { loading: loadinghostel, error: errorhostel, success:successhostel } = hostelDelete;
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;

  const navigate = useNavigate();
  const [hasExpired, setHasExpired] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const expirationTime = userInfo?.expiration_time


  // useEffect(() => {
  //   if (!user) {
  //     logoutHandler()
  //   }
  //     }, [navigate]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    }
      }, [navigate,userInfo]);


  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
    window.location.reload();
    
  };



      
  useEffect(() => {
    // Parse the expiration time string into components
    if (userInfo) {
      
    const [, year, month, day, hour, minute, second] = expirationTime.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);

    // Create a Date object with the parsed components
    const expirationDateTime = new Date(year, month - 1, day, hour, minute, second);

    // Update the state with the expiration time
    setCurrentTime(new Date());
    setHasExpired(expirationDateTime < new Date());

    // Set up a timer to update the current time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }

  }, [expirationTime]); // Run effect whenever expirationTime changes



  useEffect(() => {
    if (hasExpired) {
      logoutHandler()
    }
      }, [navigate, hasExpired]);
    
    



  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
        dispatch(getUserDetails('profile'));

    }
  }, [navigate, userInfo]);

  const handleDelete = () => {
    dispatch(deleteHostel())
    // Add logic to handle hostel deletion
  };

  return (
    <Paper className={classes.root} elevation={5}>
        {loadinghostel && <Loader/>}
        {successhostel && 
        navigate("/")
        }
                            <Snackbar 
        open={errorhostel}
        message={errorhostel}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Typography variant="h5" className={classes.title} gutterBottom>
        Before Deleting Hostel:
      </Typography>
      <Typography className={classes.paragraph}>
        Before proceeding with the deletion, please ensure the following steps are taken:
      </Typography>
      <Typography className={classes.paragraph}>
        1. Make sure all rooms within the hostel are empty.
      </Typography>
      <Typography className={classes.paragraph}>
        2. Check To Ensure That There Is No Active Accommodation.
      </Typography>
      <Typography className={classes.paragraph}>
        3. Check To Ensure All Payments Are Settled.
      </Typography>
      <Typography className={classes.paragraph}>

        Once these steps are completed, you can proceed with deleting the hostel. Please note that this action cannot be undone. We won't Be unswarable to any complaints from your customers as well. Goodbye! It Was Nice Having You.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleDelete}
      >
        Delete Hostel

      </Button>
    </Paper>
  );
};

export default HostelDelete;
