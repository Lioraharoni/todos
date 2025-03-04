const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const navigate = useNavigate()
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    // const userBalance = useSelector(storeState => storeState.userModule.loggedInUser.balance)
    const todosCount = useSelector(storeState => storeState.todoModule.todos.length)
    const totalTodosCount = useSelector(storeState => storeState.todoModule.totalTodosCount)
    const doneTodosCount = useSelector(storeState => storeState.todoModule.doneTodosCount)
    // const doneTodosCount = useSelector(storeState => storeState.todoModule.todos.length)

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    // function onSetUser(user) {
    //     setUser(user)
    //     navigate('/')
    // }
    console.log("AppHeader user=", user);

    const color = user && user.prefs ? user.prefs.color : 'white'
    const bgColor = user && user.prefs ? user.prefs.bgColor : 'black'
    
    return (
        <header className="app-header full main-layout" style= {{backgroundColor: bgColor, color: color}}>
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        {/* < section style= {{backgroundColor: user.prefs.bgColor}}> */}

                        <Link to={`/user/${user._id}`}>Hello {user.fullname} ${user.balance}</Link>
                        {/* <button onClick={onL}>My Profile</button> */}
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        {/* <LoginSignup onSetUser={onSetUser} /> */}
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
                <section className="todosPercent">
                    <h1>{doneTodosCount} / {totalTodosCount} todos</h1>

                </section>
            </section>
            <UserMsg />
        </header>
    )
}
