import "./navbar.css";
import { searchIcon, searchIconResposnive } from "../../assets/svg/searchIcon";
import { useUserHook } from "../../hooks/useUserHook";
import { bellPasiveIcon } from "../../assets/svg/bell";
import { addIcon } from "../../assets/svg/addIcon";
import { burgerMenu } from "../../assets/svg/burgerMenu";
import UserDash from "./UserDash";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { useEffect, useRef } from "react";
import Login from "../login/Login";
import { useUserDashHook } from "../../hooks/useUserDashHook";
import { useDispatch } from "react-redux";
import { setDashVisible } from "../../Redux/userDahsSlicer";

const Navbar = () => {
  const { user } = useUserHook();
  const { isDark } = useDarkModeHook();
  const { userDashState } = useUserDashHook()
  const dispatch = useDispatch()

  const avatarRef = useRef<HTMLDivElement>(null);
  const userDashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        event.target instanceof Node &&
        avatarRef.current.contains(event.target)
      ) {
        dispatch(setDashVisible(!userDashState))
      } else if (
        userDashRef.current &&
        event.target instanceof Node &&
        userDashRef.current.contains(event.target)
      ) {
        dispatch(setDashVisible(true))
        
      } else {
        dispatch(setDashVisible(false))
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [userDashState, dispatch]);

  return (
    <>
      <nav className={isDark ? "navbar dark" : "navbar"}>
        <div className="logo_burger_menu">
          <div className="burger_menu">{burgerMenu}</div>
          <p>LOGO</p>
        </div>

        <div className="nav_search">
          <div className="nav_search_icon">{searchIcon}</div>
          <input
            type="text"
            className={isDark ? "nav_search_input dark" : "nav_search_input"}
            placeholder="search..."
          />
        </div>

        <div className="nav_profile">
          {user.name ? (
            <div className="nav_profile_items">
              {window.innerWidth < 601 ? (
                <div className="responsive_search">{searchIconResposnive}</div>
              ) : (
                <></>
              )}

              <div
                className={isDark ? "nav_create_post dark" : "nav_create_post"}
              >
                {addIcon}
                <p>Create</p>
              </div>

              <div
                className={
                  isDark
                    ? "nav_profile_item_parent dark"
                    : "nav_profile_item_parent"
                }
              >
                {bellPasiveIcon}
              </div>

              <div
                ref={avatarRef}
                className={
                  isDark
                    ? "nav_profile_item_parent dark"
                    : "nav_profile_item_parent"
                }
              >
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

      <div
        ref={userDashRef}
        style={{ display: `${userDashState ? "flex" : "none"}` }}
      >
        <UserDash />
      </div>

      <div className="login_modal_container">
        <Login />
      </div>
    </>
  );
};

export default Navbar;
