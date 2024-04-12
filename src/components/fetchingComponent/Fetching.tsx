import { useDarkModeHook } from "../../hooks/useDarkModeHook"
import "./fetching.css"

const Fetching = () => {
  const { isDark } = useDarkModeHook()

  return (
    <div className={isDark ? "fetching dark" : "fetching"}>
      <span className={isDark ? "spinner_fetcher" : "spinner_fetcher_light"}></span>{" "} 
    </div>
  )
}

export default Fetching