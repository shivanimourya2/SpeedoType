import "./Navbar.css";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBrightnessHigh } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";

function Navbar(props)
{
    return <div className={props.darkMode? "dark-navbar": "navbar"}>
            <h1> <IoSpeedometerOutline/> SpeedoType</h1>
            <div className="nav-right">
                <p className="best-text">Best Score : <span className="best-score">{props.best}</span></p>
                <button onClick={props.changeTheme} className="theme-toggle"> <BsBrightnessHigh/> Mode</button>
            </div>
           </div>
}
export default Navbar;