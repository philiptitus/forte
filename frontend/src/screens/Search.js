import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Avatar, Chip } from '@material-ui/core';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {   Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader2';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userAction'

import { getUserDetails } from '../actions/userAction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  userTypeLabel: {
    marginBottom: theme.spacing(1),
  },
}));

const Search = () => {
  const classes = useStyles();
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [user_type, setuser_type] = useState('student');
const dispatch = useDispatch()
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();


  
  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

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

        const response = await axios.get(`/api/users/?name=${searchText}&page=${page}`,config );
        setusers(response.data.results);
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
    <div className={classes.root}>
  <Snackbar
    open={users.length === 0 && !loading && searchText}
    message="No results found"
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  />
  <Typography variant="h6" gutterBottom>
    Search Users
  </Typography>
  <input
    type='search'
    placeholder='Search For The Users in This Hostel'
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
            {users.length > 0 &&

<div>

<h6>Filter By Account Type </h6>
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
onClick={() => handleButtonClick('staff')} // Pass your desired word here
>
  Staff
</button>

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
onClick={() => handleButtonClick('student')} // Pass your desired word here
>
  Students
</button>

</div>

          
          }

  {loading ? (
    <Loader/>
  ) : users.length > 0 ? (
    <>
      {users.map((user) => (
<Link to={`/user/${user.id}`}>
        <Card className={classes.card} key={user.id}>
          <CardContent>
            <Avatar alt={user.name} src={user.avi} className={classes.avatar} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
            <Chip
              label={user.user_type.toUpperCase()}
              color={user.user_type === 'student' ? 'primary' : 'secondary'}
              className={classes.userTypeLabel}
            />
          </CardContent>
        </Card>

        </Link>

      ))}
    </>
  ) : (
    <div>
      <Typography variant="h5" style={{ color: "red", fontSize:"small" }}>NO USERS FOUND</Typography>
    </div>
  )}

{users.length > 9 &&

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
</div>


  );
};

export default Search;
