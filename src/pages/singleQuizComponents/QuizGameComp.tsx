import React, { RefObject, useState } from 'react'
import { quizBackButton } from '../../assets/newSvg/quizBackButton'
import { smallQuizNeon } from '../../assets/newSvg/smallQuizNeon'
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled'
import { Link } from 'react-router-dom';

interface QuizGameCompProps {
    img: string | undefined;
    questionIndex: number;
    quizLength: number;
    name: string | undefined;
    answers: string[];
    answerDivRef: RefObject<HTMLDivElement>;
    questionRef: RefObject<HTMLDivElement>;
    funcName: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
    sendAnswerFunc: () => void
}

const QuizGameComp: React.FC<QuizGameCompProps> = ({ questionIndex, quizLength, name, img, answerDivRef, questionRef, funcName, answers, sendAnswerFunc }) => {
    const [isFullScreen, setFullScreen] = useState(false)

    const openImage = () => {
        setFullScreen(!isFullScreen)
    }

    return (
        <>
            {
                isFullScreen
                && <div className='fullScreenImage'>
                    <img src={`${import.meta.env.VITE_EASY_QUIZ_Q_IMG}${img}.webp`} alt='single quiz question image' className='single_quiz_question_image_contain' onClick={()=>setFullScreen(false)} style={{cursor:"pointer"}}/>
                </div>
            }
            {/* quiz icon, back button, number */}
            <div className='quiz_game_component_top'>
                <Link to='/'>{quizBackButton}</Link>
                <span>{smallQuizNeon}</span>
                <p className='quiz_game_component_top_p'>{questionIndex}/{quizLength}</p>
            </div>

            {/* title and image */}
            <div className='quiz_game_component_middle'>
                <p>{name}</p>

                {img ? <div className='single_quiz_question_image' onClick={openImage}>
                    <img src={`${import.meta.env.VITE_EASY_QUIZ_Q_IMG}${img}.webp`} alt='single quiz question image' className='single_quiz_question_image_cover' />
                    <img src={`${import.meta.env.VITE_EASY_QUIZ_Q_IMG}${img}.webp`} alt='single quiz question image' className='single_quiz_question_image_contain'/>
                </div>
                    : null}
            </div>


            <div className='quiz_game_component_answers' ref={answerDivRef}>
                {answers.map((item, index) => (
                    <p ref={questionRef} key={index} className='quiz_single_answer' onClick={funcName}>{item}</p>
                ))}
            </div>

            <div className='quiz_game_component_bottom' onClick={sendAnswerFunc}>
                <ButtonFIlled text='Next' link={''} />
            </div>
        </>
    )
}

export default QuizGameComp