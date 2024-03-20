import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import Detail from '../components/Detail';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Loader from '../components/Loader2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { updateComplaint , createComplaintAction, createMaintenanceAction, createReview} from '../actions/studentActions';
import { Form } from 'react-bootstrap';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import { createAccomodation } from '../actions/studentActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Popup from '../components/PopUp';
import shadows from '@mui/material/styles/shadows';
import { Rating } from '@mui/material';
import { green } from '@mui/material/colors';
import CustomRating from './Rating';
import { Snackbar, Typography } from '@mui/material';
import Divider from '@mui/material';
import { getUserDetails } from '../actions/userAction';

const ratings = [
  { value: '1', label: 'Poor' },
  { value: '2', label: 'Fair' },
  { value: '3', label: 'Average' },
  { value: '4', label: 'Good' },
  { value: '5', label: 'Excellent' },
];



function SelectTextFields({isC=false, isM=false, isR=false}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [facilities, setFacilities] = useState([]);
  const [facility_id, setfacility_id] = useState(1);
  const [capacity, setcapacity] = useState(1);
  const [duration, setduration] = useState(1);
  const [rating, setrating] = useState(1);

  const [type, settype] = useState('');
  const [review, setreview] = useState('');

  const [description, setdescription] = useState('');

const dispatch = useDispatch()
const { enqueueSnackbar } = useSnackbar();


  const complaintCreate = useSelector((state) => state.complaintCreate);
  const { loading: loadingcomplaint, error: errorcomplaint, success:successComplaint, complaint } = complaintCreate;


  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { loading: loadingreview, error: errorreview, success:successReview, review:createdreview } = reviewCreate;

  const maintenanceCreate = useSelector((state) => state.maintenanceCreate);
  const { loading: loadingmaintenance, error: errormaintenance, success:successMaintenance, maintenance } = maintenanceCreate;


  const submitHandler = () => {

    dispatch(
      createComplaintAction({
        description,

      })
    );
    if (successComplaint) {
      enqueueSnackbar("Your  Complaint was sent To The Hostel Manager", { variant: 'success' });
    }
    if (errorcomplaint) {
      enqueueSnackbar(errorcomplaint, { variant: 'error' })
    }

  };

  const submitHandlerMaintenance = () => {

    dispatch(
      createMaintenanceAction({
        facility_id,

      })
    );
    if (successMaintenance) {
      enqueueSnackbar("Your Maintenace Request Was Sent To The Hostel Manager", { variant: 'success' });
    }
    if (errormaintenance) {
      enqueueSnackbar(errormaintenance, { variant: 'error' })
    }

  };


  const submitHandlerReview = () => {

    dispatch(
      createReview({
        review,
        rating

      })
    );
    if (successReview) {
      enqueueSnackbar("Review Sent Thanks For The Feedback!", { variant: 'success' });
    }
    if (errorreview) {
      enqueueSnackbar(errorreview, { variant: 'error' })
    }

  };


  


  // useEffect(() => {
  //   if (success) {
  //     enqueueSnackbar("Your Accomodation Was Created Successfully .Be Sure To Report Today", { variant: 'success' });
  //     navigate('/');
  //   }
  // }, [navigate, success]);




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
  
        const response = await axios.get(`/api/hostels/facilities/?name=${searchText}&page=${page}`, config);
        setFacilities((prevFacilities) => [...prevFacilities, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching facilities:', error);
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
  return (
    <div>
    <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      {loading && <Loader/>}
      {loadingreview && <Loader/>}
      {loadingcomplaint && <Loader/>}
      {loadingmaintenance && <Loader/>}



      {isC &&
          <h6>Make A Complaint</h6>

      }
            {isR &&
          <h6>Make A Review For Your Latest Hostel Accmodation</h6>

      }

{isM &&
          <h6>Make A Maintenace Request</h6>

      }

    <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>

    <form onSubmit={isC ? submitHandler : isM ? submitHandlerMaintenance : isR ? submitHandlerReview : undefined}>

<Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
  }}
  noValidate
  autoComplete="off"
>
  <div>



  {isM && (
  <TextField
    id="filled-select-currency"
    select
    defaultValue="EUR"
    label="Select"
    value={facility_id}
    onChange={(e) => setfacility_id(e.target.value)}
    variant="filled"
    helperText="Please select The Facility You need Fixed"
  >
    {Array.isArray(facilities) &&
      facilities.length > 0 &&
      facilities.map((option, index) => (
        <MenuItem key={option.id} value={option.id}>
          {option.facility_type}
        </MenuItem>
      ))}
    {facilities.length > 9 && (
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
    )}
  </TextField>
)}




{

  isC &&
  <TextField
  id="outlined-textarea"
  label="Complaints"
  value={description}
onChange={(e) => setdescription(e.target.value)}
  placeholder="Describe Your Complain Here"
  multiline
/>

}

{
  isR &&

  <div>
  <TextField
  id="outlined-textarea"
  label="Review"
  placeholder="Write Your Review Here"
  value={review}
onChange={(e) => setreview(e.target.value)}
  multiline
/>






<TextField
id="filled-select-currency"
select
label="Select"
defaultValue="EUR"
value={rating}
onChange={(e) => setrating(e.target.value)}
helperText="Choose A Rating"
variant="filled"
>
{ratings.map((option) => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
))}
</TextField>
</div>






}


  </div>
  <div>
  </div>
  <div>
  {ratings.length > 9 &&

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






function ProfileComponents({id, showMaintenance = false, showReviews = false, showComplain = false, showPopUp = false }) {

  const [posts, setPosts] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
    const dispatch = useDispatch();




    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success } = reviewDelete;

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

    const maintenanceCreate = useSelector((state) => state.maintenanceCreate);
    const {
  
      success: successCreate,
  } = maintenanceCreate



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
    
          let response; // Declare response variable
          let results;

          if (showMaintenance) {
            const maintenanceResponse = await axios.get(`/api/students/maintenances/?name=${searchText}&page=${page}`, config);
            results = maintenanceResponse.data.results;
          } else if (showReviews) {
            const reviewsResponse = await axios.get(`/api/students/reviews/?name=${searchText}&page=${page}`, config);
            results = reviewsResponse.data.results;
          } else if (showComplain) {
            const complainResponse = await axios.get(`/api/students/complaints/?name=${searchText}&page=${page}`, config);
            results = complainResponse.data.results;
          }
          const iterableResults = Array.isArray(results) ? results : [];
    
          setPosts(results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [page, searchText, showComplain, showMaintenance, showReviews, success]);
    


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
  <br />

  <br />
    <div className='container text-center'>
      
{showPopUp && 
  <Popup component={<SelectTextFields isM={showMaintenance} isC={showComplain} isR={showReviews}/>}  icon={AddIcon} pre="NEW:  " />

}



{!showReviews ? (
  <React.Fragment>
    <Snackbar 
      open={posts.length === 0 && !loading && searchText}
      message="No results found"
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    />
    <input
      type='search'
      placeholder='Search Here'
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

{posts.length > 0 &&

<div>

<h6>Filter By Type </h6>

{showComplain && 
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
onClick={() => handleButtonClick('Open')} // Pass your desired word here
>
  Open
</button>

}

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
onClick={() => handleButtonClick('In Progress')} // Pass your desired word here
>
  In Progress
</button>




{showMaintenance && 


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
onClick={() => handleButtonClick('Pending')} // Pass your desired word here
>
  Pending
</button>

}



</div>

          
          }

    {loading ? (
      <Loader/>
    ) : posts.length > 0 ? (
      <>
        {Array.isArray(posts) && posts.length > 0 ? (
          // If there are posts, map over them and render each post
          posts.map((post, index) => (
            <React.Fragment key={index}>
              {/* Render each post using a Detail component */}
              <Row className='justify-content-center'>
                <Detail
                  d1={`ID: ${post.id}`}
                  d2={post.resolved ? <span style={{ color: 'green' }}>RESOLVED</span> : <span style={{ color: 'red' }}>UNRESOLVED</span>}
                  d3={"STUDENT ID NUMBER: " + post.student_name}
                  d4={"DATE: " + formatTimestamp(post.date_raised)}
                  d9={"STATUS: " + post.status}
                  d8={post.description ? `DESCRIPTION: ${post.description}` : `FACILITY: ${post.facility_name}`}
                  link1={showMaintenance ? `/maintenance/${post.id}` : (showComplain ? `/complaint/${post.id}` : '#')}
                  style={{ color: 'black' }}
                  acc={post}
                />
              </Row>
              <br />
              <br />
            </React.Fragment>
          ))
        ) : (
          // If there are no posts, show a message with a link to explore
          <h6>Nothing To See Here Yet</h6>
        )}
      </>
    ) : (
      <div>
            <Typography variant="h5" style={{ color: "red", fontSize:"small" }}>NOTHING FOUND</Typography>
      </div>
    )}
  </React.Fragment>
) : null}




{showReviews ? (
  <React.Fragment>
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
          showDelete={true}
          />
          


          </Row>
          <br />
          <br />
        </React.Fragment>
      ))
    ) : (
      // If there are no posts, show a message with a link to explore
      <h6>You Currently Have No reviews</h6>
    )}
  </React.Fragment>
) : null}




      
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
{loading && <Loader/>}
    </div>
</div>


      );
}

export default ProfileComponents