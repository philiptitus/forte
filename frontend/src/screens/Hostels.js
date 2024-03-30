import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import {  Typography, Snackbar } from '@mui/material';

import Loader from '../components/Loader2'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import Image from 'react-bootstrap/Image';

import { useNavigate } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { logout } from '../actions/userAction';
import { getUserDetails } from '../actions/userAction';


function FolderList({name, capacity, avi}) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Image 
  src={avi} 
  alt='https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg' 
  style={{
    borderRadius: "70%",
    border: "2px solid green",
    width: "80px", // Adjust as needed
    height: "50px", // Adjust as needed
    objectFit: "cover" // This property ensures the image covers the circular frame
  }} 
/>          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={capacity} />
      </ListItem>
    </List>
  );
}
function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

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
    
    

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setLoading(true);

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset page when searching
  };

  const handleButtonClick = (word) => {
    setSearchText(word);
  };

  return (
    <div>
            <Snackbar 
        open={hostels.length === 0 && !loading && searchText}
        message="No results found"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <br/>
      <br/>
      <br/>
      <h1>Featured Hostels</h1>
      <input
            type='search'
            placeholder='Search For Hostels'
            value={searchText}
            onChange={handleSearch}
            style={{
              width: '50%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid black',
              color: 'black', // Adjust text color as needed
              background: 'white', // Adjust background color as needed
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

{loading ? (
  <Loader/>
) : hostels.length > 0 ? (
  <>
    {Array.isArray(hostels) && hostels.length > 0 && hostels.map((hostel, index) => (
      <Link to={`/hostel/${hostel.id}`} style={{ color: 'black' }} key={hostel.id}>
        <ul key={hostel.id} sm={12} md={6} lg={4} xl={3}>
          <FolderList 
            name={hostel.hostel_name}
            capacity={hostel.address}
            avi={hostel.imag1}
          />
                {hostel.gender === "female" ? (
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
        </ul>
      </Link>
    ))}
  </>
) : (
  <div>
            <Typography variant="h5" style={{ color: "red", fontSize:"small" }}>NO HOSTEL FOUND</Typography>
  </div>
)}



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

    {loading && <Loader/>}
    </div>
  );
}

export default Hostels;
