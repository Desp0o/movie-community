import React from 'react'
import Author from '../../components/singlePostComp/Author'
import { quizNeon } from '../../assets/newSvg/quizNeon'
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled';

interface QuizCoverProps {
    title: string;
    funcName?: () => void;
    name: string;
    avatar: string;
}

const QuizCover: React.FC<QuizCoverProps> = ({ title, funcName, avatar, name }) => {

    return (
        <>
            <span>{quizNeon}</span>

            <div className='quiz_creator_title'>
                <Author name={name} avatar={avatar} />
                <p className='quiz_creator_title_TITLE'>{title}</p>
            </div>

            <span onClick={funcName}>
                <ButtonFIlled text={'Get started!'} link={''} wProp='300px'/>
            </span>
        </>
    )
}

export default QuizCover