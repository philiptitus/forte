import React, { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, IconButton, Tooltip, Avatar, Grid, Paper } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import EditIcon from '@material-ui/icons/Edit';
import { green, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Popup from '../components/PopUp';
import { listRoomDetails } from '../actions/hostelActions';
import { useNavigate } from 'react-router-dom';
import RoomForm from '../components/RoomForm';
import { logout } from '../actions/userAction'
import Loader from '../components/Loader2';

import { getUserDetails } from '../actions/userAction';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  roomNumber: {
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
  },
  roomDetails: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  available: {
    color: green[500],
  },
  notAvailable: {
    color: red[500],
  },
  damages: {
    color: red[500],
  },
  editButton: {
    marginTop: theme.spacing(2),
  },
}));

const RoomScreen = () => {
  const classes = useStyles();
  const { id } = useParams();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const roomDetail = useSelector((state) => state.roomDetail);
  const { error, loading:loadingroom, room } = roomDetail;
  const { enqueueSnackbar } = useSnackbar();


  const roomEdit = useSelector((state) => state.roomEdit);
  const { loading, error:errorRoom, success } = roomEdit;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [hasExpired, setHasExpired] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());

const expirationTime = userInfo?.expiration_time





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
    if (userInfo) {
      dispatch(listRoomDetails(id));
    }
  }, [dispatch, userInfo, success]);


  useEffect(() => {
    if (success) {
      enqueueSnackbar("Room Info Updated", { variant: 'success' });
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [navigate, success, error]);


  return (

    <div>


{  loadingroom? (
  <Loader/>
) : room?


(<div className={classes.root}>
      <Typography variant="h4" gutterBottom align="center">
        Room Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <RoomIcon fontSize="large" color="primary" />
            </Avatar>
            <Typography variant="h6" className={classes.roomNumber}>
              Room {room.id}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="body1">
              Capacity: {room.capacity}
            </Typography>
            <Typography variant="body1" className={clsx(room.isAvailable ? classes.available : classes.notAvailable)}>
              {room.isAvailable ? 'Status: Available' : 'Status: Not Available'}
            </Typography>
            <Typography variant="body1">
              Current Occupancy: {room.current_occupancy}
            </Typography>
            {room.damages && (
              <Typography variant="body1" className={classes.damages}>
                Damages: Yes
              </Typography>
            )}
            {room.damages && room.cost_of_damage && (
              <Typography variant="body1" className={classes.damages}>
                Cost of Damage: ${room.cost_of_damage}
              </Typography>
            )}
            <Divider style={{ marginTop: '20px', width: '100%' }} />
            <Tooltip title="Edit Room" aria-label="edit-room">
             <IconButton className={classes.editButton}>

             <Popup
  component={<RoomForm id={id} roomNumber={room.room_number} roomAvailable={room.isAvailable ? 'True' : 'False'} />}
  icon={EditIcon}
/>

              </IconButton>


            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
    </div>
):(

  <h1>The Item You Are Looking For Does Not Exist</h1>


)
    
}


    </div>


  );
};

export default RoomScreen;
