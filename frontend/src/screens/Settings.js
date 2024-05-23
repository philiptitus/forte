import React, { useState, useEffect, Component } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getUserDetails,updateUserProfile, resetAvi} from '../actions/userAction';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useSnackbar } from 'notistack';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import LabTabs from '../components/Tab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LabTabsMobile from '../components/MobileTab';
import Popup from '../components/PopUp';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Loader from '../components/Loader2';
import Delete from '../components/Delete';

import {  Snackbar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getOtpAction } from '../actions/userAction';
import { logout } from '../actions/userAction'
import Figma from '../components/Figma';
import ProfileCard2 from '../components/Figma';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const FileUpload = ({ onChange }) => {

    const handleButtonClick = () => {
      document.getElementById('image').click();
    };
    return (
      <label htmlFor="image">
        <input type="file" id="image" onChange={onChange}         
        style={{ display: 'none' }}
   />
         <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={handleButtonClick}
        >UPLOAD AVI</Button>
      </label>
    );
  };

function FormPropsTextFields() {
    const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;
    
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avi, setAvi] = useState('');
  const [contactNumber, setContactNumber] = useState(''); // New constant for 'contact_number'
  const [address, setAddress] = useState(''); // New constant for 'address'
  const [guardianName, setGuardianName] = useState(''); // New constant for 'guardian_name'
  const [guardianContact, setGuardianContact] = useState(''); // New constant for 'guardian_contact'
  const [guardian2Name, setGuardian2Name] = useState(''); // New constant for 'guardian2_name'
  const [guardian2Contact, setGuardian2Contact] = useState(''); // New constant for 'guardian2_contact'
    const [uploading, setUploading] = useState(false) 
    const [isPrivate, setIsPrivate] = useState(user.isPrivate);
  
  
  
  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const reviewDelete = useSelector((state) => state.reviewDelete);
    const { success: successDelete } = reviewDelete;
  
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success:successUpdate, error:errorUpdate, loading:loadingUpdate } = userUpdateProfile;
  
    
  
  
  
    const handleIsPrivateChange = (event) => {
      setIsPrivate(event.target.value === 'private');
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        enqueueSnackbar("The Passwords Did not Match ! ", { variant: 'error' })
      } else {
  
      dispatch(updateUserProfile({
        'id':user._id,
        'name':name,
        'email':email,
        'password':password,
        "contactNumber":contactNumber,
        "address":address,
        "guardian_name":guardianName,
        "guardian_contact":guardianContact,
        "guardian2_name":guardian2Name,
        "guardian2_contact":guardian2Contact,
        
  
  
        'bio':bio,
        'avi':avi,
        'isPrivate': isPrivate,
  
  
      }))
  
        }
      }
  
  
  
      useEffect(() => {
        if (!userInfo) {
          ;
        }else{
            if(!user || !user.name || successUpdate || userInfo._id !== user._id){
              dispatch({type:USER_UPDATE_PROFILE_RESET})
              dispatch(getUserDetails('profile'))
    
                
            }
  
            
  
    
            if (successUpdate) {
              {successUpdate && enqueueSnackbar("Your Profile Was Updated Successfully", { variant: 'success' })
            } 
  
            
           
            }
    
    
    
            else{
                setName(user.name)
                setEmail(user.email)
                setBio(user.bio)
                setAvi(user.avi)
                setContactNumber(user.contact_number)
                setAddress(user.address)
                setGuardianName(user.guardian_name)
                setGuardian2Name(user.guardian2_name)
                setGuardianContact(user.guardian_contact)
                setGuardian2Contact(user.guardian2_contact)
                
  
  
            }
        }
      }, [dispatch, navigate, userInfo, user, successDelete]);
    
  
  const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('avi', file)
        formData.append('user_id', userInfo.id)
  
        setAvi(URL.createObjectURL(e.target.files[0]));
  
      
        setUploading(true)
        try {
          const config = {
            headers:{
              'Content-Type':'multipart/form-data',
              Authorization : `Bearer ${userInfo.token}`
  
      
            }
          }
          const{data} = await axios.post(`/api/users/upload/`, formData, config)
      
          // setAvi( URL.createObjectURL(data) )
          setUploading(false)
          
        } catch (error) {
          setUploading(false)
        }
      
      }
  
  
   return (
<div>
        {loadingUpdate || uploading ? (
          <Row className="justify-content-center align-items-center">
            <Loader />
          </Row>
        ) : (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { marginBottom: '10px', width: '100%' },
            }}
            noValidate
            autoComplete="on"
            onSubmit={submitHandler}
          >
            <Typography variant="h5" gutterBottom>
              Update Profile
            </Typography>
            {errorUpdate && <Typography variant="body1" color="error">{errorUpdate}</Typography>}
            <TextField
              required
              label="Username"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              type="email"
            />
            <TextField
              required
              multiline
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="filled"
              type="text"
            />
            <TextField
              required
              multiline
              label="Guardian/Parent Name"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              variant="filled"
              type="text"
            />
            <TextField
              required
              multiline
              label="Guardian/Parent Phone Number"
              value={guardianContact}
              onChange={(e) => setGuardianContact(e.target.value)}
              variant="filled"
              type="tel"
            />
            <TextField
              multiline
              label="Any Other Guardian/Parent Name"
              value={guardian2Name}
              onChange={(e) => setGuardian2Name(e.target.value)}
              variant="filled"
              type="text"
            />
            <TextField
              multiline
              label="Other Guardian/Parent Phone Number"
              value={guardian2Contact}
              onChange={(e) => setGuardian2Contact(e.target.value)}
              variant="filled"
              type="tel"
            />
            <Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
              Change Password
            </Typography>
            <TextField
              label="Password"
              type="password"
              autoComplete="new-password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorUpdate && <Typography variant="body1" color="error">{errorUpdate}</Typography>}
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Save Profile <i className="far fa-save" style={{ marginLeft: '5px' }}></i>
            </Button>
          </Box>
        )}
      </div>
  
    );
  }



  function ChangePhoto() {
    const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;
    
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avi, setAvi] = useState('');
  const [contactNumber, setContactNumber] = useState(''); // New constant for 'contact_number'
  const [address, setAddress] = useState(''); // New constant for 'address'
  const [guardianName, setGuardianName] = useState(''); // New constant for 'guardian_name'
  const [guardianContact, setGuardianContact] = useState(''); // New constant for 'guardian_contact'
  const [guardian2Name, setGuardian2Name] = useState(''); // New constant for 'guardian2_name'
  const [guardian2Contact, setGuardian2Contact] = useState(''); // New constant for 'guardian2_contact'
    const [uploading, setUploading] = useState(false) 
    const [isPrivate, setIsPrivate] = useState(user.isPrivate);
  
  
  
  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const reviewDelete = useSelector((state) => state.reviewDelete);
    const { success: successDelete } = reviewDelete;
  
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success:successUpdate, error:errorUpdate, loading:loadingUpdate } = userUpdateProfile;
  
    
  
  
  
   
  
  
      useEffect(() => {
        if (!userInfo) {
          ;
        }else{
            if(!user || !user.name || successUpdate || userInfo._id !== user._id){
              dispatch({type:USER_UPDATE_PROFILE_RESET})
              dispatch(getUserDetails('profile'))
    
                
            }
  
            
  
    
            if (successUpdate) {
              {successUpdate && enqueueSnackbar("Your Profile Was Updated Successfully", { variant: 'success' })
            } 
  
            
           
            }
    
    
    
            else{
                setName(user.name)
                setEmail(user.email)
                setBio(user.bio)
                setAvi(user.avi)
                setContactNumber(user.contact_number)
                setAddress(user.address)
                setGuardianName(user.guardian_name)
                setGuardian2Name(user.guardian2_name)
                setGuardianContact(user.guardian_contact)
                setGuardian2Contact(user.guardian2_contact)
                
  
  
            }
        }
      }, [dispatch, navigate, userInfo, user, successDelete]);
    
  
  
  
    
    
  
  const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('avi', file)
        formData.append('user_id', userInfo.id)
  
        setAvi(URL.createObjectURL(e.target.files[0]));
  
      
        setUploading(true)
        try {
          const config = {
            headers:{
              'Content-Type':'multipart/form-data',
              Authorization : `Bearer ${userInfo.token}`
  
      
            }
          }
          const{data} = await axios.post(`/api/users/upload/`, formData, config)
          enqueueSnackbar("Profile Photo Updated", { variant: 'success' })
          // setAvi( URL.createObjectURL(data) )
          setUploading(false)
          
        } catch (error) {
          setUploading(false)
        }
      
      }
  
  
   return (
    <div>
      {uploading ? (
  
  <Row className='justify-content-center align-items-center'>
  
  <Loader/>
  </Row>
  
      ):(
  
  
    <div>
  
  
  
  <label style={{ marginTop: '10px', marginBottom: '5px' }}>CHANGE YOUR AVI</label>
  <br />
  
  {avi && <img src={avi} alt={name} style={{ width: '100px', height:'100px' }} />}
  
      <Form.Group controlId="image">
        <FileUpload onChange={uploadFileHandler} />
        {uploading && <Loader/>}
      </Form.Group>
  
  
  
    </div>
  
  
      )}
  
  </div>
  
    );
  }

  function Remove() {
    const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;
    
  
   

  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate()
    const dispatch = useDispatch()
  

    const aviReset = useSelector((state) => state.aviReset);
    const { error:Avierror, loading:Aviloading, success:Avisuccess } = aviReset;


    const resetAviHandler = () => {
        dispatch(resetAvi())
  
  
      };
  
  
 
 
  
      useEffect(() => {

        if (Avisuccess) {
          enqueueSnackbar("Profile Photo Removed !", { variant: 'success' });
        }        
        
        if (Avierror) {
          enqueueSnackbar("Something went wrong!", { variant: 'error' });
  
          
        }
        
      }, [navigate, Avisuccess, Avierror]);
  

  
   return (
    <div>
      {Aviloading ? (
  
  <Row className='justify-content-center align-items-center'>
  
  <Loader/>
  </Row>
  
      ):(
<div>
<a 
              onClick={resetAviHandler}
              style={{
                color:"green"
              }}

          target="_blank" className="button">
            <i 
                          style={{
                            color:"green"
                          }}
            className="fas fa-trash"></i>
            Delete Avi
          </a>

</div>
  
  
      )}
  
  </div>
  
    );
  }

  function Close() {
    const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;
    
  
   

  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate()
    const dispatch = useDispatch()
  

    const aviReset = useSelector((state) => state.aviReset);
    const { error:Avierror, loading:Aviloading, success:Avisuccess } = aviReset;


    const resetAviHandler = () => {
        dispatch(resetAvi())
  
  
      };
  
  
 
 
  
      useEffect(() => {

        if (Avisuccess) {
          enqueueSnackbar("Profile Photo Removed !", { variant: 'success' });
        }        
        
        if (Avierror) {
          enqueueSnackbar("Something went wrong!", { variant: 'error' });
  
          
        }
        
      }, [navigate, Avisuccess, Avierror]);
  

  
   return (
    <div>
      {Aviloading ? (
  
  <Row className='justify-content-center align-items-center'>
  
  <Loader/>
  </Row>
  
      ):(
<div>
<a 
              onClick={resetAviHandler}
              style={{
                color:"green"
              }}

          target="_blank" className="button">
            <i 
                          style={{
                            color:"green"
                          }}
            className="fas fa-trash"></i>
            Delete Avi
          </a>

</div>
  
  
      )}
  
  </div>
  
    );
  }

  function Verify() {
    const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;
    
  
   

  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate()
    const dispatch = useDispatch()
  

    const getOtp = useSelector((state) => state.getOtp);
    const { loading: loadingOtp, error: errorOtp, success:successOtp, Otp } = getOtp;
    
  
  
 
    const submitHandler = () => {
        dispatch(getOtpAction())
  
  
      };
  
      useEffect(() => {

        if (successOtp) {
        navigate("/verify")
        }          
        
      }, [navigate, loadingOtp, successOtp, errorOtp]);
  
  

  
   return (
    <div>
      {loadingOtp ? (
  
  <Row className='justify-content-center align-items-center'>
  
  <Loader/>
  </Row>
  
      ):(
<div>
{!user?.is_verified
            
            && 
<a 
          
          onClick={submitHandler}
          target="_blank" className="button">
          <i class="fas fa-check-circle"></i>
            VERIFY ACCOUNT
          </a>
          }
          {user?.is_verified
            
            && 
<a 
          >
          <i class="fas fa-check-circle"></i>
          No worries Your Account Is Verified Already :)
          </a>
          }

</div>
  
  
      )}
  
  </div>
  
    );
  }
  

