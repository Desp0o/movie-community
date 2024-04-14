import { Link } from "react-router-dom";
import { addIcon } from "../../assets/svg/addIcon";
import { bellPasiveIcon } from "../../assets/svg/bell";
import { searchIconResposnive } from "../../assets/svg/searchIcon";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import "./BottomNavigation.css";
import { useDispatch } from "react-redux";
import { setResponsivePostAddState } from "../../Redux/ResposnivePostAddSlice";

const BottomNavigation = () => {
  const { isDark } = useDarkModeHook();
  const dispatch = useDispatch()

  const openPostAddModal = () => {
    dispatch(setResponsivePostAddState(true))
  }

  return (
    <div className={isDark ? "bottom_nav dark" : "bottom_nav"}>
      {window.innerWidth < 601 ? (
        <div className="responsive_search">{searchIconResposnive}</div>
      ) : (
        <></>
      )}

      <Link to='/pages/Create'>
        <div className={isDark ? "nav_create_post dark" : "nav_create_post"}>
          <span onClick={openPostAddModal}>{addIcon}</span>
          <p>Create</p>
        </div>
      </Link>

      <div
        className={
          isDark ? "nav_profile_item_parent dark" : "nav_profile_item_parent"
        }
      >
        {bellPasiveIcon}
      </div>
    </div>
  );
};

export default BottomNavigation;
