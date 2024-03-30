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
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import Loader from '../components/Loader2';
import Delete from '../components/Delete';
import { useParams } from 'react-router-dom';

import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getOtpAction } from '../actions/userAction';
import { removeStaffAction } from '../actions/userAction';

import { logout } from '../actions/userAction'




  
    function ProfileOthers() {
        const isLargeScreen = useMediaQuery('(min-width: 600px)');
        const isSmallScreen = useMediaQuery('(max-width: 480px)');
        const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;
        const { id } = useParams();

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
        

        

        const staffRemove = useSelector((state) => state.staffRemove);
        const { loading: loadingRemove, error: errorRemove, success:successRemove, staff } = staffRemove;
        

          
const [hasExpired, setHasExpired] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());

const expirationTime = userInfo?.expiration_time


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

        useEffect(() => {
          if (!userInfo) {
            navigate('/forte')
          }
        }, [navigate, userInfo]);

        useEffect(() => {
          dispatch(getUserDetails(id));
          
          
    
          if (id == userInfo?.id) {
            navigate("/profile")
          }
    
    
        }, [dispatch, id]);      
    

        useEffect(() => {
          if (successRemove) {
            enqueueSnackbar("The Staff Member Was Successfully Removed", { variant: 'success' });
          navigate("/search")
          }
          if (errorRemove) {
            enqueueSnackbar(errorRemove, { variant: 'error' });
          }
          
          
        }, [navigate, loadingOtp, successOtp, errorOtp]);
      


        


        const submitHandler = () => {
          dispatch(removeStaffAction(id))
          navigate("/search")
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
{  loading ? (
  <Loader/>
) : user ?    
(            <Container>
            <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>

{loadingRemove && <Loader/>}
<br/>
<br/>
<br/>
<br/>



  <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>

  <Image 
  src={user?.avi} 
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
</Row>

              <br />
              {user && 

              <Row style={{ alignItems: "center" , textAlign:"center"}}>
                {user.user_type == "staff" && 
                
                <IconButton
                onClick={submitHandler}
                >
                  <h6 style={{ color:"brown" }}>Remove From Staff</h6>
                <PersonRemoveIcon/>

                </IconButton>
                }


              <h6>{user.name}</h6>
              <h6 style={{ fontSize: '12px', color: "red" }}>@{user.email}</h6>
              <b>ID NUMBER: <i style={{color:"green" }}>{user.Id_number}</i></b>
              <b>Joined: <i style={{color:"green" }}>{formatTimestamp(user.date_joined)}</i></b>
              <b>Account Type: <i style={{color:"green" }}>{user.user_type}</i></b>
              <b>Hostel: <i style={{color:"green" }}>{user.hostel_name}</i></b>
              <b>DOB: <i style={{color:"green" }}>{user.date_of_birth}</i></b>
              <b>Gender: <i style={{color:"green" }}>{user.gender}</i></b>
              <b>Phone NO: <i style={{color:"green" }}>{user.contact_number}</i></b>
              <b>Address: <i style={{color:"green" }}>{user.address}</i></b>
              <b>Parent/Guardian Name: <i style={{color:"green" }}>{user.guardian_name}</i></b>
              <b>Parent/Guardian contact:<i style={{color:"green" }}>{user.guardian_contact}</i></b>
              <b>Second Parent/Guardian Name: <i style={{color:"green" }}>{user.guardian2_name}</i></b>
              <b>Second Parent/Guardian contact:<i style={{color:"green" }}>{user.guardian2_contact}</i></b>







              <Col style={{ textAlign: "right" }}>
              {/* <Popup component={<FormPropsTextFields />} fa={<i className="far fa-edit"></i>} /> */}
                
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


              </Row>
              <br />
              <br />
      
              <br />
            </Container>):(
                      <h1>The Item You Are Looking For Does Not Exist</h1>

            )
}


          </div>
        );
      }
      

      export default ProfileOthers;
      
      