class UserSettings extends React.Component {
    
  render() {
    return (
<div
          style={{
            marginLeft: "50px",
            '@media only screen and (min-width: 601px)': {
              marginLeft: "30px"
            }
          }}

>


<br/>
          <br/>
          <br/>
      <ul className='class1'>
        <h3>Profile Settings<SettingsIcon/></h3>
        <SettingsItem iconClass="icon-users" label="Change My Profile Details">
          <li>
            <div>
            <FormPropsTextFields/>

            </div>
          </li>
   </SettingsItem>
        <SettingsItem iconClass="icon-film" label="Verify My Account" >
          <li><i aria-hidden="true" class="icon-movie"></i> You will Receive a One Time Password In Your Email Address Which You Will Use To Finish The Verification Process Do You Wish To Proceed ? </li>
          <li>
            <Verify/>
          </li>
        </SettingsItem>
        <SettingsItem iconClass="icon-images" label="Change My Profile Photo">
          <li>Click On Change Avi To change Your Current PFP</li>
          <li>
          <a  target="_blank" className="button">
          <Popup component={<ChangePhoto  />}  icon={EditIcon} word={"Change Avi"}  />
          </a>
          </li>
  </SettingsItem>
        <SettingsItem iconClass="icon-microphone" label="Remove Profile Photo" >
          <li>
<Remove/>

          </li>
        </SettingsItem>
        <SettingsItem iconClass="icon-android"  label="Close My Account" >
          <li> You Are About To Close Your Account NOte That This Action May Not Be Reversed !!!. Are You Sure? </li>
          <li>
          <Popup component={<Delete  />}  icon={DeleteForeverIcon} pre="Delete Account" />

          </li>
        </SettingsItem>
      </ul>

      </div>



    );
  }
}

