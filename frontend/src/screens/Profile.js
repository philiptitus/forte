import React, { useState, useEffect, Component } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getUserDetails,updateUserProfile} from '../actions/userAction';
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


import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getOtpAction } from '../actions/userAction';
import { logout } from '../actions/userAction'


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

<Row className='justify-content-center align-items-center'>

<Loader/>
</Row>

    ):(
      <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
  }}
  noValidate
  autoComplete="on"
  onSubmit={submitHandler}
>
  {loadingUpdate && <LoadingSpinner />}

  <div>
    {errorUpdate && 
    
    <p style={{ color:"red" }}>{errorUpdate}</p>
    }
{user.user_type === "admin" &&
    <i>Some Fields Are  Meant For Students But You Can Fill Them Optionally</i>
} 

{user.user_type === "staff" &&
    <i>Some Fields Are  Meant For Students But You Can Fill Them Optionally</i>
} 
    
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
      id="outlined-multiline-flexible"
      multiline
      label="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      variant="filled"
      type="text"
    />

    <TextField
      required
      id="outlined-multiline-flexible"
      multiline
      label="Guardian/Parent Name"
      value={guardianName}
      onChange={(e) => setGuardianName(e.target.value)}
      variant="filled"
      type="text"
    />
    <br/>
    <TextField
      required
      id="outlined-multiline-flexible"
      multiline
      label="Guardian/Parent Phone Number"
      value={guardianContact}
      onChange={(e) => setGuardianContact(e.target.value)}
      variant="filled"
      type="number"
    />
    <br/>

    <TextField
      required
      id="outlined-multiline-flexible"
      multiline
      label="Any Other Guardian/Parent Name"
      value={guardian2Name}
      onChange={(e) => setGuardian2Name(e.target.value)}
      variant="filled"
      type="text"
    />
    <br/>
    <TextField
      required
      id="outlined-multiline-flexible"
      multiline
      label=" Other Guardian/Parent Phone Number"
      value={guardian2Contact}
      onChange={(e) => setGuardian2Contact(e.target.value)}
      variant="filled"
      type="number"
    />
    <br/>

<label style={{ marginTop: '10px', marginBottom: '5px' }}>Change Password</label>
<br />

{errorUpdate && 
    
    <p style={{ color:"red" }}>{errorUpdate}</p>
    }

    <TextField
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    
    <TextField
      label="Confirm Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />
<br/>



    <br />
    <br/>
