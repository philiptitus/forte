import React, { useState, useEffect, Component } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import { formatDistanceToNow } from 'date-fns';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
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
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Loader from '../components/Loader2';
import Delete from '../components/Delete';
import { listHostelDetails, deleteRoom, resetImage } from '../actions/hostelActions';
import AddIcon from '@material-ui/icons/Add';
import RoomList from '../components/roomList';
import CustomRating from '../components/Rating';
import HostelForm from '../components/HostelForm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import{ IconButton }from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CreateRoom from './CreateRoom'
import RoomForm from '../components/RoomForm';
import Tab from '@mui/material'; 
import { logout } from '../actions/userAction'
import HostelForm2 from '../components/Hostelform2';
import HostelImageForm from '../components/HostelImageForm';
import Tooltip from '@mui/material/Tooltip';


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteImages from '../components/DeleteMainImage';




function MasonryImageList({ itemData , alternative}) {

    const dispatch = useDispatch()
  
  const resetImagesHandler = ({ value }) => {
    console.log(value); // Logs the value property of the object
  dispatch(resetImage({
    value
  }))
  
  };
  
      return (
  
  
        <div>
    <Box sx={{ width: "auto", height: "auto" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <div key={item.img}>
            <ImageListItem>
              <div style={{ position: 'relative' }}>
                {/* <Button onClick={() => resetImagesHandler({ value: item.title.toString() })} style={{ position: 'absolute', top: 0, right: 0 }}>
                  <DeleteForeverIcon />
                </Button> */}
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={item.img || alternative}
                  loading="lazy"
                />
              </div>
            </ImageListItem>
          </div>
        ))}
      </ImageList>
    </Box>
  </div>
  
  
  
      );
    }
  


const Dashboard = () => {


    const isLargeScreen = useMediaQuery('(min-width: 600px)');
    const isSmallScreen = useMediaQuery('(max-width: 480px)');
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const { id } = useParams();
    const hostelB = id
    const [selectedOption, setSelectedOption] = useState(0);
  
    const handleOptionChange = (event, newValue) => {
      setSelectedOption(newValue);
    };

    const hostelEdit = useSelector((state) => state.hostelEdit);
    const {  success:successEdit } = hostelEdit;

    const hostelDetail = useSelector((state) => state.hostelDetail);
    const { error, loading:loadingHostel, hostel } = hostelDetail;
    const { enqueueSnackbar } = useSnackbar();
    const [posts, setPosts] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [reviews, setReviews] = useState([]);
  
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [totalPages, setTotalPages] = useState(1);



    const [hasExpired, setHasExpired] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    
    const expirationTime = userInfo?.expiration_time




    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imag, setimag] = useState('imag1');

    const imageReset = useSelector((state) => state.imageReset);
    const { loading: loadingImage, error: errorImage, success:successImage } = imageReset;
  

    const userDetails = useSelector((state) => state.userDetails);
    const {  user } = userDetails;

    const roomCreate = useSelector((state) => state.roomCreate);
