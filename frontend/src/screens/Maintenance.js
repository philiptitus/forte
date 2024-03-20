import React, { useState, useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Paper, Grid, Chip, Divider, Avatar, CircularProgress, Switch, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader2';
import { formatDistanceToNow } from 'date-fns';
import { getUserDetails } from '../actions/userAction';
import Popup from '../components/PopUp';
import EditMaintenanceForm from '../components/EditMaintenanceForm';
import { listMaintenanceDetails } from '../actions/hostelActions';
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
  chip: {
    margin: theme.spacing(1),
    fontSize: '1.2rem',
    borderRadius: theme.spacing(1),
    fontWeight: 'bold',
  },
  divider: {
    margin: `${theme.spacing(6)}px 0`,
    backgroundColor: '#ccc',
    height: '3px',
    opacity: '0.7',
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const MaintenanceDetail = () => {
  const classes = useStyles();
    
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const navigate = useNavigate()
  const maintenanceDetail = useSelector((state) => state.maintenanceDetail);
  const { error, loading, maintenance, success:successmaintenance } = maintenanceDetail;

  const maintenanceUpdate = useSelector((state) => state.maintenanceUpdate);
  const {  success } = maintenanceUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const {  user } = userDetails;

  const dispatch = useDispatch()

  
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
  
  



  const data = {
    "id": 12,
    "status": "Pending",
    "date_raised": "2024-03-07T01:20:40+03:00",
    "resolved": false,
    "date_resolved": null,
    "student": 9,
    "hostel": 5,
    "room": 613,
    "facility": 14
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);


  
  useEffect(() => {

    if (userInfo) {
      dispatch(listMaintenanceDetails(id));
      dispatch(getUserDetails('profile'));

    }

  }, [dispatch, id, successmaintenance, userInfo, success]);
  




  return (
    <div className={classes.root}>
      {
loading ? (

  <Loader/>
) : maintenance ?(
  <div>

  <Typography variant="h4" className={classes.title}>
  Maintenance No: {maintenance.id}
</Typography>
<div className={classes.fabContainer} style={{ alignItems:"center" }}>
 
<Row className='justify-content-center'>

</Row> 
</div>
<Paper elevation={3} className={classes.paper}>
  <Grid container spacing={4}>
    <Grid item xs={12} className={classes.gridItem}>
      <Avatar alt="Student Avatar" src="/path_to_avatar.jpg" className={classes.avatar} />
      <Typography variant="body1" className={classes.detailLabel}>
        Student ID
      </Typography>
      <Typography variant="body1" className={classes.detailValue}>
        {maintenance.student_name}
      </Typography>
    </Grid>
    <Grid item xs={6} className={classes.gridItem}>
      <Typography variant="body1" className={classes.detailLabel}>
        Progress
      </Typography>
      <CircularProgress variant="static" value={maintenance.status === 'Pending' ? 25 : maintenance.status === 'In Progress' ? 80 : 100} />
    </Grid>
    <Grid item xs={6} className={classes.gridItem}>
      <Typography variant="body1" className={classes.detailLabel}>
        Resolved
      </Typography>
      <Switch checked={maintenance.resolved} color="primary" />
    </Grid>
    <Grid item xs={12} className={classes.gridItem}>
      <Typography variant="body1" className={classes.detailLabel}>
        Date Raised
      </Typography>
      <Typography variant="body1" className={classes.detailValue}>
        {new Date(maintenance.date_raised).toLocaleString()}
      </Typography>
      <Typography variant="body1" className={classes.detailLabel}>
        Date Resolved
      </Typography>
      <Typography variant="body1" className={classes.detailValue}>
        {maintenance.date_resolved ? new Date(maintenance.date_resolved).toLocaleString() : 'N/A'}
      </Typography>
      <Typography variant="body1" className={classes.detailLabel}>
        Room Number
      </Typography>
      <Typography variant="body1" className={classes.detailValue}>
        {maintenance.room}
      </Typography>
      <Typography variant="body1" className={classes.detailLabel}>
        Facility ID
      </Typography>
      <Typography variant="body1" className={classes.detailValue}>
        {maintenance.facility_name}
      </Typography>
    </Grid>
  </Grid>
</Paper>

{user.user_type === "admin"   &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
        <Popup
               component={<EditMaintenanceForm id={id}  accomStatus={maintenance.status} />}
               icon={EditIcon}
             />        </Fab>
            }


{user.user_type === "staff"   &&
<Fab color="primary" aria-label="edit" className={classes.fab}>
        <Popup
               component={<EditMaintenanceForm id={id}  accomStatus={maintenance.status} />}
               icon={EditIcon}
             />        </Fab>
            }




<Divider className={classes.divider} />
</div>

) :(
  <h1>The Item You Are Looking For Does Not Exist</h1>


)

      }

    </div>
  );
};

export default MaintenanceDetail;
