import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE'
export const UPDATE_USER_PREFS = 'UPDATE_USER_PREFS'
export const ADD_USER_ACTIVITY = 'ADD_USER_ACTIVITY'


const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    // balance: 10000,
    // activities: []
}

export function userReducer(state = initialState, cmd= {}){

    
    
    switch(cmd.type){
        case SET_USER:
            console.log("userReducer cmd.type=", cmd.type, "user=", cmd.user);
            // const newActivities = cmd.user? cmd.user.activities : state.activities
            return {
                ...state,
                loggedInUser: cmd.user,
                // activities: newActivities
            }
        case UPDATE_USER_BALANCE:
            console.log("userReducer cmd.type=", cmd.type, "balance=", cmd.balance);
            return {
                ...state,
                loggedInUser : {...state.loggedInUser, balance: cmd.balance}
            }

        case UPDATE_USER_PREFS:
            console.log("userReducer cmd.type=", cmd.type, "prefs=", cmd.prefs);
            return {
                ...state,
                loggedInUser : {...state.loggedInUser, prefs: cmd.prefs, fullname: cmd.fullname}
            }

         case ADD_USER_ACTIVITY:
            const activities = cmd.activities ? cmd.activities : []
            console.log("userReducer cmd.type=", cmd.type, "activities=", cmd.activities);
            return {
                ...state,
                loggedInUser : {...state.loggedInUser, activities :activities},
                // activities
            }
        default:
            return state
    }
    
}