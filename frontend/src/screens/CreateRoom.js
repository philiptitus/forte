import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container, Slide, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoom } from '../actions/hostelActions';
import { useEffect } from 'react';
import { getUserDetails } from '../actions/userAction';
import { logout } from '../actions/userAction'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    backgroundColor: '#f9f9f9',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    position: 'relative', // Positioning for loader
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#78FF5B', // Custom color for the loader
    '& svg': {
      animation: '$spin 1s linear infinite', // Apply animation to the SVG element
    },
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  submitButton: {
    marginTop: theme.spacing(4),
    width: '50%',
    borderRadius: '25px',
    padding: theme.spacing(1.5),
    fontSize: '1.2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #5FCC9C, #78FF5B)',
    border: 0,
    color: 'white',
    transition: 'background 0.3s, transform 0.3s',
    position: 'relative',
    '&:hover': {
      background: 'linear-gradient(to right, #78FF5B, #5FCC9C)',
      transform: 'scale(1.05)',
    },
  },
  successMessage: {
    color: green[500],
    marginTop: theme.spacing(2),
  },
}));

const CreateRoom = () => {
const navigate = useNavigate()
const [capacity_1, setcapacity_1] = useState(0);
const [capacity_2, setcapacity_2] = useState(0);
const [capacity_4, setcapacity_4] = useState(0);
const dispatch = useDispatch()
const { enqueueSnackbar } = useSnackbar();
const userDetails = useSelector((state) => state.userDetails);
const {  user } = userDetails;

const roomCreate = useSelector((state) => state.roomCreate);
const { loading: loadingroom, error: errorroom, success, room } = roomCreate;



const classes = useStyles();
const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

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
    navigate('/forte')
  }
    }, [navigate,userInfo]);



const logoutHandler = () => {
  dispatch(logout())
  navigate('/forte')
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
    if (success) {
      enqueueSnackbar("Rooms Created You Can View Them Below", { variant: 'success' });
      navigate(`/hostel/${user.hostel}`);
    }
  }, [navigate, success]);





  const [formData, setFormData] = useState({
    capacity_1: '',
    capacity_2: '',
    capacity_4: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the value is a number before updating the state
    if (!isNaN(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    // Convert capacity values to integers
    const capacity1 = parseInt(capacity_1);
    const capacity2 = parseInt(capacity_2);
    const capacity4 = parseInt(capacity_4);
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Submit logic here (e.g., API call to create room)
      console.log('Form data submitted:', formData);
      // Reset form fields
      setcapacity_1(0);
      setcapacity_2(0);
      setcapacity_4(0);
      dispatch(
        createRoom({
          capacity_1: capacity1,
          capacity_2: capacity2,
          capacity_4: capacity4
        })
      );
      if (errorroom) {
        enqueueSnackbar(errorroom, { variant: 'error' });
      }
      // Set form submitted flag
      setFormSubmitted(true);
      setLoading(false); // Set loading state to false
    }, 2000); // Simulate loading time
  };

  
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails('profile'));
    }
  }, [dispatch, userInfo]);
  
  
  return (
    <Container component="main" maxWidth="xs">
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <Typography component="h1" variant="h4" style={{ marginBottom: '2rem', color: '#333' }}>
            Create Rooms
          </Typography>
          <i
          style={{
            fontSize:"small"
          }}
          >*Once You Create Hostel Rooms We Provide Room Numbers Rename Your Rooms According To Our Room Numbers For Easier Management</i>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="capacity_1"
              label="How Many Single Bed Rooms Do You Have"
              name="capacity_1"
              value={capacity_1}
              onChange={(e) => setcapacity_1(e.target.value)}
              type="number"
              InputProps={{ inputProps: { min: 0 } }} // Allow only positive numbers
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="capacity_2"
              label="How Many 2-Bed Rooms Do You Have"
              name="capacity_2"
              value={capacity_2}
              onChange={(e) => setcapacity_2(e.target.value)}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="capacity_4"
              label="How Many 4-Bed Rooms Do You Have"
              name="capacity_4"
              value={capacity_4}
              onChange={(e) => setcapacity_4(e.target.value)}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
            {loading && <CircularProgress size={40} className={classes.loader} />}
            <Button type="submit" variant="contained" className={classes.submitButton}>
              {loading ? '' : 'Create Rooms'}
            </Button>
          </form>
          {formSubmitted && success && (
            <Typography variant="h6" className={classes.successMessage}>
              New Rooms Added!
            </Typography>
          )}
        </div>
      </Slide>
    </Container>
  );
};

export default CreateRoom;
