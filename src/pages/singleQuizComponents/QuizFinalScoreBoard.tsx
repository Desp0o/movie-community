import React from 'react'
import { quizNeon } from '../../assets/newSvg/quizNeon'
import { starIcon } from '../../assets/newSvg/starIcon'
import ButtonOutlined from '../../components/buttonFIlled/ButtonOutlined'
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled'
import Author from '../../components/singlePostComp/Author'
import { useUserHook } from '../../hooks/useUserHook'
import { congratulateIcon } from '../../assets/newSvg/congratulateIcon'

interface QuizFinalScoreBoardProps {
    title: string;
    correctAnswers: number;
    questionSum: number;
}

const QuizFinalScoreBoard: React.FC<QuizFinalScoreBoardProps> = ({ title, questionSum, correctAnswers }) => {

    const { user } = useUserHook()

    return (
        <>
            <div className='quiz_final_top'>
                {quizNeon}
                <p className='quiz_creator_title_TITLE'>{title}</p>
            </div>

            <div className='quiz_final_scores'>
                <div className='congrats'>
                    <div className='congrats_block1'>
                        <p className='congrats'>Congratulations</p>
                        {congratulateIcon}
                    </div>
                    <Author name={user.name} avatar={user.avatar} />
                </div>

                <div className='quiz_final_stat_txts'>
                    <p className='Correct_Answers'>Correct Answers: <span>{correctAnswers}/{questionSum}</span></p>
                    <p className='Points_earned'>
                        Points earned: <span>{correctAnswers * 2}</span>
                        {starIcon}
                    </p>
                </div>
            </div>

            <div className='quiz_final_buttons'>
                <ButtonOutlined text={'Back to home'} link={'/'} wProp="215px" />
                <ButtonFIlled text={'Check out other quizzes'} link={'/pages/Quizzes'} wProp="215px" />
            </div>
        </>
    )
}

export default QuizFinalScoreBoard