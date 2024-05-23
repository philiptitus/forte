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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



function CustomizedTables() {
  const { id } = useParams();

  const hostelDetail = useSelector((state) => state.hostelDetail);
  const { error, loading:loadingHostel, hostel } = hostelDetail;
  const dispatch = useDispatch()
  
  const hostelEdit = useSelector((state) => state.hostelEdit);
  const {  success:successEdit } = hostelEdit;

  const isMobile = window.innerWidth <= 768; // Check if the screen width is less than or equal to 768 pixels

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listHostelDetails(id));
      dispatch(getUserDetails('profile'));

    }
  }, [dispatch, userInfo, successEdit]);


  const rows = [
    createData('Single Rooms', 159, 6.0, 24, '$' + hostel.room_price_1),
    createData('Double Rooms', 237, 9.0, 37, '$' + hostel.room_price_2),
    createData('4 Person Room', 262, 16.0, 24, '$' + hostel.room_price_4),
  ];
   


  return (
    <TableContainer 
    
    style={{
      width: window.innerWidth <= 768 ? "270px" : "1000px", // Adjust width for mobile
      marginLeft: window.innerWidth <= 768 ? "1px" : "25px",

    }}
    
    component={Paper}>

<Tooltip title="*Tip: Any Room With Null prices shall not take accomodations" arrow>

      <Table sx={{  }} 
      

      aria-label="customized table">
        {isMobile &&
        <i
        style={{
          fontSize:"8px"
        }}
        >
        
        * Tip: Any Room With Null prices is not taking accomodations For Now
        </i>
        }


        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
<StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
</Tooltip>

    </TableContainer>
  );
}





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
          
          <div
          style={{
            marginLeft: window.innerWidth <= 768 ? "40px" : "50px",

          }}

          >



{loadingHostel ? (
  <Loader/>

) : hostel ? 

(            <Container>
  {loadingImage && <Loader/>}

<div

style={{
  border: "1px solid grey",
  borderRadius: "10px",
}}
>
            <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" 
          
          ,

          }}>
  <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>
  <Image 
  src={hostel.imag1} 
  alt='Main Photo' 
  style={{
    borderRadius: "70%",
    border: "2px solid green",
    width: "100px", // Adjust as needed
    height: "70px", // Adjust as needed
    objectFit: "cover" // This property ensures the image covers the circular frame
  }} 
/>

  </Col>

  <Row
  
  style={{ 
    alignItems:"center",
    textAlign:"center",
  }}
  >
    <Col
    
    style={{

      marginRight: window.innerWidth <= 768 ? "-200px" : "-1000px", // Adjust width for mobile

    }}
    >
  {/* {user.user_type === "admin" && user.hostel == id &&
  <Popup  component={<HostelForm2  defaultValue={hostel}/>}  icon={EditIcon}  />

} */}

    </Col>
    {hostel.imag1 &&  


    <Col
    onClick={resetImageHandler}
    >

{/* {

user.user_type === "admin" && user.hostel == id &&
            <DeleteForeverIcon
      
      style={{
        color:"red"
      }}
      />
    } */}




    </Col>
  }


  </Row>





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
              
          
          






       



 
              {/* <Popup component={<AccommodationForm  />}  icon={

 <AddIcon />

              } pre="EDIT:  " /> */}
              {user.user_type === "student" &&  !user.hostel &&
              <Row
              className='justify-content-center'
            
            
            style={{
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
              marginLeft: window.innerWidth <= 768 ? "1px" : "2px",
            }}
            >
  <Button
  component={Link}
  to={`/hostelaccomodation/${hostel.id}`}
  style={{ backgroundColor: 'green', color:"white", maxWidth:"1100px" }}
  variant="contained"
>
  Book Accommodation Here
  <AddIcon style={{ marginLeft: '5px' }} />
</Button>
</Row>
      }
      <br/>
<br/>
        
              {user.user_type === "student" &&  
<div>

<CustomizedTables/>
</div>
              }





            </Row>
              }

       </div>
       
       
              <Row
              
              
              >










    
                    












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

      
<div
style={{
  border: "1px solid grey",
  borderRadius: "10px",
}}
>

              {isLargeScreen && (
                <div>
                <Row>
                  <Col style={{ textAlign:"center" }}>
                  <h2>Sample Pictures</h2>
                  

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
                  <Col >
                  <br/>
                  <br/>
                  <br/>

                  <h2>Reviews</h2>
                  
                  

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

{loading && <Loader/>}
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










                  </Col> 
                </Row>

                </Row>

                </div>

              )}

                    
{isSmallScreen && (
    <div
    
    
    style={{
      border: "1px solid grey",
      borderRadius: "10px",
    }}
    >
                        <Row>
                  <Col style={{ textAlign:"center" }}>
                  <h2>Sample Pictures</h2>

                  </Col> 
                </Row>
                <Row className='justify-content-center'>
                <MasonryImageList
                                itemData={itemData}
                                alternative={hostel.imag11}


                />
                <Row>
                  <Col >
                  <h2>Reviews</h2>
                  



                 

                  {Array.isArray(posts) && posts.length > 0 ? (
      // If there are posts, map over them and render each post
      posts.map((post, index) => (
        <React.Fragment key={index}>
          {/* Render each post using a Detail component */}
          <Row className='justify-content-left' >
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

{loading && <Loader/>}
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

<Row className='justify-content-center'>

</Row>







                  </Col> 
                </Row>
                </Row>

    </div>

              )}
              </div>
      


              <br />
            </Container>):(
                      <h1>The Item You Are Looking For Does Not Exist</h1>

            )
}

          </div>
        );
      }
      

      export default Hostel;
      
      
