import React, { useState, useEffect, Component } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import { formatDistanceToNow } from 'date-fns';
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
import { listHostelDetails, deleteRoom } from '../actions/hostelActions';
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

import HostelImageForm from '../components/HostelImageForm';


function MasonryImageList({ itemData , alternative}) {
    return (
<div>
      
      <Box sx={{ width: "auto", height: "auto" }}>

        <ImageList variant="masonry" cols={3} gap={8}>

          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={item.img || alternative}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      </div>


    );
  }

  
    function Hostel() {
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

          
  // useEffect(() => {
  //   if (!user) {
  //     logoutHandler()
  //   }
  //     }, [navigate]);


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
        
              let response; // Declare response variable
              let results;
        
              // Construct the API endpoint URL dynamically based on hostelB
              const url = `/api/students/reviews/?hostel_id=${hostelB}&page=${page}`; // Assuming hostelB is a string variable
        
              const reviewsResponse = await axios.get(url, config);
              results = reviewsResponse.data.results;
        
              const iterableResults = Array.isArray(results) ? results : [];
        
              setPosts((prevPosts) => [...prevPosts, ...iterableResults]);
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
        


        const itemData = [
            { img: hostel?.imag1, title: 'Bed' },
            { img: hostel?.imag2, title: 'Bed' },
            { img: hostel?.imag3, title: 'Bed' },
            { img: hostel?.imag4, title: 'Bed' },
            { img: hostel?.imag5, title: 'Bed' },
            { img: hostel?.imag6, title: 'Bed' },
            { img: hostel?.imag7, title: 'Bed' },
            { img: hostel?.imag8, title: 'Bed' },
            { img: hostel?.imag9, title: 'Bed' },
            { img: hostel?.imag10, title: 'Bed' },
          ].filter(item => item.img);
          
          
   
  const submiterHandler = () => {
    navigate(`/register`)
  };
  
  const handleDelete = () => {
    navigate(`/delete`)
  }; 


      

      
        return (
          <div>
            <br />
            <br />
            <br />
            <br />
{loadingHostel ? (
  <Loader/>
) : hostel ? 

(            <Container>
            <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
  <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>
  <Image 
  src={hostel.imag1} 
  alt='https://www.svgrepo.com/show/442075/avatar-default-symbolic.svg' 
  style={{
    borderRadius: "70%",
    border: "2px solid green",
    width: "100px", // Adjust as needed
    height: "70px", // Adjust as needed
    objectFit: "cover" // This property ensures the image covers the circular frame
  }} 
/>
  </Col>
</Row>



              <br />
              {hostel && 
              
              <Row style={{ alignItems: "center" , textAlign:"center"}}>
              <h6>{hostel.hostel_name}</h6>
              <IconButton>
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

              </IconButton>
              <h6 style={{ fontSize: '12px', color: "green" }}>{hostel.address}</h6>
              {hostel.phone &&
                            <h6 style={{ fontSize: '13px', color: "green" }}>Official Contact Number: {hostel.phone}</h6>

              }
                            {hostel.email &&
                            <h6 style={{ fontSize: '13px', color: "green" }}>Official Email: {hostel.email}</h6>

              }
              {/* <b>Joined: {formatTimestamp(user.date_joined)}</b>
              <b>Account Type: {user.user_type}</b> */}
              <b>Capacity: {hostel.capacity} <AirlineSeatIndividualSuiteIcon/></b>
              
          
          
{ 

user.user_type === "admin" && user.hostel == id &&

<b
              style={{
                color:"green"
              }}
              >Currently: {hostel.count} <AirlineSeatIndividualSuiteIcon/></b>

}


{ 

user.user_type === "staff" && user.hostel == id &&

<b
              style={{
                color:"green"
              }}
              >Currently: {hostel.count} <AirlineSeatIndividualSuiteIcon/></b>

}


              <Row>
                <Col style={{ textAlign:"right" }}>
                <h5>Prices</h5>
                </Col>
                <Col style={{ textAlign:"left", color:"red" }}>
                <i>(Per Month) </i>
                </Col>
              </Row>
              


              {

user.user_type === "admin" && user.hostel == id &&  !hostel.room_price_4 &&
<div>
<h6

style={{

  fontSize:"small",
  color:"red"
}}
>This Hostel Wont Take In Accomodations For Quadruple Rooms Because No Price Is Set</h6>
  </div>
  
  }


{

user.user_type === "admin" && user.hostel == id &&  !hostel.room_price_2 &&
<div>
<h6
style={{

  fontSize:"small",
  color:"red"
}}
>This Hostel Wont Take In Accomodations For Double Rooms Because No Price Is Set</h6>
  </div>
  
  }

{

user.user_type === "admin" && user.hostel == id &&  !hostel.room_price_1 &&
<div>
<h6

style={{

  fontSize:"small",
  color:"red"
}}
>This Hostel Wont Take In Accomodations For Single Rooms Because No Price Is Set</h6>
  </div>
  
  }


  






              <i>1. Single Rooms: ${hostel.room_price_1}</i>
              <i>2. Double Rooms: ${hostel.room_price_2}</i>
              <i>4. Quadruple Rooms: ${hostel.room_price_4}</i>
              
              {/* <Popup component={<AccommodationForm  />}  icon={

 <AddIcon />

              } pre="EDIT:  " /> */}
              {user.user_type === "student" &&  !user.hostel &&

<Link to={`/hostelaccomodation/${hostel.id}`} style={{ color: 'green' }} key={hostel.id}>
  Book accomodation Here <AddIcon/>
</Link>
              }

              {

                user.user_type === "admin" && user.hostel == id &&
                <div>
                <Popup component={<HostelForm   defaultValue={hostel}/>}  icon={AddIcon} pre="CHANGE HOSTEL INFORMATION:  " />
                <Popup component={<CreateRoom/>}  icon={AddIcon} pre="ADD NEW ROOMS" />
                <IconButton

onClick={submiterHandler}


>
  <h6>Add Staff</h6>
  <PersonAddIcon/>
</IconButton>



{

user.user_type === "admin" && user.hostel == id &&
<div>
  <button
  onClick={
    handleDelete
  }
  style={{
    color:"red"
  }}
  >
    DELETE THIS HOSTEL
  </button>
  </div>
  
  }




<Row className='justify-content-center'>

{isLargeScreen && user.user_type === "admin" && (
                <div>
                <Row>
                  <Col>
                  
                  <LabTabs id={userInfo && userInfo.id} showReviews={false} showRequests={user.isPrivate} />

                  </Col> 
                </Row>

                </div>

              )}
                    
{isSmallScreen && user.user_type === "admin" &&  (
                <Row>
                  <Col>
                  <LabTabsMobile id={user.id} showReviews={false} showRequests={user.isPrivate}/>
                  </Col>
                </Row>
              )}

<RoomList/>
</Row>

                </div>
              }





            </Row>
              }

              <Row>










              {isLargeScreen && user.user_type === "staff" && (
                <div>
                <Row>
                  <Col>
                  
                  <LabTabs id={userInfo && userInfo.id} showReviews={false} showRequests={user.isPrivate} />

                  </Col> 
                </Row>

                </div>

              )}
                    
{isSmallScreen && user.user_type === "staff" &&  (
                <Row>
                  <Col>
                  <LabTabsMobile id={user.id} showReviews={false} showRequests={user.isPrivate}/>
                  </Col>
                </Row>
              )}









{user.user_type === "staff" && user.hostel == id &&

<RoomList/>
}

              </Row>















              <Row>
              {/* <p>{user.bio}</p> */}
              </Row>
              <br />
      
              <Row className='justify-content-center' style={{ margin:"-8px"}}>
                {/* <Col md={2} >
                  <Popup component={<FollowerList avatar={true} userId={user.id} />} word={user.total_followers} icon={GroupIcon} pre="Followers:  " />
                </Col>
                <Col md={2} style={{ marginLeft:isLargeScreen ?  '-61px': "" }}>
                  <Popup component={<FollowingList avatar={true} userId={user.id} />} word={user.total_following} icon={GroupIcon} pre="Following:  " />

                </Col> */}


              </Row>
              <br />
              <br />

      

      
              {isLargeScreen && (
                <div>
                <Row>
                  <Col style={{ textAlign:"center" }}>
                  <h2>Sample Pictures</h2>
                  
                  {user.user_type === "admin" && user.hostel == id &&
  <Popup component={<HostelImageForm  defaultValue={hostel}/>}  icon={EditIcon}  />

}
                  </Col> 
                </Row>
                <Row className='justify-content-center'>
                <MasonryImageList
                
                itemData={itemData}
                alternative={hostel.imag11}
                />
                <Row>
                  <br/>
                  <br/>
                  <Col style={{ textAlign:"center" }}>
                  <br/>
                  <br/>
                  <br/>

                  <h2>Reviews</h2>
                  
                  

                  {Array.isArray(posts) && posts.length > 0 ? (
      // If there are posts, map over them and render each post
      posts.map((post, index) => (
        <React.Fragment key={index}>
          {/* Render each post using a Detail component */}
          <Row className='justify-content-left' style={{ textAlign:"left" }}>

          <CustomRating  
          value2={post.review}
          value={post.rating}
          value3={post.user_name}
          value7={post.hostel_name}

          value5={post.date_created}
          value4={post.id}
          value6={post}
          showDelete={
            user.user_type === "admin" && user.hostel == id
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










                  </Col> 
                </Row>

                </Row>

                </div>

              )}

                    
{isSmallScreen && (
    <div>
                        <Row>
                  <Col style={{ textAlign:"center" }}>
                  <h2>Sample Pictures</h2>
                  {user.user_type === "admin" && user.hostel == id &&
  <Popup component={<HostelImageForm defaultValue={hostel}/>}  icon={EditIcon}  />

}

                  </Col> 
                </Row>
                <Row className='justify-content-center'>
                <MasonryImageList
                                itemData={itemData}
                                alternative={hostel.imag11}


                />
                <Row>
                  <Col style={{ textAlign:"center" }}>
                  <h2>Reviews</h2>
                  



                 

                  {Array.isArray(posts) && posts.length > 0 ? (
      // If there are posts, map over them and render each post
      posts.map((post, index) => (
        <React.Fragment key={index}>
          {/* Render each post using a Detail component */}
          <Row className='justify-content-left' style={{ textAlign:"left" }}>
          <CustomRating color="yellow" 
          value2={post.review}
          value={post.rating}
          value3={post.user_name}
          value7={post.hostel_name}

          value5={post.date_created}
          value4={post.id}
          value6={post}
          />
          
          


          </Row>

          <br />
          <br />
        </React.Fragment>
      ))
    ) : (
      // If there are no posts, show a message with a link to explore
      <h6>This Hostel Has No reviews</h6>
    )}

<Row className='justify-content-center'>

/</Row>







                  </Col> 
                </Row>
                </Row>

    </div>

              )}
      
              <br />
            </Container>):(
                      <h1>The Item You Are Looking For Does Not Exist</h1>

            )
}

          </div>
        );
      }
      

      export default Hostel;
      
      
