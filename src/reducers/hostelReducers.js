import {
    ACCOMODATION_LIST_REQUEST,
    ACCOMODATION_LIST_SUCCESS,
    ACCOMODATION_LIST_FAIL,

    HOSTEL_DETAILS_FAIL,
    HOSTEL_DETAILS_REQUEST,
    HOSTEL_DETAILS_SUCCESS,

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


export const maintenanceUpdateReducer = (state = {maintenance:{}}, action) =>{
    switch (action.type) {
        case MAINTENANCE_UPDATE_REQUEST:
            return { loading: true }
        case MAINTENANCE_UPDATE_SUCCESS:
            return { loading: false,success:true, maintenance: action.payload}     
        case MAINTENANCE_UPDATE_FAIL:
            return { loading: false, error:action.payload }


            
        default:
            return state
    
        
    }
} 




export const roomDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case ROOM_DELETE_REQUEST:
            return { loading: true }
        case ROOM_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case ROOM_DELETE_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 





export const hostelDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case HOSTEL_DELETE_REQUEST:
            return { loading: true }
        case HOSTEL_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case HOSTEL_DELETE_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 









export const notificationListReducer = (state = {notifications:[]}, action) =>{
    switch (action.type) {
        case ACCOMODATION_LIST_REQUEST:
            return { loading: true, notifications: [] } 
        case ACCOMODATION_LIST_SUCCESS:
            return { loading: false, notifications: action.payload }     
        case ACCOMODATION_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 




export const roomListReducer = (state = {rooms:[]}, action) =>{
    switch (action.type) {
        case ROOM_LIST_REQUEST:
            return { loading: true, rooms: [] } 
        case ROOM_LIST_SUCCESS:
            return { loading: false, rooms: action.payload }     
        case ROOM_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 





export const hostelListReducer = (state = {hostels:[]}, action) =>{
    switch (action.type) {
        case HOSTEL_LIST_REQUEST:
            return { loading: true, hostels: [] } 
        case HOSTEL_LIST_SUCCESS:
            return { loading: false, hostels: action.payload }     
        case HOSTEL_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 






export const hostelDetailsReducer = (state = { hostel: {}   }, action) =>{
    switch (action.type) {
        case HOSTEL_DETAILS_REQUEST:
            return { loading: true, ...state }
        case HOSTEL_DETAILS_SUCCESS:
            return { loading: false, hostel: action.payload, success:true }     
        case HOSTEL_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 




export const roomDetailsReducer = (state = { room: {}   }, action) =>{
    switch (action.type) {
        case ROOM_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ROOM_DETAILS_SUCCESS:
            return { loading: false, room: action.payload, success:true }     
        case ROOM_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 






export const hostelCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case HOSTEL_CREATE_REQUEST:
            return { loading: true }
        case HOSTEL_CREATE_SUCCESS:
            return { loading: false,success:true, hostel: action.payload}     
        case HOSTEL_CREATE_FAIL:
            return { loading: false, error:action.payload }
        case HOSTEL_CREATE_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 



export const roomCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case ROOM_CREATE_REQUEST:
            return { loading: true }
        case ROOM_CREATE_SUCCESS:
            return { loading: false,success:true, room: action.payload}     
        case ROOM_CREATE_FAIL:
            return { loading: false, error:action.payload }
        case ROOM_CREATE_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 


export const roomEditReducer = (state = {}, action) =>{
    switch (action.type) {
        case EDIT_ROOM_REQUEST:
            return { loading: true }
        case EDIT_ROOM_SUCCESS:
            return { loading: false,success:true, room: action.payload}     
        case EDIT_ROOM_FAIL:
            return { loading: false, error:action.payload }
        case EDIT_ROOM_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 



export const hostelEditReducer = (state = {}, action) =>{
    switch (action.type) {
        case EDIT_HOSTEL_REQUEST:
            return { loading: true }
        case EDIT_HOSTEL_SUCCESS:
            return { loading: false,success:true, hostel: action.payload}     
        case EDIT_HOSTEL_FAIL:
            return { loading: false, error:action.payload }
        case EDIT_HOSTEL_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 









export const noticeDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case NOTICE_DELETE_REQUEST:
            return { loading: true }
        case NOTICE_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case NOTICE_DELETE_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


