import { useDarkModeHook } from "../../hooks/useDarkModeHook";
import "./spinner.css";

const Spinner = () => {

    const { isDark } = useDarkModeHook()

  return (
    <div className={isDark ? "spinner_container dark" : "spinner_container"}>
      <span className={isDark ? "spinner" : "spinner_light"}></span>{" "}
    </div>
  );
};

export default Spinner;
