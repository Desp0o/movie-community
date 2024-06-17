import React from 'react'
import { quizNeon } from '../../assets/newSvg/quizNeon'
import { starIcon } from '../../assets/newSvg/starIcon'
import ButtonOutlined from '../../components/buttonFIlled/ButtonOutlined'
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled'

interface QuizFinalScoreBoardProps {
    title: string;
}

const QuizFinalScoreBoard:React.FC<QuizFinalScoreBoardProps> = ({title}) => {
    return (
        <>
            <div className='quiz_final_top'>
                {quizNeon}
                <p className='quiz_creator_title_TITLE'>{title}</p>
            </div>

            <div className='quiz_final_scores'>
                <p className='Correct_Answers'>Correct Answers: <span>10/10</span></p>
                <p className='Points_earned'>Points earned: <span>10</span>{starIcon}</p>
            </div>

            <div className='quiz_final_buttons'>
                <ButtonOutlined text={'Back to home'} link={'/'} wProp="215px" />
                <ButtonFIlled text={'Check out other quizzes'} link={'/pages/Quizzes'} wProp="215px" />
            </div>
        </>
    )
}

export default QuizFinalScoreBoard