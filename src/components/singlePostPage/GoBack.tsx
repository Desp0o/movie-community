import { goBackIcon } from '../../assets/svg/goBack'
import { useNavigate } from 'react-router-dom'
import { useDarkModeHook } from '../../hooks/useDarkModeHook'

const GoBack = () => {
    const { isDark } = useDarkModeHook()
    const navigate = useNavigate()
    
    const goBackHandler = () => {
        navigate(-1)
    }

  return (
    <div className={isDark ? "go_back dark" : 'go_back'} onClick={goBackHandler}>
        {goBackIcon}
    </div>
  )
}

export default GoBack