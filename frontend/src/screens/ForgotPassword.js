import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import AForm from '../components/aform';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { forgot_password } from '../actions/userAction';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader2'
import {  Typography, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { error, loading, success } = forgotPassword;

  const dispatch = useDispatch()


  const handleSubmit2 =  () => {

    dispatch(forgot_password(email))
    {loading && <Loader/>}



    

  };




  return (
    <div>
      { loading ? (
        <Loader/>
      ) : success ? (
        

        <div>
<Snackbar 
          
          open={success}
          message={<span style={{ color: 'green' }}>"Password Reset Link Sent To Your Email"</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <div style={{
  backgroundColor: '#4CAF50', // Green background color
  color: '#FFFFFF', // White text color
  padding: '10px 20px', // Padding around the text
  borderRadius: '4px', // Rounded corners
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Box shadow for depth
  textAlign: 'center' // Center align the text
}}>
  Password Reset Link Sent To Your Email. Please check your email.
  <br/>
  <Link to="/login">
  
  <i
  style={{
    color:"black"
  }}
  >Back To Log IN</i>
    </Link>

</div>
      </div>
      

      ):  error ? (
        <div>
        <div>
        <Snackbar 
          
          open={error}
          message={<span style={{ color: 'green' }}>"Invalid Email Or Account Not Activated"</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <Row className='justify-content-center align-items-center'>
          <div className='wrapper text-center'>
          <h6 style={{
            color:"green"
          }}>RECOVER YOUR ACCOUNT</h6>
          <i>Hi there you will only receive the link if you activated your account before </i>
  
            <AForm
              forgotScreen={true}
              resetScreen={false}
              onSubmit={handleSubmit2}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Row>
        </div>
      </div>
      ):  
      
      (
<div>
        <br />
        <br />
        <br />
        <br />
        <Row className='justify-content-center align-items-center'>
          <div className='wrapper text-center'>
          <h6>Enter your registered email</h6>
  
            <AForm
              forgotScreen={true}
              resetScreen={false}
              onSubmit={handleSubmit2}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Row>
        </div>

      )
      }

    </div>
  );
};

export default PasswordResetRequest;
