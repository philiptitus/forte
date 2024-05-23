import {
    ACCOMODATION_LIST_REQUEST,
    ACCOMODATION_LIST_SUCCESS,
    ACCOMODATION_LIST_FAIL,

    HOSTEL_DETAILS_FAIL,
    HOSTEL_DETAILS_REQUEST,
    HOSTEL_DETAILS_SUCCESS,


    IMAGE_REMOVE_FAIL,
    IMAGE_REMOVE_REQUEST,
    IMAGE_REMOVE_SUCCESS,


    NOTICE_DELETE_FAIL,
    NOTICE_DELETE_REQUEST,
    NOTICE_DELETE_SUCCESS,


    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_REQUEST,
    ROOM_DETAILS_SUCCESS,

    MAINTENANCE_DETAILS_FAIL,
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,

    MAINTENANCE_UPDATE_FAIL,
    MAINTENANCE_UPDATE_REQUEST,
    MAINTENANCE_UPDATE_SUCCESS,

    EDIT_ROOM_FAIL,
    EDIT_ROOM_REQUEST,
    EDIT_ROOM_SUCCESS,
    EDIT_ROOM_RESET,

    
    EDIT_HOSTEL_FAIL,
    EDIT_HOSTEL_REQUEST,
    EDIT_HOSTEL_SUCCESS,
    EDIT_HOSTEL_RESET,

    

    ROOM_LIST_REQUEST,
    ROOM_LIST_SUCCESS,
    ROOM_LIST_FAIL,

    ROOM_DELETE_REQUEST,
    ROOM_DELETE_FAIL,
    ROOM_DELETE_SUCCESS,

    HOSTEL_DELETE_REQUEST,
    HOSTEL_DELETE_FAIL,
    HOSTEL_DELETE_SUCCESS,

    HOSTEL_LIST_REQUEST,
    HOSTEL_LIST_SUCCESS,
    HOSTEL_LIST_FAIL,
    
    MESSSAGE_DELETE_FAIL,
    MESSSAGE_DELETE_REQUEST,
    MESSSAGE_DELETE_SUCCESS,


    HOSTEL_CREATE_REQUEST,
    HOSTEL_CREATE_SUCCESS,
    HOSTEL_CREATE_FAIL,
    HOSTEL_CREATE_RESET,

    

    ROOM_CREATE_REQUEST,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    ROOM_CREATE_RESET,


} from '../constants/hostelConstants'


import axios from 'axios'




export const resetImage = (imag) => async (dispatch, getState) => {
    
    try {

        dispatch({
            type: IMAGE_REMOVE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }



    const { data } = await axios.post(`api/hostels/reset/`, 
    imag,
    config);



        dispatch({
            type: IMAGE_REMOVE_SUCCESS,
            payload:data
        });
    } catch (error) {
        dispatch({
            type: IMAGE_REMOVE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        });
    }
};



export const createHostel = (hostel) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOSTEL_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(
            `/api/hostels/new/`,
            hostel,
            config
        )

        dispatch({
            type: HOSTEL_CREATE_SUCCESS,
            payload: {
                data,
                message:
                    data && data.message
                        ? data.message
                        : 'Comment saved successfully', // Default message if not present
            },
        })
    } catch (error) {
        dispatch({
            type: HOSTEL_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createRoom = (room) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ROOM_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(
            `/api/hostels/new_room/`,
            room,
            config
        )

        dispatch({
            type: ROOM_CREATE_SUCCESS,
            payload: {
                data,
                message:
                    data && data.message
                        ? data.message
                        : 'Room(s) saved successfully', // Default message if not present
            },
        })
    } catch (error) {
        dispatch({
            type: ROOM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}








export const editHostel = (hostel) => async(dispatch, getState) => {
    try{
        dispatch({
            type: EDIT_HOSTEL_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/hostels/edit/`,
            hostel,
            config
        )
        dispatch({
            type: EDIT_HOSTEL_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EDIT_HOSTEL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const editRoom = (room, id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: EDIT_ROOM_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/hostels/rooms/${id}/update/`,
            room,
            config
        )
        dispatch({
            type: EDIT_ROOM_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EDIT_ROOM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}










export const updateMaintenance = (maintenance, id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: MAINTENANCE_UPDATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/hostels/maintenance/${id}/update/`,
            maintenance,
            config
        )
        dispatch({
            type: MAINTENANCE_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: MAINTENANCE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}







export const listHostelDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: HOSTEL_DETAILS_REQUEST })


        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/hostels/${id}/`, config);

        dispatch({
            type: HOSTEL_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: HOSTEL_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const listRoomDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_DETAILS_REQUEST })


        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/hostels/rooms/${id}/`, config);

        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const listMaintenanceDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MAINTENANCE_DETAILS_REQUEST })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/hostels/maintenance/${id}/`, config);

        dispatch({
            type:    MAINTENANCE_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: MAINTENANCE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const deleteRoom = (roomId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ROOM_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/hostels/rooms/${roomId}/delete/`,
            config
        )
        dispatch({
            type: ROOM_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ROOM_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const deleteNotice = (noticeId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: NOTICE_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/hostels/notice/${noticeId}/delete/`,
            config
        )
        dispatch({
            type: NOTICE_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: NOTICE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const deleteHostel = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: HOSTEL_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/hostels/delete/`,
            config
        )
        dispatch({
            type: HOSTEL_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: HOSTEL_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


