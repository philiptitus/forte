
import React, { useState, useEffect } from 'react';
import {  Typography, Button, IconButton, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Loader from '../components/Loader2';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import BootstrapButton from 'react-bootstrap/Button'; // Importing Button as BootstrapButton

import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../actions/userAction';
import { formatDistanceToNow } from 'date-fns';
import Detail from '../components/Detail';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { logout } from '../actions/userAction'
import AdminCard from '../components/AdminCard';
import StudentCard from '../components/StudentCard';

import Acard from '../components/Acard';



const useStylers = makeStyles((theme) => ({
  button: {
    backgroundColor: 'green',
    color: 'white',
    padding: theme.spacing(1, 3),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: 'darkgreen',
    },
  },
}));





function Home() {

  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const classes = useStylers();
  const [tokenExpired, setTokenExpired] = useState(false);

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
        const response = await axios.get(`/api/hostels/accomodations/?name=${searchText}&page=${page}`, config);
        setAccommodations(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching Accommodations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchText, userInfo]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset page when searching
  };

  const handleButtonClick = (word) => {
    setSearchText(word);
  };


  const submiterHandler = () => {
    navigate(`/newhostel`)
  };  

  return (
    <div
    
    style={{
      marginLeft: "40px",
      '@media only screen and (min-width: 601px)': {
        marginLeft: "0px"
      }
    }}
    >
      <Snackbar
        open={accommodations.length === 0 && !loading && searchText}
        message="No results found"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
         

      <div className='container text-center'>
        <Row className='justify-content-center'>
          {user?.user_type == "admin"  && !user?.hostel &&

<Button
style={{ backgroundColor:"red"}}
onClick={submiterHandler}
>
<h6>Continue With Hostel Setup Process</h6> 
  </Button>

          
          }

{accommodations.lenght > 0 &&      <Typography variant="h5" style={{ fontFamily: "'Playfair Display', serif" }}>ACCOMMODATIONS</Typography>
}   
          <input
            type='search'
            placeholder='Search Accomodation No'
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
          {accommodations.length > 0 &&

<div>

<h6>Filter By Status </h6>
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
onClick={() => handleButtonClick('completed')} // Pass your desired word here
>
Completed Accommodations
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
onClick={() => handleButtonClick('Active')} // Pass your desired word here
>
Active Accommodations
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
onClick={() => handleButtonClick('cancelled')} // Pass your desired word here
>
Cancelled Accommodations
</button>

<button
style={{
backgroundColor: 'red', // Change the background color to blue
color: 'white', // Change the text color to white
padding: '3px 6px', // Reduce padding to make the button smaller
border: 'none', // Remove the border
borderRadius: '3px', // Add border radius for rounded corners
cursor: 'pointer', // Show pointer cursor on hover
fontSize: '8px', // Reduce font size to fit within the button
maxWidth:"130px"
}}
onClick={() => handleButtonClick('Delayed Payment')} // Pass your desired word here
>
NEW!
</button>
</div>

          
          }





        </Row>

        {loading ? (
          <Loader />
        ) : accommodations.length > 0 ? (
          accommodations.map((accommodation, index) => (
<React.Fragment key={index} style={{ textAlign: "center" }}>
<Row 
  className='justify-content-center'
  style={{
    textAlign: "center",
    alignContent: "center",
    alignItems: "center"
  }}
>
  {/* <Detail
    d1={`ACCOMODATION NO: ${accommodation.id}`}
    d2={accommodation.paid ? <span style={{ color: 'green' }}>PAID</span> : <span style={{ color: 'red' }}>NOT PAID</span>}
    d3={"STUDENT ID NUMBER: " + accommodation.person_name}
    d4={"ROOM NO: " + accommodation.room}
    d9={"STATUS: " + accommodation.status}
    d8={`PRICE: ${accommodation.price}`}
    link1={`/accom/${accommodation.id}`}
    style={{ color: 'black' }}
    acc={accommodation}
    showRed={accommodation.status === "Delayed Payment"}
  /> */}
  <Acard
  number={accommodation.id}
  paid={accommodation.paid ? <span style={{ color: 'green' }}>YES</span> : <span style={{ color: 'red' }}>NO</span>}
  student_id={accommodation.person_name}
  room={accommodation.room}
  status={accommodation.status}
  price={accommodation.price}
  link1={`/accom/${accommodation.id}`}
  showRed={accommodation.status === "Delayed Payment"}

  
  
  />
</Row>

              <br />
              <br />
            </React.Fragment>
          ))
        ) : (
          <div>
            <Typography variant="h5" style={{ color: "red", fontSize:"small" }}>NO ACCOMMODATIONS FOUND</Typography>
            {user.user_type === "student" && 
            <StudentCard/>
            }
            {user.user_type === "staff" && 
            <AdminCard/>
            }
            {user.user_type === "admin" && 
            <AdminCard/>
            }

{ user.user_type === "student" &&   <Typography variant="h6"><Link style={{ color: "green" , fontSize:"small"}} to='/Hostels'>Find Hostels</Link></Typography>
          
          }
          </div>
        )}

{accommodations.length > 9 &&

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
    </div>
  );
}

export default Home;



