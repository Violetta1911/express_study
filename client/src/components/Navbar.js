import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { NavLink, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const logoutHandler = (event) => {
        event.preventDefault()
        logout();
        navigate('/');

    };

    return <nav>
        <div className="nav-wrapper blue darken-1">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to='/links'>All links</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Exit</a></li>
            </ul>
        </div>
    </nav>
}