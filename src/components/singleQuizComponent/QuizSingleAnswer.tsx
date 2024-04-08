import React from 'react'
import "./singleQuizComp.css"
import { useDarkModeHook } from '../../hooks/useDarkModeHook'

const QuizSingleAnswer = () => {
    const { isDark } = useDarkModeHook()
  return (
    <div className={isDark ? "QuizSingleAnswer dark" : 'QuizSingleAnswer'}>
         <p>ჰარი პოტერი და საიდუმლო ოთახი</p>
    </div>
  )
}

export default QuizSingleAnswer