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



function ProfileCard  () {
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
    
        

    const staffRemove = useSelector((state) => state.staffRemove);
    const { loading: loadingRemove, error: errorRemove, success:successRemove, staff } = staffRemove;
    
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

<style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Montserrat');

          * {
            box-sizing: border-box;
          }
          
          body {
            font-family: Montserrat, sans-serif;
            
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          
            min-height: 100vh;
            margin: 0;
          }
          
          h3 {
            margin: 10px 0;
          }
          
          h6 {
            margin: 5px 0;
            text-transform: uppercase;
          }
          
          p {
            font-size: 14px;
            line-height: 21px;
          }
          
          .card-container {
            background-color: #231E39;
            border-radius: 5px;
            box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.75);
            color: #B3B8CD;
            padding-top: 30px;
            position: relative; 
            width: 500px;
            max-width: 100%;
            text-align: center;
          }
          
          .card-container .pro {
            color: #231E39;
            background-color: #FEBB0B;
            border-radius: 3px;
            font-size: 14px;
            font-weight: bold;
            padding: 3px 7px;
            position: absolute;
            top: 30px;
            left: 30px;
          }
          
          .card-container .round {
            border: 1px solid #03BFCB;
            border-radius: 50%;
            padding: 7px;
          }
          
          button.primary {
            background-color: #03BFCB;
            border: 1px solid #03BFCB;
            border-radius: 3px;
            color: #231E39;
            font-family: Montserrat, sans-serif;
            font-weight: 500;
            padding: 10px 25px;
          }
          
          button.primary.ghost {
            background-color: transparent;
            color: #02899C;
          }
          
          .skills {
            background-color: #1F1A36;
            text-align: left;
            padding: 15px;
            margin-top: 30px;
          }
          
          .skills ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          
          .skills ul li {
            border: 1px solid #2D2747;
            border-radius: 2px;
            display: inline-block;
            font-size: 12px;
            margin: 0 7px 7px 0;
            padding: 7px;
          }
          
          footer {
              background-color: #222;
              color: #fff;
              font-size: 14px;
              bottom: 0;
              position: fixed;
              left: 0;
              right: 0;
              text-align: center;
              z-index: 999;
          }
          
          footer p {
              margin: 10px 0;
          }
          
          footer i {
              color: red;
          }
          
          footer a {
              color: #3c97bf;
              text-decoration: none;
          }


        `}
      </style>
      {loadingRemove && <Loader/>}

{loading? (<Loader/>):
 user ? (

    <Row 
    className='justify-content-center'
    style={{
      textAlign: "center",
      alignContent: "center",
      alignItems: "center",
      marginLeft: window.innerWidth <= 768 ? "32px" : "18px",
    }}
  >
      <h5>Admin User Management</h5>
      <div className="card-container">
      {user.user_type == "staff" && 

        <span className="pro">STAFF</span>
}
        <img 
        
        style={{
            width:"100px"
        }}
        className="round" src={user?.avi} alt="user" />
        <h5
        style={{
          color:"white"
        }}
        >{user.name}</h5>
        <h6
                style={{
                  color:"white"
                }}
        >@{user.email}</h6>
        <div className="buttons">
        {user.user_type == "staff" && 

          <button className="primary" onClick={submitHandler}>
            REMOVE
          </button>
}
        </div>
        <div className="skills">
          <h6
          style={{
              color:"white"
          }}
          >User Information</h6>
          <ul>
          <li>ACCOUNT TYPE: {user.user_type}</li>
            <li>ID NUMBER: {user.Id_number}</li>
            <li>HOSTEL: {user.hostel_name}</li>
            <li>DOB: {user.date_of_birth} </li>
            <li>GENDER: {user.gender}</li>
            <li>TEL: {user.contact_number}</li>
            <li>ADDRESS: {user.address}</li>
            <li>Parent/Guardian Name: {user.guardian_name}</li>
            <li>Parent/Guardian Contact: {user.guardian_contact}</li>
            <li>Second Parent/Guardian Name: {user.guardian2_name}</li>
            <li>Second Parent/Guardian contact: {user.guardian2_contact}</li>
  
  
  
  
          </ul>
        </div>
  
      </div>
  </Row>

 ):(
    <h1>The Item You Are Looking For Does Not Exist</h1>

 )
}




    </div>

  );
};

export default ProfileCard;
