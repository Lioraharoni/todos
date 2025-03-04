import { ActivityList } from "../cmps/ActivityList.jsx";
import { userService } from "../services/user.service.js";
import { utilService } from "../services/util.service.js";
import { updateUserPrefs } from "../store/actions/user.actions.js";

const {useSelector} = ReactRedux
const { useState, useEffect} = React
export function UserDetails(){


    //change to loggedInUser
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const userActivities = useSelector(storeState => storeState.userModule.activities)
    // let userActivities = []
    // if (loggedInUser)
    // {
    //     userActivities = useSelector(storeState => storeState.userModule.loggedInUser.activities)
    // }
    // const userPrefs = useSelector(storeState => storeState.userModule.loggedInUser.prefs)
    console.log("UserDetails user=", loggedInUser);
    
    // const [color, setColor] = useState(getUserPrefs().color)
    // const [bgColor, setBgColor] = useState(getUserPrefs().bgColor)
    const [details, setDetails] = useState({color: 'white', bgColor:'black', fullname:''})
    // const [color, setColor] = useState('white')
    // const [bgColor, setBgColor] = useState('black')

    useEffect(() =>{
        console.log("Finished Loading");
        if(loggedInUser)
        {
            // userActivities = useSelector(storeState => storeState.userModule.loggedInUser.activities)
            setDetails({color: loggedInUser.prefs.color, bgColor: loggedInUser.prefs.bgColor, fullname:loggedInUser.fullname})
            // setColor(user.prefs.color)
            // setBgColor(user.prefs.bgColor)
        }
    }, [loggedInUser])
    // const Color = ''
    // const bgColor = ''
    function handleChange({ target }) {
        console.log("handleChange prevIsDone=", target);
        
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        // if(field === 'color'){
        //     // setColor(value)
        //     setPrefs(prevPrefs => ({...prevPrefs, color: value}))
        // }
        // else if(field === 'bgColor'){
        //     // setBgColor(value)
        //     setPrefs(prevPrefs => ({...prevPrefs, bgColor: value}))
        // }
        setDetails(prevDetails => ({...prevDetails, [field]: value}))
        console.log(field, value);
        // userPrefs = {...userPrefs, [field]:value}
        // user = {...user, [field]:value}
        // setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }


    function onSubmit(ev){
        ev.preventDefault()
        console.log("onSubmit ", {color, bgColor});
        
        updateUserPrefs(details)
    }

    if(!loggedInUser) return <div>Loading user...</div>


    
    return (
        <section className="user-details">
            <form className="login-form" onSubmit={onSubmit}>
                <h1>Profile</h1>
                <label htmlFor="fullname">Full Name:</label>
                <input onChange={handleChange} type="text" id="fullname" name="fullname" value={details.fullname}/>
                
                <label htmlFor="color">Color:</label>
                <input onChange={handleChange} type="color" id="color" name="color" value={details.color}/>

                <label htmlFor="bgColor">BG Color:</label>
                <input onChange={handleChange} type="color" id="bgColor" name="bgColor" value={details.bgColor}/>

                <button>Update Profile</button>
            </form>


            {userActivities && <ActivityList userActivities={userActivities}/>}

        </section>
    )
}
