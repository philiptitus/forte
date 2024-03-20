import store from "../store"
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

    
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,
    MAINTENANCE_DETAILS_FAIL,


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

export const reviewsListReducer = (state = {reviews:[]}, action) =>{
    switch (action.type) {
        case REVIEW_LIST_REQUEST:
            return { loading: true, reviews: [] } 
        case REVIEW_LIST_SUCCESS:
            return { loading: false, reviews: action.payload }     
        case REVIEW_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 



export const notificationsListReducer = (state = {notifications:[]}, action) =>{
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





export const paymentsListReducer = (state = {payments:[]}, action) =>{
    switch (action.type) {
        case PAYMENTS_LIST_REQUEST:
            return { loading: true, payments: [] } 
        case PAYMENTS_LIST_SUCCESS:
            return { loading: false, payments: action.payload }     
        case PAYMENTS_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 






const initialStater = {
    loading: false,
    brands: [],
    error: null,
  };
  








export const complaintDetailsReducer = (state = { complaint: {}   }, action) =>{
    switch (action.type) {
        case COMPLAINT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case COMPLAINT_DETAILS_SUCCESS:
            return { loading: false, complaint: action.payload, success:true }     
        case COMPLAINT_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const maintenanceDetailsReducer = (state = { maintenance: {}   }, action) =>{
    switch (action.type) {
        case MAINTENANCE_DETAILS_REQUEST:
            return { loading: true, ...state }
        case MAINTENANCE_DETAILS_SUCCESS:
            return { loading: false, maintenance: action.payload, success:true }     
        case MAINTENANCE_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 






export const accomodationDetailsReducer = (state = { accomodation: {}   }, action) =>{
    switch (action.type) {
        case ACCOMODATION_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ACCOMODATION_DETAILS_SUCCESS:
            return { loading: false, accomodation: action.payload, success:true }     
        case ACCOMODATION_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 







export const reviewDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case REVIEW_DELETE_REQUEST:
            return { loading: true }
        case REVIEW_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case REVIEW_DELETE_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const accomodationCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case ACCOMODATION_CREATE_REQUEST:
            return { loading: true }
        case ACCOMODATION_CREATE_SUCCESS:
            return { loading: false,success:true, accomodation: action.payload}     
        case ACCOMODATION_CREATE_FAIL:
            return { loading: false, error:action.payload }
        case ACCOMODATION_CREATE_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 

export const complaintUpdateReducer = (state = {complaint:{}}, action) =>{
    switch (action.type) {
        case COMPLAINT_UPDATE_REQUEST:
            return { loading: true }
        case COMPLAINT_UPDATE_SUCCESS:
            return { loading: false,success:true, complaint: action.payload}     
        case COMPLAINT_UPDATE_FAIL:
            return { loading: false, error:action.payload }
        case COMPLAINT_UPDATE_RESET:
            return {complaint:{}}

            
        default:
            return state
    
        
    }
} 


export const accomodationUpdateReducer = (state = {accomodation:{}}, action) =>{
    switch (action.type) {
        case ACCOMODATION_UPDATE_REQUEST:
            return { loading: true }
        case ACCOMODATION_UPDATE_SUCCESS:
            return { loading: false,success:true, accomodation: action.payload}     
        case ACCOMODATION_UPDATE_FAIL:
            return { loading: false, error:action.payload }
        case ACCOMODATION_UPDATE_RESET:
            return {accomodation:{}}

            
        default:
            return state
    
        
    }
} 




export const maintenanceCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case MAINTENANCE_CREATE_REQUEST:
            return { loading: true }
        case MAINTENANCE_CREATE_SUCCESS:
            return { loading: false,success:true, maintenance:action.payload}     
        case MAINTENANCE_CREATE_FAIL:
            return { loading: false, error:action.payload }
        case MAINTENANCE_CREATE_RESET:
            return {}

            
        default:
            return state
    
        
    }
} 









  export const complaintCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case COMPLAINT_CREATE_REQUEST:
            return { loading: true } 
        case COMPLAINT_CREATE_SUCCESS:
            return { 
            loading: false,
            success: true,
            maintenance:action.payload
             }     
        case COMPLAINT_CREATE_FAIL:
            return { 
                loading: false,
                 error:action.payload,
                 }
         
        default:
            return state
    
        
    }
} 


export const reviewCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true } 
        case REVIEW_CREATE_SUCCESS:
            return { 
            loading: false,
            success: true,
            review: action.payload
             }     
        case REVIEW_CREATE_FAIL:
            return { 
                loading: false,
                 error:action.payload,
                 }
         
        default:
            return state
    
        
    }
} 


export const complaintsListReducer = (state = { complaints:[]}, action) => {
    switch (action.type) {
      case COMPLAINTS_LIST_REQUEST:
        return { 
          loading: true 
           
          };
      case COMPLAINTS_LIST_SUCCESS:
        return {
          loading: false,
          complaints: action.payload
        };
      case COMPLAINTS_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        case COMPLAINTS_LIST_RESET:
        return {
          complaints:[]
        }

      default:
        return state;
    }
  };




  export const maintenanceListReducer = (state = { maintenances:[]}, action) => {
    switch (action.type) {
      case MAINRENANCE_LIST_REQUEST:
        return { 
          loading: true 
           
          };
      case MAINRENANCE_LIST_SUCCESS:
        return {
          loading: false,
          maintenances: action.payload
        };
      case MAINRENANCE_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        case MAINRENANCE_LIST_RESET:
        return {
            maintenances:[]
        }

      default:
        return state;
    }
  };








