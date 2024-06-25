import React from 'react';
import { quizNeon } from '../../assets/newSvg/quizNeon';
import { starIcon } from '../../assets/newSvg/starIcon';
import ButtonOutlined from '../../components/buttonFIlled/ButtonOutlined';
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled';
import Author from '../../components/singlePostComp/Author';
import { useUserHook } from '../../hooks/useUserHook';
import { congratulateIcon } from '../../assets/newSvg/congratulateIcon';
import { smile } from '../../assets/newSvg/smile';
import { crossedFingers } from '../../assets/newSvg/crossedFingers';
import { useLanguage } from '../../hooks/useLanguage';

interface QuizFinalScoreBoardProps {
    title: string;
    correctAnswers: number;
    questionSum: number;
}

const QuizFinalScoreBoard: React.FC<QuizFinalScoreBoardProps> = ({ title, questionSum, correctAnswers }) => {
    const { user } = useUserHook();
    const { selectedLanguage } = useLanguage()
    const percentage = (correctAnswers / questionSum) * 100;

    return (
        <>
            <div className='quiz_final_top'>
                {quizNeon}
                <p className='quiz_creator_title_TITLE'>{title}</p>
            </div>

            <div className='quiz_final_scores'>
                <div className='congrats'>
                    {percentage >= 70 ? <Congratulate /> : null}
                    {percentage >= 50 && percentage < 70 ? <DidWell /> : null}
                    {percentage < 50 ? <BetterLuckNextTime /> : null}

                    <Author name={user.name} avatar={user.avatar} />
                </div>

                <div className='quiz_final_stat_txts'>
                    <p className='Correct_Answers'>{selectedLanguage.quizGame.Correct_Answers}<span>{correctAnswers}/{questionSum}</span></p>
                    <p className='Points_earned'>
                        {selectedLanguage.quizGame.Points_earned} <span>{correctAnswers * 2}</span>
                        {starIcon}
                    </p>
                </div>
            </div>

            <div className='quiz_final_buttons'>
                <ButtonOutlined text={'Back to home'} link={'/'} wProp="215px" />
                <ButtonFIlled text={'Check out other quizzes'} link={'/pages/Quizzes'} wProp="215px" />
            </div>
        </>
    );
}

export default QuizFinalScoreBoard;

const Congratulate = () => {
    const { selectedLanguage } = useLanguage()
    return (
        <div className='congrats_block1'>
            <p className='congrats'>{selectedLanguage.quizGame.Congratulations}</p>
            {congratulateIcon}
        </div>
    );
}

const DidWell = () => {
    const { selectedLanguage } = useLanguage()
    return (
        <div className='congrats_block1'>
            <p className='congrats'>{selectedLanguage.quizGame.You_did_well}</p>
            {smile}
        </div>
    );
}

const BetterLuckNextTime = () => {
    const { selectedLanguage } = useLanguage()
    return (
        <div className='congrats_block1'>
            <p className='congrats'>{selectedLanguage.quizGame.Better_luck_next_time}</p>
            {crossedFingers}
        </div>
    );
}
