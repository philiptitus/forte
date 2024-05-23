import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Loader from '../components/Loader2';
import {  Typography, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { updateComplaint } from '../actions/studentActions';
import { Form } from 'react-bootstrap';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Row, Col } from 'react-bootstrap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import { createAccomodation } from '../actions/studentActions';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { logout } from '../actions/userAction'
import { getUserDetails } from '../actions/userAction';

import 'react-image-crop/dist/ReactCrop.css';

import { COMPLAINT_UPDATE_RESET } from '../constants/studentConstants';


const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const rooms = [
  { value: '4', label: '4-person Room' },
  { value: '2', label: '2-person Room' },
  { value: '1', label: 'Single Room' }

];

const types = [
  { value: 'Empty', label: 'Empty Room' },
  { value: 'Occupied', label: 'Occupied Room' },

];

const durations = [
  { value: '1', label: '1 Month' },
  { value: '2', label: '2 Months' },
  { value: '3', label: '3 Months' },
  { value: '4', label: '4 Months' },




];

function SelectTextFields() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [hostels, setHostels] = useState([]);
  const [hostel_id, sethostel_id] = useState(1);
  const [capacity, setcapacity] = useState(1);
  const [duration, setduration] = useState(1);
  const [type, settype] = useState('');
const dispatch = useDispatch()
const { enqueueSnackbar } = useSnackbar();
const [hasExpired, setHasExpired] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());

const expirationTime = userInfo?.expiration_time

const userDetails = useSelector((state) => state.userDetails);
const {  user } = userDetails;



// useEffect(() => {
//   if (!user) {
//     logoutHandler()
//   }
//     }, [navigate]);

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
  
  



  const accomodationCreate = useSelector((state) => state.accomodationCreate);
  const { loading: loadingAccomodation, error: errorAccomodation, success, accomodation } = accomodationCreate;

  const submitHandler = () => {

    dispatch(
      createAccomodation({
        hostel_id,
        duration,
        type,
        capacity

      })
    );
    if (errorAccomodation) {
      enqueueSnackbar(errorAccomodation, { variant: 'error' })
    }

  };


  useEffect(() => {
    if (success) {
      enqueueSnackbar("Your Accomodation Was Created Successfully .Be Sure To Report Today", { variant: 'success' });
      navigate('/');
    }
  }, [navigate, success]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

  
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const response = await axios.get(`/api/hostels/?name=${searchText}&page=${page}`, config);
        setHostels(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page, searchText]);
  const handleLoadMore = () => {
    // Increment the page to fetch the next set of posts
    setPage((prevPage) => prevPage + 1);
  };

  const handleButtonClick = (word) => {
    setSearchText(word);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset page when searching
  };

  return (
    <div>
      {loadingAccomodation && <Loader/>}
      <Snackbar 
        open={hostels.length === 0 && !loading}
        message="No results found"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
    <h3>Create A New Accomodation</h3>

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
  <TextField
  id="filled-select-currency"
  select
  label="Select"
  value={hostel_id}
  onChange={(e) => sethostel_id(e.target.value)}
  variant="filled"
  helperText="Please select A Hostel"
>
  <input
    type='search'
    placeholder='Search For Hostels'
    value={searchText}
    onChange={handleSearch}
    style={{
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid black',
      color: 'black',
      background: 'white',
    }}
  />

{hostels.length > 0 &&

<div>

<h6>Filter By Gender </h6>

<button
style={{
backgroundColor: 'green', // Change the background color to blue
color: 'white', // Change the text color to white
padding: '3px 6px', // Reduce padding to make the button smaller
border: 'none', // Remove the border
borderRadius: '3px', // Add border radius for rounded corners
cursor: 'pointer', // Show pointer cursor on hover
fontSize: '8px', // Reduce font size to fit within the button
maxWidth:"130px"
}}
onClick={() => handleButtonClick('female')} // Pass your desired word here
>
Female
</button>
</div>

          
          }


{hostels.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.hostel_name}
          {option.gender === "female" ? (
                          <FemaleIcon
                          style={{ 
            
                            color:"pink"
                          }}
                          />
            
                            ) :(
                              <MaleIcon
                              
                              style={{ 
            
                                color:"blue"
                              }}
                              />
                            ) }
        </MenuItem>

      ))}
{hostels.length > 9 &&

<Row className='justify-content-center'>
<IconButton
  style={{ 
    backgroundColor:"black",
    color: 'green',
    maxWidth:"40px"
  
  }}
    
  onClick={handleLoadMore}
  disabled={loading || page >= totalPages}
>
  <KeyboardArrowDownIcon />
</IconButton>
</Row>

}

</TextField>






    <TextField
      id="filled-select-currency"
      select
      label=" select"
      defaultValue="EUR"
      value={capacity}
      onChange={(e) => setcapacity(e.target.value)}
      variant="filled"

      helperText="Please select a Room Capacity"
    >
      {rooms.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </div>
  <div>


    <TextField
      id="filled-select-currency"
      select
      label="Select"
      defaultValue="EUR"
      value={type}
      onChange={(e) => settype(e.target.value)}
      helperText="Please select your Prefered Room Type"
      variant="filled"
    >
      {types.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>

    
    <TextField
          id="filled-select-currency"

      select
      label="Native select"
      value={duration}
      onChange={(e) => setduration(e.target.value)}

      helperText="Please select your Prefered Duration Of Stay"
      variant="filled"
    >
      {durations.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </div>
  <div>
    <Row className='justify-content-center'>
      <IconButton
        style={{  color: 'red' }}
        onClick={handleLoadMore}
        disabled={loading}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Row>
  </div>
</Box>



    <button type="submit" className="btn btn-primary mt-2">
            <AddIcon/>
          </button>
</form>



    </Col>
    /</Row>
    /</div>
  );
}

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


function NewAccomodation() {


  return (
    <div>
      {}
      <br />
      <br />
      <Row className="align-items-center" style={{ alignItems:"center" }}>
        
        <SelectTextFields/>

        
      </Row>
    </div>
  );
}

export default NewAccomodation;
