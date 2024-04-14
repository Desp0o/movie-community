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

        <div className={isDark ? "nav_create_post dark" : "nav_create_post"}>
          <span style={{display:"flex", alignItems:"center", justifyContent:"center"}} onClick={openPostAddModal}>{addIcon}</span>
          <p>Create</p>
        </div>

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
