import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,

    PAYMENTS_LIST_REQUEST,
    PAYMENTS_LIST_SUCCESS,
    PAYMENTS_LIST_FAIL,


    MAINRENANCE_LIST_FAIL,
    MAINRENANCE_LIST_REQUEST,
    MAINRENANCE_LIST_RESET,
    MAINRENANCE_LIST_SUCCESS,


    ACCOMODATION_LIST_REQUEST,
    ACCOMODATION_LIST_SUCCESS,
    ACCOMODATION_LIST_FAIL,



    COMPLAINT_DETAILS_REQUEST,
    COMPLAINT_DETAILS_SUCCESS,
    COMPLAINT_DETAILS_FAIL,


    ACCOMODATION_DETAILS_REQUEST,
    ACCOMODATION_DETAILS_SUCCESS,
    ACCOMODATION_DETAILS_FAIL,






    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_DELETE_FAIL,

    ACCOMODATION_CREATE_REQUEST,
    ACCOMODATION_CREATE_SUCCESS,
    ACCOMODATION_CREATE_FAIL,
    ACCOMODATION_CREATE_RESET,

    MAINTENANCE_CREATE_REQUEST,
    MAINTENANCE_CREATE_SUCCESS,
    MAINTENANCE_CREATE_FAIL,
    MAINTENANCE_CREATE_RESET,

    COMPLAINT_UPDATE_REQUEST,
    COMPLAINT_UPDATE_SUCCESS,
    COMPLAINT_UPDATE_FAIL,
    COMPLAINT_UPDATE_RESET,

    ACCOMODATION_UPDATE_REQUEST,
    ACCOMODATION_UPDATE_SUCCESS,
    ACCOMODATION_UPDATE_FAIL,
    ACCOMODATION_UPDATE_RESET,


    COMPLAINT_CREATE_FAIL,
    COMPLAINT_CREATE_REQUEST,
    COMPLAINT_CREATE_SUCCESS,

    REVIEW_CREATE_FAIL,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,

    COMPLAINTS_LIST_FAIL,
    COMPLAINTS_LIST_REQUEST,
    COMPLAINTS_LIST_SUCCESS,
    COMPLAINTS_LIST_RESET,




} from '../constants/studentConstants'



import axios from 'axios'


  















export const listComplaintDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            
            type: COMPLAINT_DETAILS_REQUEST })


        const {

            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        
        const { data } = await axios.get(`/api/students/complaints/${id}/`, config);

        dispatch({
            type: COMPLAINT_DETAILS_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: COMPLAINT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}






export const listAccomodationDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACCOMODATION_DETAILS_REQUEST })



        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/${id}/`, config);

        
        dispatch({
            type: ACCOMODATION_DETAILS_SUCCESS,

            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: ACCOMODATION_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}








export const deleteReview = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: REVIEW_DELETE_REQUEST

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
            `/api/students/reviews/${id}/delete/`,
            config
        )
        dispatch({
            type: REVIEW_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: REVIEW_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const createAccomodation = (formData) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ACCOMODATION_CREATE_REQUEST

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
            `/api/students/new/`,
            formData,
            config
        )
        dispatch({
            type: ACCOMODATION_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ACCOMODATION_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateComplaint = (complaint, id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: COMPLAINT_UPDATE_REQUEST

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
            `/api/students/complaints/${id}/update/`,
            complaint,
            config
        )
        dispatch({
            type: COMPLAINT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: COMPLAINT_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: COMPLAINT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateAccomodation = (accomodation, id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ACCOMODATION_UPDATE_REQUEST

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
            `/api/students/${id}/update/`,
            accomodation,
            config
        )
        dispatch({
            type: ACCOMODATION_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: ACCOMODATION_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ACCOMODATION_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}









export const createMaintenanceAction = (facility_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAINTENANCE_CREATE_REQUEST,
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
            `/api/students/create_maintenance/`,
            facility_id,
            config
        )

        dispatch({
            type: MAINTENANCE_CREATE_SUCCESS,
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
            type: MAINTENANCE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const createComplaintAction = (description) => async(dispatch, getState) => {
    try{
        dispatch({
            type: COMPLAINT_CREATE_REQUEST

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
            `/api/students/create_complaint/`,
            description,
            config,
        )
        dispatch({
            type: COMPLAINT_CREATE_SUCCESS,
            payload:data
        })
        


    } catch (error) {
        dispatch({
            type: COMPLAINT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createReview = (review) => async(dispatch, getState) => {
    try{
        dispatch({
            type: REVIEW_CREATE_REQUEST

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
            `/api/students/create_review/`,
            review,
            config,
        )
        dispatch({
            type: REVIEW_CREATE_SUCCESS,
            payload:data
        })
        


    } catch (error) {
        dispatch({
            type: REVIEW_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}






