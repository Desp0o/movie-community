import React from 'react'
import "./singleQuizComp.css"
import { useDarkModeHook } from '../../hooks/useDarkModeHook'
import { useUserHook } from '../../hooks/useUserHook'
import { useDispatch } from 'react-redux'
import { setModalVisible } from '../../Redux/loginModalSlicer'

const QuizSingleAnswer = () => {
    const { isDark } = useDarkModeHook()
    const { user } = useUserHook()
    const dispatch = useDispatch()

    const answerHandler = () => {
        if(!user.name){
            dispatch(setModalVisible(true))
        }
    }

  return (
    <div className={isDark ? "QuizSingleAnswer dark" : 'QuizSingleAnswer'} onClick={answerHandler}>
         <p>ჰარი პოტერი და საიდუმლო ოთახი</p>
    </div>
  )
}

export default QuizSingleAnswer