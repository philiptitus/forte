import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios'
import Loader from '../components/Loader2';
import unfo from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Col } from 'react-bootstrap';
import {  Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userAction'
import { getUserDetails } from '../actions/userAction';


const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20,
  },
});


const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  const handleRowClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow onClick={handleRowClick}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleRowClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row?.hostel_name}</TableCell>
        <TableCell>{row?.payment_date}</TableCell>
        <TableCell>{row?.accommodation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Student ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row?.type}</TableCell>
                    <TableCell>{row?.amount} {row?.currency}</TableCell>
                    <TableCell>{row?.payment_method}</TableCell>
                    <TableCell>{row?.description}</TableCell>
                    <TableCell>{row?.currency}</TableCell>
                    <TableCell>{row?.user_name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Payments = () => {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  
  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;
 
  const [hasExpired, setHasExpired] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const expirationTime = userInfo?.expiration_time




  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    }
      }, [navigate,userInfo]);
  
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
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

        const response = await axios.get(`/api/students/payments/?name=${searchText}&page=${page}`, config);        
        setPayments(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page, searchText]);

  const handleLoad = () => {
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

<div>
  <Snackbar 
    open={payments.length === 0 && !loading && searchText}
    message="No results found"
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  />
  <Typography variant="h4" gutterBottom>
    Payments
  </Typography>
  <input
    type='search'
    placeholder='Search For Payments'
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
              {payments.length > 0 &&

<div> 

<h6>Filter By Payment Method </h6>
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
onClick={() => handleButtonClick('cash')} // Pass your desired word here
>
  Cash
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
onClick={() => handleButtonClick('credit_card')} // Pass your desired word here
>
  Credit Card
</button>



</div>

          
          }
  <TableContainer component={Paper} className={classes.tableContainer}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Hostel</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Accommodation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <Loader/>
        ) : (
          payments.length > 0 ? (
            payments.map((payment) => (
              <Row key={payment?.id} row={payment} />
            ))
          ) : (
            <div>
            <Typography variant="h5" style={{ color: "red", fontSize:"small" }}>NO PAYMENT FOUND</Typography>
          </div>
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>
</div>



    <div>
<Col style={{ textAlign:"center" }}>



{payments.length > 9 && 
  <ExpandMore

  style={{ 
    backgroundColor:"black",
    color: 'green',
    maxWidth:"40px"
  
  }}onClick={handleLoad}
disabled={loading}
/>

}

{loading && <Loader/>}

</Col>

    </div>
    </div>
  );
};

export default Payments;


