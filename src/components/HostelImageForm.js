
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
import { useSnackbar } from 'notistack';


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

const HostelImageForm = ({ defaultValue }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook

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
      enqueueSnackbar(selectedImage + " Updated", { variant: 'success' });

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
      <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h3>Change Hostel Preview Images</h3>
        <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>
          <form>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >


              <div>
          <img
          src={selectedImage === 'Image 1' ? imag1 : 
                selectedImage === 'Image 2' ? imag2 : 
                selectedImage === 'Image 3' ? imag3 : 
                selectedImage === 'Image 4' ? imag4 :
                selectedImage === 'Image 5' ? imag5 :
                selectedImage === 'Image 6' ? imag6 :
                selectedImage === 'Image 7' ? imag7 :
                selectedImage === 'Image 8' ? imag8 :
                selectedImage === 'Image 9' ? imag9 : imag10
              
              }
          alt={`Uploaded Image ${selectedImage.split(' ')[1]}`}
          style={{ maxWidth: '100%', marginTop: '10px' }}
        />

{!imag1 && <h6

style={{
  color:"red"
}}
>Start By Uploading Image 1 As It Is The Main Image That The Customers See First</h6>}
        
                <h6>You Can Upload Upto 10 Images</h6>
                <Form.Group controlId="image">
                  <FileUpload onChange={uploadFileHandler} required={true} />
                  {uploading && <Loader />}
                </Form.Group>
              </div>

              <div>
                <TextField
                  id="image-selector"
                  select
                  label={`Add/Change ${selectedImage}`}
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  fullWidth
                >
                  {[...Array(10)].map((_, index) => (
                    <MenuItem key={index} value={`Image ${index + 1}`}>

                      {`<Image ${index + 1}>        `}
                      <br/>
                      <br/>
                      </MenuItem>
                    

                  ))}
                </TextField>
              </div>

            </Box>


          </form>
        </Col>
      </Row>
    </div>
  );
}

export default HostelImageForm;