class SettingsItem extends React.Component {
  render() {
    return (
<div


>
<style>
  {`


* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	font-family:arial, sans-serif;
	font-weight:normal;
	font-size:12px;

}

.class1 {
	list-style:none;
	margin:0; 
	padding:0;
	
	margin:0 auto;
	-moz-box-shadow: 0 0 5px #111;
	-webkit-box-shadow: 0 0 5px #111;
	box-shadow: 0 0 5px #111;
}

.class1 li label {

}

.class1 li input[type='checkbox'] {
	display: none;
}

.class1 li label {
	display:block;
	padding:12px;
	
}

// .class1 li i {
// 	font-size:18px;
// 	vertical-align: middle;
// 	width:20px;
// 	display:inline-block;
// }

// .class1 li span {
// 	display:inline;
// 	float:right;
// 	background:#48515c;
// 	border:1px solid #3c434c;
// 	border-bottom:1px solid #707781;
// 	padding:4px 6px;
// 	font-size:10px;
// 	-moz-border-radius: 12px;
// 	border-radius: 12px;
// 	-moz-box-shadow: inset 0 0 10px #111;
// 	-webkit-box-shadow: inset 0 0 10px #111;
// 	box-shadow: inner 0 0 10px #111;
// 	position:relative;
// }

// .class1 li label:hover {
// 	background: #566f82; /* fallback colour */
// 	background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#566f82), to(#3e505e));
// 	background: -webkit-linear-gradient(top, #566f82, #3e505e);
// 	background: -moz-linear-gradient(top, #566f82, #3e505e);
// 	background: -ms-linear-gradient(top, #566f82, #3e505e);
// 	background: -o-linear-gradient(top, #566f82, #3e505e);
// }

.class1 li label:hover span {
	background:#3e505e;
}


.class1 li input[type='checkbox']:checked ~ .options {
	height: auto;
	display:block;
	min-height:40px;
	max-height:800px;
}

.class1 .class1 {
	background:#fff; margin:0; padding:0;
	-moz-box-shadow: inset 0 2px 2px #b3b3b3;
	-webkit-box-shadow: inset 0 2px 2px #b3b3b3;
	box-shadow: inner 0 2px 2px #b3b3b3;
}

.class1 .class1 li a {
	display:block;
	padding:6px 12px;
	color:#999;
	text-decoration:none;
}

.class1 .class1 li a:hover {
	color:#44c6eb;
}

.class1 .class1 li a span {
	color:#999;
	background:none;
	border:1px solid #ccc; 
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	box-shadow: none;
}

.class1 .class1 li {
	border-bottom:1px solid #ccc;
}

.class1 .class1 li:first-child {
	padding-top:6px;
}

.class1 .class1 li:last-child {
	padding-bottom:6px; border:0;
}

.options {
	height: 0;
	display: block;
	overflow: hidden;
}
	
/* Abridged icomoon font styles
/* (Hosted on Frecosse - Please don't hotlink!)
=============================================== */
@font-face {
	font-family: 'icomoon';
	src:url('http://www.frecosse.com/workshop/accordion_menu/icomoon.eot');
	src:url('http://www.frecosse.com/workshop/accordion_menu/icomoon.eot?#iefix') format('embedded-opentype'),
		url('http://www.frecosse.com/workshop/accordion_menu/icomoon.woff') format('woff'),
		url('http://www.frecosse.com/workshop/accordion_menu/icomoon.ttf') format('truetype'),
		url('http://www.frecosse.com/workshop/accordion_menu/icomoon.svg#icomoon') format('svg');
	font-weight: normal;
	font-style: normal;
}

  `}
</style>




      <li className="block">
        <input type="checkbox" name="item" id={this.props.label} />   
        <label htmlFor={this.props.label}><i aria-hidden="true" className={this.props.iconClass}></i> {this.props.label} <span>{this.props.count}</span></label>
        <ul className="options class1">
          {this.props.children}
        </ul>
      </li>





      </div>

    );
  }
}


