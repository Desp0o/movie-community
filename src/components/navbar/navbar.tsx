import "./navbar.css"
import { searchIcon } from "../../assets/svg/searchIcon"

const Navbar = () => {
  return (
    <nav className="navbar">

        <div className="logo">
            <p>LOGO</p>
        </div>

        <div className="nav_search">
            <div className="nav_search_icon">{searchIcon}</div>
            <input type="text" className="nav_search_input" placeholder="search..." />
        </div>

        <div className="nav_profile">
            <button className="nav_login_btn">
                Log In
            </button>
        </div>

    </nav>
  )
}

export default Navbar