import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStaff, login } from '../actions/userAction';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { EmailOutlined, PersonOutline, LockOutlined } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { Row } from 'react-bootstrap'
import KeyIcon from '@mui/icons-material/Key';

import Loader from '../components/Loader2';
import { logout } from '../actions/userAction'
import {  Snackbar } from '@mui/material';

import { getUserDetails } from '../actions/userAction';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
  },
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const RegisterStaff = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type:'',
  });
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [Id_number, setId_number] = useState('');

  const [gender, setGender] = useState('');
  const [user_type, setuser_Type] = useState('staff');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { error:errorRegister, loading:loadingRegister, success } = userRegister;
  const [hasExpired, setHasExpired] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const expirationTime = userInfo?.expiration_time
  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;



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


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Clear any previous errors
    setError('');
  
    // Check if there is an error from registration validation
    const registrationError = await dispatch(registerStaff(name, email, password, gender, user_type, Id_number  ));
    if (errorRegister) {
      setError(errorRegister);

      return;
    }
  
    // Simulate form submission (replace with actual API call)
    
    if (success) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          alert('Registration successful! Your Staff Member Will Receive A Notification By Email.');
        }, 2000)
    
        
    } 

  };
  




  return (
    <Container component="main" maxWidth="md" className={classes.root}>

{loadingRegister
&&
<Loader/>
}
<Snackbar 
        open={success}
        message="Staff Registration Success Your Staff Member Will Receive An Email With Instructions"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <div className={classes.form}>
            <Typography variant="h4" align="center" gutterBottom>
              Register Staff
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Welcome to our hostel staff registration process! Please follow the steps below:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Step 1:</strong> Fill out the form below with the new Staff Member details.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Step 2:</strong> Click the "Submit" button to complete the registration.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Step 3:</strong> The Staff Member will receive an email for further instructions on how to change Their Password and log in to the system as a stff member under your hostel.
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: <PersonOutline />,
                    }}
                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    InputProps={{
                      startAdornment: <EmailOutlined />,
                    }}
                  />
                  {/* <TextField
  variant="outlined"
  fullWidth
  required
  id="userType"
  label="User Type"
  name="userType"
  value="staff"
  InputProps={{
    readOnly: true,
    startAdornment: <LockOutlined />,
  }}
/> */}

                </Grid>

                <Grid item xs={12}>
                  <TextField

onInput={(e) => {
  // Remove leading zeros and non-numeric characters
  let input = e.target.value.replace(/^0+/, '').replace(/\D/g, '');
  // Ensure the input has at most 8 digits
  input = input.slice(0, 8);
  // Update the state with the validated ID number
  setId_number(input);

  // Display error message if the input is not 8 digits
  const errorMessage = input.length !== 8 ? 'ID number must be exactly 8 digits' : '';
  setError(errorMessage);
}} 
                    variant="outlined"
                    fullWidth
                    required
                    id="email"
                    label="Id Number"
                    name="Id number"
                    type="number"
                    pattern="[0-9]{8}" 
                    title="Please enter exactly 8 digits"
                    value={Id_number}
                    onChange={(e) => setId_number(e.target.value)}
                    
                    InputProps={{
                      startAdornment: <KeyIcon />,
                    }}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  {/* <TextField
  variant="outlined"
  fullWidth
  required
  id="userType"
  label="User Type"
  name="userType"
  value="staff"
  InputProps={{
    readOnly: true,
    startAdornment: <LockOutlined />,
  }}
/> */}

                </Grid>




                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    InputProps={{
                      startAdornment: <LockOutlined />,
                    }}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} className={classes.loadingSpinner} />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterStaff;
