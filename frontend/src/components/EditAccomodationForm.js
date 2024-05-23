import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, Button, IconButton } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { editRoom } from '../actions/hostelActions';
import { updateAccomodation } from '../actions/studentActions';
import { useSnackbar } from 'notistack';
import { listRoomDetails } from '../actions/hostelActions';
import {  Typography, Snackbar } from '@mui/material';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import Loader from './Loader2'; 

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    flexWrap: 'wrap', // Wrap items to next line when they exceed container width
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fixedSize: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
  },
}));

const statuses = [
  { value: 'Cancelled', label: 'Cancel' },

];

const delayedstatuses = [
  { value: 'Cancelled', label: 'Cancel' },

];


const statusesforstudents = [
  { value: 'Cancelled', label: 'Cancel' },

];

const EditAccomodationForm = ({ id, roomNumber, roomAvailable, accomStatus, isStudent = false , isDelayed=false, isActive = false}) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [room, setroom] = useState("");
  const [status, setstatus] = useState(accomStatus);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [rooms, setRooms] = useState([]);

  const accomodationUpdate = useSelector((state) => state.accomodationUpdate);
  const {  error, success, accomodation } = accomodationUpdate;



  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateAccomodation(
        {
          room,
          status,
        },
        id
      )
    );

  };



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
        const response = await axios.get(`/api/hostels/rooms/?name=${searchText}&page=${page}`, config);
        setRooms(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching Rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchText]);

  const handleLoadMore = () => {
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
    <div className={classes.fixedSize}>
                <Snackbar 
          
          open={error}
          message={<span style={{ color: 'red' }}>{error}</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
                        <Snackbar 
          
          open={success}
          message={<span style={{ color: 'green' }}>Accomodation Information Updated</span>}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Row>
          <Col>
          
{  !isStudent &&          <TextField
              id="filled-select-currency"
              select
              defaultValue="True"
              fullWidth
              label="Room No"
              helperText="Change Rooms For This Accomodation"
              variant="filled"
              name="room_number"
              value={room}
              onChange={(e) => setroom(e.target.value)}
            >
                      <input
            type='search'
            placeholder='Search For Rooms'
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
                            {rooms.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <b>{option.id}</b>
                  <i
                  style={{

                    fontSize:"small"
                  }}
                  >Capacity:{option.capacity}</i>
                </MenuItem>
              ))}
{rooms.length > 9 &&

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
          {loading && <Loader />}

            </TextField>
}

          </Col>
        </Row>


        <Row>
  <Col>
    <TextField
      id="filled-select-currency"
      select
      label="Select"
      defaultValue="True"
      value={status}
      onChange={(e) => setstatus(e.target.value)}
      helperText="Accomodation Status"
      variant="filled"
      fullWidth
    >
      {isStudent ? (
        statusesforstudents.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      ) : isActive ? (
        statuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem> 
        ))
      ) :(
        delayedstatuses.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      )}
    </TextField>
  </Col>
</Row>



        <Row>
          <Col>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default EditAccomodationForm;
