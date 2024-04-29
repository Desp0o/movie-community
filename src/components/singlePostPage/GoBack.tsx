import { goBackIcon } from '../../assets/svg/goBack'

const GoBack = () => {
    
    const goBackHandler = () => {
      window.history.back();
    }

  return (
    <div className="go_back" onClick={goBackHandler}>
        <span style={{width:"40px", height:"40px"}}>{goBackIcon}</span>
        <p>Back</p>
    </div>
  )
}

export default GoBack