const {   success:successRoom } = roomCreate;


    
    const accomodationCreate = useSelector((state) => state.accomodationCreate);
    const { loading: loadingAccomodation, error: errorAccomodation, success, accomodation } = accomodationCreate;
  

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
          
          
          
          
    

        useEffect(() => {
          if (userInfo) {
            dispatch(listHostelDetails(id));
            dispatch(getUserDetails('profile'));

          }
        }, [dispatch, userInfo, successRoom, successEdit]);

        useEffect(() => {
          if (errorAccomodation) {
            enqueueSnackbar(errorAccomodation, { variant: 'error' });
            navigate('/');
          }
        }, [navigate, error]);



        useEffect(() => {
          const fetchData = async () => {
            try {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userInfo.token}`,
                },
              };
        
              setLoading(true);
        
              const response = await axios.get(`/api/students/reviews/?hostel_id=${hostelB}&page=${page}`, config);

              // Construct the API endpoint URL dynamically based on hostelB        
        
              setPosts(response.data.results);
              setTotalPages(response.data.total_pages);
            } catch (error) {
              console.error('Error fetching reviews:', error);
            } finally {
              setLoading(false);
            }
          };
        
          // Call fetchData only when hostelB, page, or success changes
          fetchData();
        }, [page, searchText, success, hostelB]); // Include hostelB in the dependency array
        
        const handleLoadMore = () => {
          setPage(prevPage => prevPage + 1);
        };


        useEffect(() => {

          if (successImage) {
            enqueueSnackbar("Main Hostel Photo Removed !", { variant: 'success' });
          }        
          
          if (errorImage) {
            enqueueSnackbar("Something went wrong!", { variant: 'error' });
      
            
          }
          
        }, [navigate, successImage, errorImage]);
      
      

        const itemData = [
            { img: hostel?.imag2, title: 'imag2' },
            { img: hostel?.imag3, title: 'imag3' },
            { img: hostel?.imag4, title: 'imag4' },
            { img: hostel?.imag5, title: 'imag5' },
            { img: hostel?.imag6, title: 'imag6' },
            { img: hostel?.imag7, title: 'imag7' },
            { img: hostel?.imag8, title: 'imag8' },
            { img: hostel?.imag9, title: 'imag9' },
            { img: hostel?.imag10, title: 'imag10' },
          ].filter(item => item.img);
          
          

          const resetImageHandler = () => {
            dispatch(resetImage({
              imag
            }))
        
        
          };


   
  const submiterHandler = () => {
    navigate(`/register`)
  };
  
  const handleDelete = () => {
    navigate(`/delete`)
  }; 


  

      



  return (
    <div>
      {hostel && (user.user_type === "staff" || user.user_type === "admin") ? (

    <div
    
    style={{
      
 marginLeft:"50px"
      
      
      
        
  
      
      }}
    >
      {/* Importing CSS */}
      <style>
        {`
.datPinkColor {
    background-color: green !important;
  }
  

          #jumbotron {
            background-color: black;
          }

          #firstProgressBar {
            background-color: darkgrey;
            width: 80%;
          }

          #secondProgressBar {
            background-color: darkgrey;
            width: 57%;
          }

          #footer {
            background-color: black;
            height: 100px;
            padding: 50px;
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark datPinkColor">
{  
loadingHostel ? (
    <Loader/>
  
  ) : hostel ? 


  (      <div className="container">
          {/* Navbar Brand */}
          <a 
          style={{
            fontSize:"small"
          }}
          className="navbar-brand" >
            Forte Administration Panel
          </a>

          {/* Navbar Toggler */}
   
          {/* Navbar Content */} 


          {/* Welcome Text */}
          <span className="navbar-text text-white">Welcome {userInfo.email}</span>

          <span className="navbar-text text-white"> {user.user_type}</span>

          {/* Create Content Dropdown */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
{user.user_type == "admin" &&


<a href='/#/adminsettings'>
  {hostel.imag1 ? (
    <Image 
      src={hostel.imag1} 
      alt='Main Photo' 
      style={{
        borderRadius: "70%",
        border: "2px solid green",
        width: "50px", // Adjust as needed
        height: "50px", // Adjust as needed
        objectFit: "cover" // This property ensures the image covers the circular frame
      }} 
    />    
  ) : (
    <SettingsIcon/>
  )}
</a>




              }
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" data-target="#exampleModal" data-toggle="modal">
                  Create Restaurant
                </a>
                <a className="dropdown-item" href="#">
                  Create Pages
                </a>
              </div>
            </li>
          </ul>
        </div>):(
                      <h1>The Item You Are Looking For Does Not Exist</h1>

            )
        
    
    }
      </nav>

      {/* Jumbotron */}
      <div className="jumbotron jumbotron-fluid" id="jumbotron">
        <div className="container">
          <h1 className="display-4 text-white">
            <i className="fas fa-cogs"></i> Dashboard
          </h1>
        </div>
      </div>

      {/* Main Container */}
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              Home
            </li>
          </ol>
        </nav>

        {/* Left Row */}
        <div className="row">
          {/* First Left Column */}
          <div className="col-lg-3 col-md-4 col-sm-12">


            {/* Bandwidth and Space Usage */}
            <br />
            <div className="card">
              <div className="card-body">
              <h6>Space Used</h6>

              <div className="progress">
  <div
    className="progress-bar"
    role="progressbar"
    id="secondProgressBar"
    aria-valuenow={(hostel.count / hostel.capacity * 100).toFixed(1)}
    aria-valuemin="0"
    aria-valuemax="100"
  >
    {(hostel.count / hostel.capacity * 100).toFixed(1)}%
  </div>
</div>

              </div>
            </div>

            
          </div>

          {/* Right Column */}
          <div className="col-lg-9 col-md-8 col-sm-12">
            {/* Featured Card */}
            <div className="card">
              <div className="card-header text-white datPinkColor">Featured</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                    <div className="card text-center bg-light">
                      <div className="card-body">
                        <h3 className="card-text">
                          <i className="fas fa-bed"></i> {hostel.count}
                        </h3>
                        <h5>Currently IN</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                    <div className="card text-center bg-light">
                      <div className="card-body">
                        <h3 className="card-text">
                          <i className="fas fa-user"></i> {hostel.capacity}
                        </h3>
                        <h5>Capacity</h5>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header text-white datPinkColor">Current Room Prices</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                    <div className="card text-center bg-light">
                      <div className="card-body">
                        <h3 className="card-text">
                           {hostel.room_price_1}
                        </h3>
                        <h5>Single Rooms</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                    <div className="card text-center bg-light">
                      <div className="card-body">
                        <h3 className="card-text">
                           {hostel.room_price_2}
                        </h3>
                        <h5>Double Rooms</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 mb-3">
                    <div className="card text-center bg-light">
                      <div className="card-body">
                        <h3 className="card-text">
                         {hostel.room_price_4}
                        </h3>
                        <h5>Quadruple rooms</h5>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* End Featured Card */}
            <br />
            {/* New Users Card */}
            <div className="card">
              <div className="card-header text-white datPinkColor">Hostel Room Management</div>
              <div className="card-body">

                <RoomList/>
              </div>
            </div>

   
            {/* End New Users Card */}

            <br/>
            <div className="card"
            
            style={{
                backgroundColor:"#ACE1AF"
            }}
            >
              <div className="card-header text-white datPinkColor">Complaints and Maintenance Requests</div>
              <div className="card-body">

              <LabTabsMobile id={user.id} showReviews={false} showRequests={user.isPrivate}/>
              </div>
            </div>


            <br/>
            <div className="card">
              <div className="card-header text-white datPinkColor">  Hostel Sample Pictures</div>
              <div className="card-body">

              <MasonryImageList
                
                itemData={itemData}
                alternative={hostel.imag11}
                />              </div>
            </div>


            <br/>
            <div className="card">
              <div className="card-header text-white datPinkColor"> REVIEWS </div>
              <div className="card-body">
              {loading && <Loader/>}



              {Array.isArray(posts) && posts.length > 0 ? (
      // If there are posts, map over them and render each post
      posts.map((post, index) => (
        <React.Fragment key={index}>
          {/* Render each post using a Detail component */}
          <Row className='justify-content-left' >

          <CustomRating  
          value2={post.review}
          value={post.rating}
          value3={post.user_name}
          value7={post.hostel_name}

          value5={post.date_created}
          value4={post.id}
          value6={post}
          showDelete={
            user.user_type === "admin" 
          }

          />
          


          </Row>
          







          <br />
          <br />
        </React.Fragment>
      ))
    ) : (
      // If there are no posts, show a message with a link to explore
      <h6>This Hostel Has No Reviews</h6>
    )}

{posts.length > 9 &&

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
            
          </div>
          {/* End Right Column */}
        </div>
        {/* End Left Row */}
      </div>
      {/* End Main Container */}
      <br />

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{/* Modal Body Content */}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
      {/* Optional JavaScript */}
      {/* jQuery first, then Popper.js, then Bootstrap JS */}
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossOrigin="anonymous"></script>
    </div>
):(
  <h3>The Item You Are Looking For Doesnt Exist</h3>
)}

    </div>

  );
}

export default Dashboard;
