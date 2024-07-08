import React, { RefObject, useState } from 'react'
import { quizBackButton } from '../../assets/newSvg/quizBackButton'
import { smallQuizNeon } from '../../assets/newSvg/smallQuizNeon'
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled'
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';
import { quizAnswersDots } from '../../assets/newSvg/quizAnswersDots';
import { ButtonArrow } from '../../components/buttonFIlled/ButtonArrow';

interface QuizGameCompProps {
    isAnswered: boolean;
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

const QuizGameComp: React.FC<QuizGameCompProps> = ({ isAnswered, questionIndex, quizLength, name, img, answerDivRef, questionRef, funcName, answers, sendAnswerFunc }) => {
    const [isFullScreen, setFullScreen] = useState(false)
    const [isHover, setIsHover] = useState<number | null>(null)
    const [swapButton, setSwapButtons] = useState(false)

    const mouseIn = (index: number) => {
        if (window.matchMedia('(hover: hover)').matches) {
            setIsHover(index);
        }
    }

    const mouseOut = () => {
        setIsHover(null)
    }

    const openImage = () => {
        setFullScreen(!isFullScreen)
    }

    const swapBtnhandler = () => {
        if (window.matchMedia('(hover: hover)').matches) {
            if (isAnswered) {
                setSwapButtons(true)
            }
        }
    }

    const recoverBtn = () => {
        setSwapButtons(false)
    }

    return (
        <>
            <ScrollToTop />
            {isFullScreen && (
                <div className='fullScreenImage'>
                    <img
                        src={`${import.meta.env.VITE_EASY_QUIZ_Q_IMG}${img}.webp`}
                        alt='single quiz question image'
                        className='single_quiz_question_image_contain'
                        onClick={() => setFullScreen(false)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            )}
            {/* quiz icon, back button, number */}
            <div className='quiz_game_component_top'>
                <Link to='/'>{quizBackButton}</Link>
                <span>{smallQuizNeon}</span>
                <p className='quiz_game_component_top_p'>{questionIndex}/{quizLength}</p>
            </div>

            {/* title and image */}
            <div className='quiz_game_component_middle'>
                <p className='quiz_inner_name'>{name}</p>
                {img && (
                    <div className='single_quiz_question_image' onClick={openImage}>
                        <img
                            src={`${import.meta.env.VITE_EASY_QUIZ_Q_IMG}${img}.webp`}
                            alt='single quiz question image'
                            className='single_quiz_question_image_cover'
                        />
                        <img
                            src={`${import.meta.env.VITE_EASY_QUIZ_Q_IMG}${img}.webp`}
                            alt='single quiz question image'
                            className='single_quiz_question_image_contain'
                        />
                    </div>
                )}
            </div>

            <div className='quiz_game_component_answers' ref={answerDivRef}>
                {answers.map((item, index) => (
                    <div ref={questionRef} key={index} className='quiz_single_answer' onClick={funcName}>
                        <div className='quiz_p_parent'>
                            <p className='quiz_single_answer_paragraph'>
                                {window.innerWidth > 768 ? (item.length > 43 ? item.substring(0, 43) : item) : item}
                            </p>
                        </div>
                        {window.innerWidth > 768 && (
                            <span
                                className='quizAnswersDots'
                                onMouseLeave={mouseOut}
                                onMouseOver={() => mouseIn(index)}
                            >
                                {item.length > 43 ? quizAnswersDots : null}
                            </span>
                        )}
                        <p
                            className={isHover === index ? "hover_text active" : "hover_text"}
                            onMouseLeave={mouseOut}
                            onMouseOver={() => mouseIn(index)}
                        >
                            {item}
                        </p>
                    </div>
                ))}
            </div>

            <div className='quiz_game_component_bottom' onClick={sendAnswerFunc} onMouseOver={swapBtnhandler} onMouseLeave={recoverBtn}>
                {swapButton ? <ButtonArrow link={''} /> : <ButtonFIlled text='Next' link={''} />}
            </div>
        </>
    )
}

export default QuizGameComp