function Settings  () {
  const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;
      
        const [selectedOption, setSelectedOption] = useState(0);
      
        const handleOptionChange = (event, newValue) => {
          setSelectedOption(newValue);
        };

        const userDetails = useSelector((state) => state.userDetails);
        const { error, loading, user } = userDetails;


        const aviReset = useSelector((state) => state.aviReset);
        const { error:Avierror, loading:Aviloading, success:Avisuccess } = aviReset;


        
        const { enqueueSnackbar } = useSnackbar();

        const dispatch = useDispatch()
        const navigate = useNavigate()


        const getOtp = useSelector((state) => state.getOtp);
        const { loading: loadingOtp, error: errorOtp, success:successOtp, Otp } = getOtp;
        
        const [hasExpired, setHasExpired] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());

const expirationTime = userInfo?.expiration_time

useEffect(() => {
  if (!userInfo || !("access" in userInfo)) {
    dispatch(logout());

  }
}, [dispatch, navigate, userInfo]);





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
  
  

        const formatTimestamp = (timestamp) => {
          const date = new Date(timestamp);
      
          // Check if the date is valid
          if (isNaN(date.getTime())) {
            return 'Invalid Date';
          }
      
          const now = new Date();
          const timeDifference = formatDistanceToNow(date, { addSuffix: true });
          return timeDifference;
        };


   
  return (
    <div className="settings">
      <UserSettings/>
    </div>
  );
};

export default Settings;
