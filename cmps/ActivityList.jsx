import { utilService } from "../services/util.service.js";

const { Link } = ReactRouterDOM
const {useState, useEffect} = React


export function ActivityList({ userActivities }) {


    const [activities, setActivities] = useState(userActivities);

    useEffect(()=>{
        if(activities){
            const intervalId = setInterval(() =>{
                setActivities([...activities])
        }, 30000)

        return () => clearInterval(intervalId);
    }
    }, [activities])

    if (!activities) {
        return <div>Loading...</div>; // Or any fallback UI
      }

    return (


        <ul className="activities-list"  >
        { activities && activities.length > 0 ? 
        (activities.map(activity =>
            <li>
                <label htmlFor="at">{utilService.convertDateToTxt(activity.at)}:</label>
                <label htmlFor="txt">{activity.txt}:</label>
                <label htmlFor="name">'{activity.name}'</label>

            </li>
        )) 
        : 
        (
            <li>No activities available</li>
        )
    
    }
        </ul>
    )
}

