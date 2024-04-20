import React from 'react';
import { useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Row } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteReview } from '../actions/studentActions';
import { formatDistanceToNow } from 'date-fns';

function CustomRating({ value, value2, value3, value4, value5, value6 , value7,showDelete = false}) {
  const dispatch = useDispatch();

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
  const deleteHandler = () => {
    dispatch(deleteReview(value6.id));
    // You may not need to reload the page here
    window.location.reload();
  };

  return (
    <div>
      <Box component="fieldset" mb={3}>
        <Rating style={{ color: "green", fontSize: "medium" }} name="customized-readonly" value={value} readOnly />

        {showDelete &&
                <DeleteIcon style={{ color: "green", marginLeft: 'auto', cursor: 'pointer' }} onClick={deleteHandler} />

        }

        <Typography component="legend">
            
          <i>{value2}</i>
          <Row style={{ alignItems: "center" }}> {/* Align items to center */}
            <i style={{ fontSize: "small" }}>{value3} for <b>{value7}</b></i>
            <i style={{ fontSize: "small" }}>{formatTimestamp(value5)}</i>
            {/* Add onClick event handler to the DeleteIcon */}
          </Row>
        </Typography>
      </Box>
    </div>
  );
}

export default CustomRating;
