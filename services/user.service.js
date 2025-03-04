import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateBalance,
    updatePrefs,
    addActivity
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            console.log("user =", user);
            
            // if (user) return _setLoggedinUser(user)
            // delete user password
            if(user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 10000, prefs:{color:'white', bgColor:'black'}, activities:[] }
    user.createdAt = user.updatedAt = Date.now()

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
            //  data => 
            // { (data)
            //     return data;
            // })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}



function getLoggedinUser() {
    console.log("");
    
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, prefs: user.prefs,  balance:user.balance
        ,activities: user.activities
    }
    // const userToSave = { ...user}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    console.log("user to save=", userToSave);
    
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

function updateBalance(diff) {
    const loggedInUserId = getLoggedinUser()._id
    console.log("updateBalance loggedInUserId", loggedInUserId);
    
    return getById(loggedInUserId)
        .then(user => {
            user.balance += diff
            //_setLoggedinUser
            return storageService.put(STORAGE_KEY, user)
            .then(_setLoggedinUser)
        })
}

function updatePrefs(prefs){
    debugger
    const loggedInUserId = getLoggedinUser()._id
    console.log("updatePrefs loggedInUserId", loggedInUserId);
    
    return getById(loggedInUserId)
        .then(user => {
            user.prefs = {color:prefs.color, bgColor:prefs.bgColor}
            user.fullname = prefs.fullname
            //_setLoggedinUser
            return storageService.put(STORAGE_KEY, user)
            .then(_setLoggedinUser)
        })
}

function addActivity(activity)
{    
    // debugger
    const loggedInUserId = getLoggedinUser()._id
    console.log("addActivity loggedInUserId", loggedInUserId);
    
    return getById(loggedInUserId)
        .then(user => {
            debugger
            user.activities = [activity, ...user.activities]
            //_setLoggedinUser
            return storageService.put(STORAGE_KEY, user)
            .then(_setLoggedinUser)
        })
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }