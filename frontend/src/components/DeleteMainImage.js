import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loader from './Loader2';
import { resetImage } from '../actions/hostelActions';
import { useSnackbar } from 'notistack';

const DeleteImages = ({ defaultValue }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedImage, setSelectedImage] = useState('Image 2');
  const [uploading, setUploading] = useState(false);
  
  const { loading: loadingImage, error: errorImage, success: successImage } = useSelector((state) => state.imageReset);
  const dispatch = useDispatch();

  const cimageStates = {
    'Image 2': 'imag2',
    'Image 3': 'imag3',
    'Image 4': 'imag4',
    'Image 5': 'imag5',
    'Image 6': 'imag6',
    'Image 7': 'imag7',
    'Image 8': 'imag8',
    'Image 9': 'imag9',
    'Image 10': 'imag10',
  };

  useEffect(() => {
    if (successImage) {
      enqueueSnackbar(selectedImage + " Removed", { variant: 'success' });
    }        
    
    if (errorImage) {
      enqueueSnackbar("Something went wrong!", { variant: 'error' });
    }
  }, [successImage, errorImage, enqueueSnackbar]);

  const deleteImageHandler = () => {
    const cimageState = cimageStates[selectedImage];
    dispatch(resetImage({ cimageState }));
  };

  return (
    <div>
      {loadingImage && <Loader/>}
      <Snackbar 
        open={errorImage}
        message={<span style={{ color: '#ff0000' }}>{errorImage}</span>}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h3>Remove Uploaded Images</h3>
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
                  src={defaultValue[selectedImage.toLowerCase()]}
                  alt={`Image ${selectedImage.split(' ')[1]}`}
                  style={{ maxWidth: '100%', marginTop: '10px' }}
                />
                <h6>Choose An Image to Delete</h6>
                <Col onClick={deleteImageHandler}>
                  <DeleteForeverIcon style={{ color:"red" }} />
                </Col>
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
                  {[...Array(9)].map((_, index) => (
                    <MenuItem key={index} value={`Image ${index + 2}`}>
                      {`Image ${index + 2}`}
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

export default DeleteImages;
