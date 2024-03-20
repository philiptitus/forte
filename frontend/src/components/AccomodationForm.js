import React, { useState, useEffect } from 'react';
import {  TextField, MenuItem, IconButton, Box } from '@mui/material'; // Import required MUI components
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import { useDispatch, useSelector } from 'react-redux'; // Import redux hooks
import axios from 'axios'; // Import axios for HTTP requests
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon from MUI icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Import KeyboardArrowDownIcon from MUI icons
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack for notifications
import { Row,Col } from 'react-bootstrap';
import { createAccomodation } from '../actions/studentActions';
import { listHostelDetails } from '../actions/hostelActions';
import { getUserDetails } from '../actions/userAction';
import { useParams } from 'react-router-dom';
import Loader from './Loader2';

const rooms = [
    { value: '4', label: '4-person Room' },
    { value: '2', label: '2-person Room' },
    { value: '1', label: 'Single Room' }
  
  ];
  
  const types = [
    { value: 'Empty', label: 'Empty Room' },
    { value: 'Occupied', label: 'Occupied Room' },
  
  ];
  
  const durations = [
    { value: '1', label: '1 Month' },
    { value: '2', label: '2 Months' },
    { value: '3', label: '3 Months' },
    { value: '4', label: '4 Months' },
  
  
  
  
  ];



  const AccommodationForm = ({ isScreen = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const [hostels, setHostels] = useState([]);
    const [hostel_id, sethostel_id] = useState(1);
    const [capacity, setcapacity] = useState(1);
    const [duration, setduration] = useState(1);
    const [type, settype] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const accomodationCreate = useSelector((state) => state.accomodationCreate);
    const { loading: loadingAccomodation, error: errorAccomodation, success, accomodation } = accomodationCreate;

    const { id } = useParams();

    const hostelDetail = useSelector((state) => state.hostelDetail);
    const { error, loading:loadingHostel, hostel:defaultValue } = hostelDetail;
  

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
          const response = await axios.get(`/api/hostels/?name=${searchText}&page=${page}`, config);
          setHostels((prevHostels) => [...prevHostels, ...response.data.results]);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [page, searchText]);
  
    const submitHandler = (e) => {
        e.preventDefault();
        const selectedHostelId = isScreen ? hostel_id : defaultValue.id; // Set hostel_id to 3 if isScreen is false
        dispatch(
          createAccomodation({
            hostel_id: selectedHostelId,
            duration,
            type,
            capacity
          })
        );
      };
      
  
    useEffect(() => {
      if (success) {
        enqueueSnackbar("Your Accommodation Was Created Successfully. Be Sure To Report Today", { variant: 'success' });
        navigate('/');
      }
    }, [navigate, success]);
  
    const handleLoadMore = () => {
      setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
      if (userInfo) {
        dispatch(listHostelDetails(id));
        dispatch(getUserDetails('profile'));

      }
    }, [dispatch, userInfo]);
  
    return (
      <div>
        <Row style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <h3>Create A New Accommodation</h3>
          {loadingAccomodation && <Loader/>}
          <Col xs={3} md={1} style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={submitHandler}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  {isScreen ? (
                    <TextField
                      id="filled-select-currency"
                      select
                      defaultValue="EUR"
                      label="Select"
                      value={hostel_id}
                      onChange={(e) => sethostel_id(e.target.value)}
                      variant="filled"
                      helperText="Please select A Hostel"
                    >
                      {Array.isArray(hostels) &&
                        hostels.length > 0 &&
                        hostels.map((option, index) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.hostel_name}
                          </MenuItem>
                        ))}
                    </TextField>
                  ) : (
                    <TextField
                      id="outlined-read-only-input"
                      label="Hostel"
                      value={defaultValue.hostel_name}
                      InputProps={{
                        readOnly: true,
                      }}
                    >
                        <MenuItem key={defaultValue.id} value={defaultValue.id}>
                            {defaultValue.hostel_name}
                          </MenuItem>
                        
                        /</TextField>
                  )}
  
                  <TextField
                    id="filled-select-currency"
                    select
                    label=" select"
                    defaultValue="EUR"
                    value={capacity}
                    onChange={(e) => setcapacity(e.target.value)}
                    variant="filled"
                    helperText="Please select a Room Capacity"
                  >
                    {rooms.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    value={type}
                    onChange={(e) => settype(e.target.value)}
                    helperText="Please select your Preferred Room Type"
                    variant="filled"
                  >
                    {types.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Native select"
                    value={duration}
                    onChange={(e) => setduration(e.target.value)}
                    helperText="Please select your Preferred Duration Of Stay"
                    variant="filled"
                  >
                    {durations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <Row className='justify-content-center'>
                    <IconButton
                      style={{ color: 'red' }}
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Row>
                </div>
                {errorAccomodation &&
              
              <i style={{ color:"red" }}>{errorAccomodation}</i>
              }
              </Box>

              <button type="submit" className="btn btn-primary mt-2">
                <AddIcon />
              </button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
  
  export default AccommodationForm;
  