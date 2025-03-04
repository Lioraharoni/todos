import { userService } from "../../services/user.service.js"
import { ADD_USER_ACTIVITY, SET_USER, UPDATE_USER_BALANCE, UPDATE_USER_PREFS } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function login(credentials){
    console.log("user actions => login starting");
    
    return userService.login(credentials)
        .then(user => {
            console.log("user actions => login user", user);
            
            store.dispatch({type: SET_USER, user})
            // return user
        })
        .catch((err) => {
            console.log('user actions -> Cannot login', err);
            throw err
         })
}

export function signUp(credentials){
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({type: SET_USER, user})
        })
        .catch((err) => { 
            console.log('user actions -> Cannot signup', err);
            throw err
        })
}

export function logout(){
    return userService.logout()
        .then(() => {
            store.dispatch({type: SET_USER, user: null})
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err);
            throw err
        })
}


export function updateUserBalance(diff)
{
    // debugger
    if(!store.getState().userModule.loggedInUser)
        return
    
    console.log('user actions -> Starting update user balance');
    
    return userService.updateBalance(diff)
        .then(user => {
            store.dispatch({type: UPDATE_USER_BALANCE, balance: user.balance})
        })
        .catch((err) => {
            console.log('user actions -> Cannot update user balance', err);
            throw err
        })

}

export function updateUserPrefs(prefs)
{
    if(!store.getState().userModule.loggedInUser)
        return

    console.log('user actions -> Starting update user prefs', prefs);
    
    return userService.updatePrefs(prefs)
        .then(user => {
            store.dispatch({type: UPDATE_USER_PREFS, prefs: user.prefs, fullname: user.fullname})
        })
        .catch((err) => {
            console.log('user actions -> Cannot update user prefs', err);
            throw err
        })

}


export function addUserActivity(userActivity)
{
    if(!store.getState().userModule.loggedInUser)
        return

    // debugger
    console.log('user actions -> Starting adding user activity', userActivity);
    return userService.addActivity(userActivity)
    .then(user => {
        store.dispatch({type: ADD_USER_ACTIVITY, activities:user.activities})
    })
    .catch((err) => {
        console.log('user actions -> Cannot add user activity', err);
        throw err
    })
}

// export function updateUser(user){
//     return userService.update(user).
//         then(user => {
//             store.dispatch({type: SET_USER, user})
//         })
//         .catch((err) => { 
//             console.log('user actions -> Cannot update user', err);
//             throw err
//         })
// }