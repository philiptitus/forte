import React, { useState, useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Paper, Grid, Divider, Fab, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader2';
import Popup from '../components/PopUp';
import { listComplaintDetails } from '../actions/studentActions';
import EditComplaintForm from '../components/EditComplaintForm';
import { getUserDetails } from '../actions/userAction';
import { logout } from '../actions/userAction'



const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: theme.spacing(1),
  },
  detailValue: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const ComplaintDetail = () => {
  const classes = useStyles();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const navigate = useNavigate()
  const complaintDetail = useSelector((state) => state.complaintDetail);
  const { error, loading, complaint, success:successcomplaint } = complaintDetail;
  const complaintUpdate = useSelector((state) => state.complaintUpdate);
  const {  success } = complaintUpdate;

  const [hasExpired, setHasExpired] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const expirationTime = userInfo?.expiration_time
  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;



  const dispatch = useDispatch()



    
  // useEffect(() => {
  //   if (!user) {
  //     logoutHandler()
  //   }
  //     }, [navigate]);
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/forte')
    window.location.reload();
    
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/forte')
    }
      }, [navigate,userInfo]);

  


      
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





  const data = {
    "id": 11,
    "description": "wiop",
    "status": "In Progress",
    "date_raised": "2024-03-07T02:12:44+03:00",
    "resolved": false,
    "date_resolved": null,
    "hostel": 5,
    "student": 6
  };
  useEffect(() => {
if (hasExpired) {
  logoutHandler()
}
  }, [navigate, hasExpired]);





   
  useEffect(() => {
    if (userInfo) {
      dispatch(listComplaintDetails(id));
      dispatch(getUserDetails('profile'))
    }
  }, [dispatch, id, successcomplaint, userInfo, success]);
  
 



  return (
    <div className={classes.root}>
      {loading ?  (
        <Loader/>

      ): complaint ? (
        <div>

<Typography variant="h4" className={classes.title}>
        Complaint No : {id}
      </Typography>
      <Row className='justify-content-center'>
        {user.user_type === "admin"  &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
        <Popup
               component={<EditComplaintForm id={id}  accomStatus={complaint.status} />}
               icon={EditIcon}
               
             />   
                  </Fab>
                }

{user.user_type === "staff"  &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
        <Popup
               component={<EditComplaintForm id={id}  accomStatus={complaint.status} />}
               icon={EditIcon}
               
             />   
                  </Fab>
                }
</Row>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Description
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {complaint.description}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
      <Typography variant="body1" className={classes.detailLabel}>
        Progress
      </Typography>
      <CircularProgress variant="static" value={complaint.status === 'Open' ? 25 : complaint.status === 'In Progress' ? 80 : 100} />
    </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Resolved
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {complaint.resolved ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="body1" className={classes.detailLabel}>
              Date Raised
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {new Date(complaint.date_raised).toLocaleString()}
            </Typography>
            <Typography variant="body1" className={classes.detailLabel}>
              Date Resolved
            </Typography>
            <Typography variant="body1" className={classes.detailValue}>
              {complaint.date_resolved ? new Date(complaint.date_resolved).toLocaleString() : 'N/A'}
            </Typography>
            <Typography variant="body1" className={classes.detailLabel}>
              Student ID
            </Typography>
            
            <Typography variant="body1" className={classes.detailValue}>
              {complaint.student_name}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      





      <Divider className={classes.divider} />

          </div>

      ):(
        <h1>The Item You Are Looking For Does Not Exist</h1>
      )
    
    
    }

    </div>
  );
};

export default ComplaintDetail;
