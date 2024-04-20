import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container, Slide, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { createHostel } from '../actions/hostelActions';
import { MenuItem } from '@mui/material';
import InputAdornment from '@material-ui/core/InputAdornment';
import { logout } from '../actions/userAction'
import { getUserDetails } from '../actions/userAction';

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
  videoLink: {
    marginTop: theme.spacing(2),
  },
}));

const genders = [
  { value: 'male', label: 'Male Hostel' },
  { value: 'female', label: 'Female Hostel' },


];

const CreateHostel = () => {
  const navigate = useNavigate()
  const classes = useStyles();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [hostel_name, sethostel_name] = useState('');
  const [address, setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');

  const [hasExpired, setHasExpired] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const expirationTime = userInfo?.expiration_time

  const [stripe_key, setstripe_key] = useState('');
  // const [stripe_webhook, setstripe_webhook] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch()

  const hostelCreate = useSelector((state) => state.hostelCreate);
  const { loading: loadinghostel, error: errorhostel, success, hostel } = hostelCreate;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;



    
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
      enqueueSnackbar("Great You Made Your Hostel :),  Now Specify Your Rooms", { variant: 'success' });
      navigate('/newroom');
    }
  }, [navigate, success]);




  const [formData, setFormData] = useState({
    hostel_name: '',
    stripe_key: '',
    // stripe_webhook : '',
    address: '',
    gender:'',
    phone:'',
    email:''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Submit logic here (e.g., API call to create hostel)
      console.log('Form data submitted:', formData);
      // Reset form fields
      setFormData({
        hostel_name: '',
        stripe_key: '',
        // stripe_webhook:'',
        address: '',
        gender:'',
        phone:'',
        email:''
      });
      dispatch(
        createHostel({
          address,
          stripe_key,
          hostel_name,
          gender,
          phone,
          email,
          // stripe_webhook
  
        })
      );
      if (errorhostel) {
        enqueueSnackbar(errorhostel, { variant: 'error' })
      }
      // Set form submitted flag
      setFormSubmitted(true);
      setLoading(false); // Set loading state to false
    }, 2000); // Simulate loading time
  };

  const isValidAddress = (address) => {
    // Regular expression to validate the address
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    return addressRegex.test(address);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <Typography component="h1" variant="h4" style={{ marginBottom: '2rem', color: '#333' }}>
            Create Hostel
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="hostel_name"
              label="Hostel Name"
              name="hostel_name"
              value={hostel_name}
              onChange={(e) => sethostel_name(e.target.value)}
              />

<TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="phone"
  label="Official Hostel Contact Number"
  name="phone"
  value={phone}
  onChange={(e) => setphone(e.target.value)}
  InputProps={{
    startAdornment: <InputAdornment position="start">+254</InputAdornment>,
    inputProps: {
      pattern: "[0-9]{10}",
      title: "Please enter a valid phone number with 10 digits",
    },
  }}
/>

<TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="email"
  label="Official Hostel Email"
  name="email"
  value={email}
  onChange={(e) => setemail(e.target.value)}
  type="email"
/>



<TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="hostel_name"
  label="Select Gender"
  name="hostel_name"
  value={gender}
  onChange={(e) => setgender(e.target.value)}
  select
>
  {genders.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>



            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="stripe_key"
              label="Stripe Key"
              name="stripe_key"
              type="password"
              value={stripe_key}
              onChange={(e) => setstripe_key(e.target.value)}
              />



{/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="stripe_webhook"
              label="Stripe Webhook"
              name="stripe_webhook"
              type="password"
              value={stripe_webhook}
              onChange={(e) => setstripe_webhook(e.target.value)}
              /> */}











            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              error={!isValidAddress(formData.address)} // Apply error style if address is invalid
              helperText={!isValidAddress(formData.address) && 'Invalid address format'}
            />

            
            {loading && <CircularProgress size={40} className={classes.loader} />}
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
              disabled={!isValidAddress(formData.address) || loading} // Disable button if address is invalid or loading
            >
              {loading ? '' : 'Create Hostel'}
            </Button>
          </form>
          {formSubmitted && success && (
            <Typography variant="h6" className={classes.successMessage}>
              Hostel created successfully!
            </Typography>
          )}
          <Typography variant="body1" className={classes.videoLink}>
            Don't know how to get a Stripe key? Follow this <a href="https://youtu.be/zgtYJ-BvNpE?si=xrrXQ1_cz62ifvM3" target="_blank" rel="noopener noreferrer">YouTube video tutorial</a>.
            All Payments Are Made Through Stripe In Forte
          </Typography>
        </div>
      </Slide>
    </Container>
  );
};

export default CreateHostel;
