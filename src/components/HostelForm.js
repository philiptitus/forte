

import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Box, Button,  } from '@mui/material'; // Import required MUI components
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import { useDispatch, useSelector } from 'react-redux'; // Import redux hooks
import axios from 'axios'; // Import axios for HTTP requests
import { Row, Col } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Loader from './Loader2';
import { editHostel } from '../actions/hostelActions';
import { Form } from 'react-bootstrap';
import InputAdornment from '@material-ui/core/InputAdornment';
import {  Typography, Snackbar } from '@mui/material';


const FileUpload = ({ onChange }) => {
  const handleButtonClick = () => {
    document.getElementById('image').click();
  };

  return (
    <div>
      <input
        type="file"
        id="image"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <Button
        variant="outlined"
        component="span"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        Upload Image
      </Button>
    </div>
  );
};

const HostelForm = ({ defaultValue }) => {
  const navigate = useNavigate();
  const [hostel_name, sethostel_name] = useState(defaultValue.hostel_name);
  const [stripe_key, setstripe_key] = useState("");
  // const [stripe_webhook, setstripe_webhook] = useState('');

  const [address, setaddress] = useState(defaultValue.address);
  const [room_price_1, setroom_price_1] = useState(defaultValue.room_price_1);
  const [room_price_2, setroom_price_2] = useState(defaultValue.room_price_2);
  const [room_price_4, setroom_price_4] = useState(defaultValue.room_price_4);
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [imag1, setimag1] = useState(defaultValue.imag1);
  const [imag2, setimag2] = useState(defaultValue.imag2);
  const [imag3, setimag3] = useState(defaultValue.imag3);
  const [imag4, setimag4] = useState(defaultValue.imag4);
  const [imag5, setimag5] = useState(defaultValue.imag5);
  const [imag6, setimag6] = useState(defaultValue.imag6);
  const [imag7, setimag7] = useState(defaultValue.imag7);
  const [imag8, setimag8] = useState(defaultValue.imag8);
  const [imag9, setimag9] = useState(defaultValue.imag9);
  const [imag10, setimag10] = useState(defaultValue.imag10);
  const [uploading, setUploading] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState('Image 1');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const imgP = false

  const hostelEdit = useSelector((state) => state.hostelEdit);
  const { loading, error, success, hostel } = hostelEdit;


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editHostel({
        hostel_name,
        stripe_key,
        address,
        room_price_1,
        room_price_2,
        room_price_4,
        phone,
        email,
        // stripe_webhook
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    if (selectedImage === 'Image 1') {
      formData.append('imag1', file);
      setimag1(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 2') {
      formData.append('imag2', file);
      setimag2(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 3') {
      formData.append('imag3', file);
      setimag3(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 4') {
      formData.append('imag4', file);
      setimag4(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 5') {
      formData.append('imag5', file);
      setimag5(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 6') {
      formData.append('imag6', file);
      setimag6(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 7') {
      formData.append('imag7', file);
      setimag7(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 8') {
      formData.append('imag8', file);
      setimag8(URL.createObjectURL(e.target.files[0]));
    } else if (selectedImage === 'Image 9') {
      formData.append('imag9', file);
      setimag9(URL.createObjectURL(e.target.files[0]));
    } else {
      formData.append('imag10', file);
      setimag10(URL.createObjectURL(e.target.files[0]));
    }
  
    setUploading(true); 
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.post(`/api/hostels/upload/`, formData, config);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  


  return (
    <div>
      {loading && <Loader/>}
                <Snackbar 
          
          open={error}
          message={<span style={{ color: '#ff0000' }}>{error}</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
                        <Snackbar 
          
          open={success}
          message={<span style={{ color: 'green' }}>Hostel Information Update Success</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h3>Update Hostel Info</h3>
        <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={submitHandler}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <i style={{
fontSize:"small",
color:"red"

                }}>NOTE WE DONT SUPPORT CHANGING HOSTEL GENDERS, YOU'LL HAVE TO MAKE A NEW HOSTEL ACCOUNT FOR THAT</i>
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
                  helperText="Your Hostel's Name"
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
                />
                <h6>All Prices in USD</h6>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="room_price_1"
                  label="Price For Room with 1 capacity"
                  name="room_price_1"
                  type="number" // Set type to "number" to accept only numbers
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Additional properties to enforce numeric input
                  value={room_price_1}
                  onChange={(e) => setroom_price_1(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="room_price_2"
                  label="Price For Room with 2 capacity"
                  name="room_price_2"
                  type="number" // Set type to "number" to accept only numbers
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Additional properties to enforce numeric input
                  value={room_price_2}
                  onChange={(e) => setroom_price_2(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="room_price_4"
                  label="Price For Room with 4 capacity"
                  name="room_price_4"
                  type="number" // Set type to "number" to accept only numbers
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Additional properties to enforce numeric input
                  value={room_price_4}
                  onChange={(e) => setroom_price_4(e.target.value)}
                />
              </div>




            </Box>

            <button type="submit" className="btn btn-primary mt-2"
              style={{
                backgroundColor: "transparent",
                color: "green"
              }}
            >
              <CheckCircleIcon />
            </button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default HostelForm;
