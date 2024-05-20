import "./navbar.css";
import { searchIcon, searchIconResposnive } from "../../assets/svg/searchIcon";
import { useUserHook } from "../../hooks/useUserHook";
import { bellPasiveIcon } from "../../assets/svg/bell";
import { burgerMenu } from "../../assets/svg/burgerMenu";
import UserDash from "./UserDash";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import { useEffect, useRef, useState } from "react";
import { useUserDashHook } from "../../hooks/useUserDashHook";
import { useDispatch, useSelector } from "react-redux";
import { setDashVisible } from "../../Redux/userDahsSlicer";
import { useLoginModal } from "../../hooks/useLoginModal";
import { setLeftMenuState } from "../../Redux/leftMenuSlicer";
import noAvatar from "../../assets/noAvatar.jpeg"
import { Link } from "react-router-dom";


interface RootState {
  leftMenuStore:{
    isLeftMenuOpen: boolean
  }
}

const Navbar = () => {
  const { user } = useUserHook();
  const { isDark } = useDarkModeHook();
  const { userDashState } = useUserDashHook();
  const { handleVisibility } = useLoginModal();
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch();
  const isLeftMenuOpen = useSelector((state: RootState) => state.leftMenuStore.isLeftMenuOpen)

  const avatarRef = useRef<HTMLDivElement>(null);
  const userDashRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        event.target instanceof Node &&
        avatarRef.current.contains(event.target)
      ) {
        dispatch(setDashVisible(!userDashState));
      } else if (
        userDashRef.current &&
        event.target instanceof Node &&
        userDashRef.current.contains(event.target)
      ) {
        dispatch(setDashVisible(true));
      } else {
        dispatch(setDashVisible(false));
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [userDashState, dispatch]);

  const handleBurgerMenuEvent = () => {
    setOpen(!isOpen)    

    if(isLeftMenuOpen === true){
      dispatch(setLeftMenuState(false))
    }else if(isLeftMenuOpen === false){
      dispatch(setLeftMenuState(true))
    }
  }

  return (
    <>
      <nav className={isDark ? "navbar dark" : "navbar"}>
        <div className="logo_burger_menu">
          <div className="burger_menu" onClick={handleBurgerMenuEvent}>{burgerMenu}</div>
          <Link to='/'><p>LOGO</p></Link>
        </div>
        <div className="nav_search">
          <div className="nav_search_icon">{searchIcon}</div>
          <input
            name="search"
            type="text"
            className={isDark ? "nav_search_input dark" : "nav_search_input"}
            placeholder="search..."
          />
        </div>

        <div className="nav_profile">
          {window.innerWidth < 601 && !user.name ? (
            <div className="responsive_search">{searchIconResposnive}</div>
          ) : (
            <></>
          )}
          {user.name ? (
            <div className="nav_profile_items">
                <p style={{color:"blue", fontWeight:"900"}}>{user?.score}</p>

              <div
                className={
                  isDark
                    ? "nav_profile_item_parent dark responsive_hidden"
                    : "nav_profile_item_parent responsive_hidden "
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
                  src={user.avatar ? user.avatar : noAvatar}
                  alt="user avatr"
                  className="nav_user_avatar"
                />
              </div>
            </div>
          ) : (
            <button className="nav_login_btn" onClick={handleVisibility}>
                <p>Log In</p>
            </button>
          )}
        </div>

        <div className="bottom_border" />
      </nav>

      <div
        ref={userDashRef}
        style={{ display: `${userDashState ? "flex" : "none"}` }}
        className={userDashState ? "user_dash_res active" : "user_dash_res"}
      >
        <UserDash />
      </div>

      
    </>
  );
};

export default Navbar;
