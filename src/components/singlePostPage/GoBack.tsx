import { goBackIcon } from '../../assets/svg/goBack'
import { useDarkModeHook } from '../../hooks/useDarkModeHook'

const GoBack = () => {
    const { isDark } = useDarkModeHook()
    
    const goBackHandler = () => {
      window.history.back();
    }

  return (
    <div className={isDark ? "go_back dark" : 'go_back'} onClick={goBackHandler}>
        {goBackIcon}
    </div>
  )
}

export default GoBack