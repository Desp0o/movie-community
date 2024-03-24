import "./navbar.css";
import { searchIcon, searchIconResposnive } from "../../assets/svg/searchIcon";
import { useUserHook } from "../../hooks/useUserHook";
import { bellPasiveIcon } from "../../assets/svg/bell";
import { addIcon } from "../../assets/svg/addIcon";
import { burgerMenu } from "../../assets/svg/burgerMenu";

const Navbar = () => {
  const { user } = useUserHook();

  return (
    <nav className="navbar">

      <div className="logo_burger_menu">
        <div className="burger_menu">{burgerMenu}</div>
        <p>LOGO</p>
      </div>

      <div className="nav_search">
        <div className="nav_search_icon">{searchIcon}</div>
        <input
          type="text"
          className="nav_search_input"
          placeholder="search..."
        />
      </div>

      <div className="nav_profile">
        {user.name ? (
          <div className="nav_profile_items">
            {window.innerWidth < 601 ? <div className="responsive_search">{searchIconResposnive}</div>
            :<></>
            }

            <div className="nav_create_post">
                {addIcon}
                <p>Create</p>
            </div>


            <div className="nav_profile_item_parent">{bellPasiveIcon}</div>

            <div className="nav_profile_item_parent">
              <img
                src={user.avatar}
                alt="user avatr"
                className="nav_user_avatar"
              />
            </div>
          </div>
        ) : (
          <button className="nav_login_btn">Log In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