<br />


    <Button type="submit" variant="outlined" style={{ color: 'blue' }}>
      Save <i className="far fa-save"></i>
    </Button>
  </div>
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



  
    function Profile() {
        const isLargeScreen = useMediaQuery('(min-width: 600px)');
        const isSmallScreen = useMediaQuery('(max-width: 480px)');
        const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;
      
        const [selectedOption, setSelectedOption] = useState(0);
      
        const handleOptionChange = (event, newValue) => {
          setSelectedOption(newValue);
        };

        const userDetails = useSelector((state) => state.userDetails);
        const { error, loading, user } = userDetails;
        const { enqueueSnackbar } = useSnackbar();

        const dispatch = useDispatch()
        const navigate = useNavigate()


        const getOtp = useSelector((state) => state.getOtp);
        const { loading: loadingOtp, error: errorOtp, success:successOtp, Otp } = getOtp;
        
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


        // useEffect(() => {

        //   if (successOtp) {
        //   navigate("/verify")
        //   }          
          
        // }, [navigate, loadingOtp, successOtp, errorOtp]);
      


        


        const submitHandler = () => {
          dispatch(getOtpAction())


        };
      

        const submiterHandler = () => {
          navigate(`/hostel/${user.hostel}`)
        };
      

      

      
        return (
          <div>
            <br />
            <br />
            <br />
            <br />
            {loadingOtp && <Loader/>}
            <Snackbar 
        open={errorOtp}
        message={errorOtp}
        style={{
          color:"red"
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
{   

successOtp  && !user.is_verified  &&
                  <Snackbar 
        open={successOtp}
        message="Check Your Email For The OTP"
        style={{
          color:"green"
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      
      }
       {successOtp
      && !user.is_verified &&
      navigate('/verify')
      } 
      
            <Container>
            <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            {!user?.is_verified
            
            &&

            <Button
            style={{ backgroundColor:"red"}}
            onClick={submitHandler}
            >
       <h6>Activate My Account</h6>         
              </Button>

            }

<br/>
<br/>
<br/>
<br/>
{user.user_type === "admin" &&  user.hostel && 

<Button
style={{ backgroundColor:"green"}}
onClick={submiterHandler}
>
<h6>HOSTEL MANAGEMENT</h6>         
  </Button>



}

{user.user_type === "staff" &&  user.hostel && 

<Button
style={{ backgroundColor:"green"}}
onClick={submiterHandler}
>
<h6>HOSTEL MANAGEMENT</h6>         
  </Button>



}
  <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>

  <Image 
  src={user.avi} 
  alt='https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg' 
  style={{
    borderRadius: "70%",
    border: "2px solid green",
    width: "100px", // Adjust as needed
    height: "70px", // Adjust as needed
    objectFit: "cover" // This property ensures the image covers the circular frame
  }} 
/>

  </Col>
  <Popup component={<ChangePhoto  />}  icon={EditIcon}  />

</Row>

              <br />
              {userInfo && 
              
              <Row style={{ alignItems: "center" , textAlign:"center"}}>
              <h6>{userInfo.name}</h6>
              <h6 style={{ fontSize: '12px', color: "red" }}>@{userInfo.email}</h6>
              <b>Joined: {formatTimestamp(user.date_joined)}</b>
              <b>Account Type: {user.user_type}</b>

              {user.hostel_name && 
                            <b>Hostel: {user?.hostel_name}</b>

              }


              <Col style={{ textAlign: "right" }}>
              <Popup component={<FormPropsTextFields />} fa={<i className="far fa-edit"></i>} />
                
              </Col>
            </Row>
              }

              <Row>
              </Row>
              <Row>
              <p>{user.bio}</p>
              </Row>
              <br />

      
              <Row className='justify-content-center' style={{ margin:"-8px"}}>
                {/* <Col md={2} >
                  <Popup component={<FollowerList avatar={true} userId={user.id} />} word={user.total_followers} icon={GroupIcon} pre="Followers:  " />
                </Col>
                <Col md={2} style={{ marginLeft:isLargeScreen ?  '-61px': "" }}>
                  <Popup component={<FollowingList avatar={true} userId={user.id} />} word={user.total_following} icon={GroupIcon} pre="Following:  " />

                </Col> */}
                <Col md={2} style={{ marginLeft: isLargeScreen ? '-61px' : ""}}>
                  <Popup component={<FormPropsTextFields  />}  icon={EditIcon} pre="EDIT:  " />

                </Col>

                <Col md={2} style={{ marginLeft:isLargeScreen ? '0px': '' }}>
                  <Popup component={<Delete  />}  icon={DeleteForeverIcon} pre="Delete Account" />

                </Col>
              </Row>
              <br />
              <br />
{user.user_type == "student" &&

<div>

{isLargeScreen && (
  <div>
  <Row>
    <Col>
    
    <LabTabs id={userInfo && userInfo.id}  showPopUp={user.hostel} showReviews={true} showRequests={user.isPrivate} showComplain={true} showMaintenance={true} />

    </Col> 
  </Row>

  </div>

)}

      
{isSmallScreen && (
  <Row>
    <Col>
    <LabTabsMobile id={user.id} showReviews={true} showPopUp={user.hostel} showRequests={user.isPrivate} showComplain={true} showMaintenance={true}/>
    </Col>
  </Row>
)}

</div>

}


      
              <br />
            </Container>
          </div>
        );
      }
      

      export default Profile;
      
      
