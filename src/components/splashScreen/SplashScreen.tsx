import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import "./splashScreen.css";

const SplashScreen = () => {

    const { isDark } = useDarkModeHook()

  return (
    <div className={isDark ? "splash_screen dark" : "splash_screen"}>
      <span className={isDark ? "loader" : "loader_light"}></span>{" "}
    </div>
  );
};

export default SplashScreen;
