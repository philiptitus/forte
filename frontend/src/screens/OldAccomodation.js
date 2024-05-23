import React, { useState, useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Paper, Grid, Divider, Chip, Avatar, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import { listAccomodationDetails } from '../actions/studentActions';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader2';
import { formatDistanceToNow } from 'date-fns';
import Popup from '../components/PopUp';
import EditAccomodationForm from '../components/EditAccomodationForm';
import { getUserDetails } from '../actions/userAction';
import { logout } from '../actions/userAction'



const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    backgroundColor: '#f9f9f9',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: theme.spacing(6),
    color: '#333',
    borderBottom: '3px solid #333',
    paddingBottom: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '2.5rem',
    textTransform: 'uppercase',
  },
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(6),
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  gridItem: {
    padding: theme.spacing(3),
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: theme.spacing(1),
  },
  detailValue: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
}));

const OldAccommodation = () => {

  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const navigate = useNavigate()
  const classes = useStyles();
  const accomodationDetail = useSelector((state) => state.accomodationDetail);
  const { error, loading, accomodation, success:successAccomodation } = accomodationDetail;
  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;

  const [hasExpired, setHasExpired] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());

const expirationTime = userInfo?.expiration_time

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
  
  

  
  const accomodationUpdate = useSelector((state) => state.accomodationUpdate);
  const {  success:successEdit, loading:loadingEDit } = accomodationUpdate;

      
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
    if (userInfo) {
      dispatch(listAccomodationDetails(id));
      dispatch(getUserDetails('profile'));

      
    }
  }, [dispatch, id, successAccomodation, userInfo, successEdit]);
  


  

  const data = {
    "id": 29,
    "student": "john.doe@example.com",
    "room": "230",
    "hostel": "Spacy Hostel & Motel",
    "check_in_date": "2024-03-06",
    "check_out_date": null,
    "price": 89.0,
    "paid": false,
    "status": "Completed",
    "duration": 4
  };

  return (
    <div
    style={{
      textAlign: "center",
      alignContent: "center",
      alignItems: "center",
      marginLeft: window.innerWidth <= 768 ? "32px" : "0px",
    }}
    
    className={classes.root}>
      {loadingEDit && <Loader/>}
      {loading  ? (

        <Loader/>
      ): accomodation ? (
        <div>
                <Typography variant="h6" >
         Accommodation NO: {accomodation.id}
      </Typography>
      <div className={classes.fabContainer} style={{ alignItems:"center" }}>
      <Row className='justify-content-center'>

        {accomodation.status === "Delayed Payment"  && user.user_type === "admin" &&
  <Fab color="primary" aria-label="edit" className={classes.fab}>
  <Popup pop ={true}  bop ={true}
    component={<EditAccomodationForm id={id} roomNumber={accomodation.room} accomStatus={accomodation.status} />}
    icon={EditIcon}
  />
</Fab>        }

{accomodation.status === "Active"  && user.user_type === "admin" &&
  <Fab color="primary" aria-label="edit" className={classes.fab}>
  <Popup pop ={true} bop ={true}
    component={<EditAccomodationForm id={id}  isActive={true} roomNumber={accomodation.room} accomStatus={accomodation.status} />}
    icon={EditIcon}
  />
</Fab>
        }
      {/* {accomodation.status === 'Active' || (accomodation.status === 'Delayed Payment' && ( */}

{/* // ))} */}


             {!accomodation.paid && user.user_type == "student" && accomodation.status === "Delayed Payment" &&


<Fab color="secondary" aria-label="payment" className={classes.fab}>
<form action={`https://fortebyphil.pythonanywhere.com/api/students/pay/${id}/`} method='POST'>
  <button type='submit' className='btn'>
    <h6>Pay</h6>
  </button>
</form>
</Fab>

             
             
             }

</Row>







<Row className='justify-content-center'>

{accomodation.status === "Delayed Payment"  && user.user_type === "staff" &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
<Popup pop ={true} bop ={true}
component={<EditAccomodationForm id={id} roomNumber={accomodation.room} accomStatus={accomodation.status} />}
icon={EditIcon}
/>
</Fab>        }

{accomodation.status === "Active"  && user.user_type === "staff" &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
<Popup pop ={true} bop ={true}
component={<EditAccomodationForm id={id} isActive={true} roomNumber={accomodation.room} accomStatus={accomodation.status} />}
icon={EditIcon}
/>
</Fab>
}
{accomodation.status === "Delayed Payment"  && user.user_type === "student" &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
<Popup pop ={true} bop ={true}
component={<EditAccomodationForm id={id}  isStudent={true} roomNumber={accomodation.room} accomStatus={accomodation.status} />}
icon={EditIcon}
/>
</Fab>
}
{/* {accomodation.status === 'Active' || (accomodation.status === 'Delayed Payment' && ( */}

{/* // ))} */}




</Row>









      </div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Student ID
            </Typography>
            {user.user_type === "admin" && accomodation.status === "Active" ?
            
            (
              <Link to={`/user/${accomodation.studentid}`}>
              <Chip label={accomodation.student} avatar={<Avatar>J</Avatar>} />
    
              </Link>

            ): user.user_type === "staff" && accomodation.status === "Active" ? (

              <Link to={`/user/${accomodation.studentid}`}>
              <Chip label={accomodation.student} avatar={<Avatar>J</Avatar>} />
    
              </Link>

            ) : user.user_type === "staff" && accomodation.status === "Delayed Payment" ? (

              <Link to={`/user/${accomodation.studentid}`}>
              <Chip label={accomodation.student} avatar={<Avatar>J</Avatar>} />
    
              </Link>

            ) : user.user_type === "admin" && accomodation.status === "Delayed Payment" ? (

              <Link to={`/user/${accomodation.studentid}`}>
              <Chip label={accomodation.student} avatar={<Avatar>J</Avatar>} />
    
              </Link>

            )
            
            
            
            :(
              <Chip label={accomodation.student} avatar={<Avatar>J</Avatar>} />
    
            )
            }

          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Room
            </Typography>
            {user.user_type === "admin" ? (
            <Link to={`/room/${accomodation.room}`}>

            <Typography variant="body1" className={classes.detailValue}>
              {accomodation.room}
            </Typography>
            </Link>
            ): user.user_type === "staff" ? (
              <Link to={`/room/${accomodation.room}`}>

              <Typography variant="body1" className={classes.detailValue}>
                {accomodation.room}
              </Typography>
              </Link>
            ):(

              <Typography variant="body1" className={classes.detailValue}>
                {accomodation.room}
              </Typography>
            )}


          </Grid>


          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Hostel
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {accomodation.hostel}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Check-in Date
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {new Date(accomodation.check_in_date).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Check-out Date
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {accomodation.check_out_date ? new Date(accomodation.check_out_date).toLocaleDateString() : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Duration
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {accomodation.duration} Month(s)
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Price
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              ${accomodation.price}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Paid
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {accomodation.paid ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Status
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {accomodation.status}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Divider />
          
          </div>

      ): (
        <h1>The Item You Are Looking For Does Not Exist</h1>
      )}

    </div>
  );
};

export default OldAccommodation;
