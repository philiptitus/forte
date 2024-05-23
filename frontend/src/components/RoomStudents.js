import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userAction';
import { listRoomDetails } from '../actions/hostelActions';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Link } from 'react-router-dom';

interface RoomStudentsProps {
  avatar: boolean; 
  roomId: string; // Assuming roomId is a string, adjust the type accordingly
}

const RoomStudents = ({ avatar, roomId }: RoomStudentsProps) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const dispatch = useDispatch();

  const roomDetail = useSelector((state) => state.roomDetail);
  const { error, loading: loadingRoom, room } = roomDetail;

  useEffect(() => {
    dispatch(listRoomDetails(roomId));
  }, [dispatch, roomId]);

  // Log the room detail state to debug
  console.log('roomDetail:', roomDetail);

  // Ensure room and room.students are defined
  const dynamicData = room && room.students ? room.students.map((student) => ({
    id: student.id,
    text: student.name,
    imageUrl: student.avi,
  })) : [];

  // Log dynamicData to debug
  console.log('dynamicData:', dynamicData);

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const item = dynamicData[index];

    return (
      <div>
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton>
            <Link to={`/user/${item.id}`} key={item.id}>
              <ListItemAvatar>
                <Avatar alt={`Avatar for ${item.text}`} src={item.imageUrl} />
              </ListItemAvatar>
            </Link>
            <ListItemText
              style={{
                fontSize: "small"
              }}
              primary={item.text} />
          </ListItemButton>
        </ListItem>
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%', height: 200, maxWidth: 360, bgcolor: 'background.paper' }}>
      {dynamicData.length === 0 ? (
        <p>No users found</p>
      ) : (
        <FixedSizeList
          height={200}
          width={360}
          itemSize={avatar ? 72 : 46}
          itemCount={dynamicData.length}
          overscanCount={5}
        >
          {(props) => renderRow({ ...props, avatar })}
        </FixedSizeList>
      )}
    </Box>
  );
};

export default RoomStudents;
