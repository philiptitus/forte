import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Link } from 'react-router-dom';

import CommentIcon from '@mui/icons-material/Comment';

import Avatar from '@mui/material/Avatar';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { FixedSizeList, ListChildComponentProps } from 'react-window'; 
import { useSnackbar } from 'notistack';
import {  deleteReview } from '../actions/studentActions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
interface ListProps {
  avatar: boolean;
  postId: string;
  user: string;
  total: number;
  showMaintenance?: boolean;
  showReviews?: boolean;
  showComment?: boolean;

}

const Scroller = ({ user,avatar, postId, total, showMaintenance = false, showReviews = false, showComment = false }: ListProps) => {
  const complaintDetails = useSelector((state) => state.complaintDetails);
  const { post, loading, error, success:successPost } = complaintDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success, error:errorDelete } = reviewDelete;

  const navigate = useNavigate();

  const maintenanceCreate = useSelector((state) => state.maintenanceCreate);
  const {

    success: successCreate,
} = maintenanceCreate

  const deleteReviewHandler = (postId) => {
    dispatch(deleteReview(postId));
    enqueueSnackbar('Deleting in A Moment', { variant: 'success' });
    window.location.reload();
  };

  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  
  useEffect(() => {
  
  }, [dispatch, success, successPost, successCreate]);

  let dynamicData;
  if (showReviews) {
    dynamicData = post.bookers.map((booker) => ({
      id: booker.booker,
      text: booker.booker_name,
      imageUrl: booker.booker_avi,
    }));
  } else if (showMaintenance) {
    dynamicData = post.likers.map((liker) => ({
      id: liker.liker,
      text: liker.liker_name,
      imageUrl: liker.liker_avi,
    }));
  }
  else if (showComment) {
    dynamicData = post.comments.map((comment) => ({
        id: comment.user,
        _id: comment.id,
        text: comment.message,
        imageUrl: comment.comment_avi,
        emailer: comment.comment_email,
    }));
  }

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const item = dynamicData[index];



    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
        <Link to={`/user/${item.id}`} style={{ color: 'black' }} key={item.id}>
          <ListItemAvatar>
            <Avatar alt={`Avatar for ${item.text}`} src={item.imageUrl} />
            {showComment && <p style={{ fontSize: "5px", color:"white" }}>{item.emailer}</p>}
          </ListItemAvatar>
          </Link>



          <ListItemText  primary=<p style={{ fontSize:"small" }}>{item.text} </p>/>
          
        </ListItemButton>
        {showComment && user === userInfo.id && (
  <Button onClick={() => deleteReviewHandler(item._id)}>
    <HighlightOffIcon />
  </Button>
)}

      </ListItem>
    );
  };

  return (
    <Box sx={{ width: '100%', height: 400, maxWidth: 400, bgcolor: 'black' }}>
      {dynamicData.length === 0 && (
        <div>
          {showMaintenance && <p>No Likes Available Yet: <FavoriteBorderIcon /></p>}
          {showReviews && <p>No Bookmarks Available Yet: <BookmarkBorderIcon /></p>}
          {showComment && <p>No Comments Available Yet: <CommentIcon /></p>}

        </div>
      )}

      {dynamicData.length > 0 && (
        <div>
          {showMaintenance && <p>Likes: {total}<FavoriteBorderIcon /></p>}
          {showReviews && <p>Bookmarks: {total}<BookmarkBorderIcon /></p>}
          {showComment && <p>Comments: {total}<CommentIcon /></p>}
<FixedSizeList
  height={400} // Adjust this based on your content
  itemSize={46} // Adjust this based on your content
  itemCount={dynamicData.length}
  overscanCount={5}
>
  {renderRow}
</FixedSizeList>

        </div>
      )}
    </Box>
  );
};

export default Scroller;
