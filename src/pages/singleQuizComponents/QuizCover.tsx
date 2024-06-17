import React from 'react'
import Author from '../../components/singlePostComp/Author'
import { quizNeon } from '../../assets/newSvg/quizNeon'
import { useUserHook } from '../../hooks/useUserHook';
import ButtonFIlled from '../../components/buttonFIlled/ButtonFilled';

interface QuizCoverProps {
    title: string;
    funcName?: () => void;
}

const QuizCover: React.FC<QuizCoverProps> = ({ title, funcName }) => {
    const { user } = useUserHook()

    return (
        <>
            <span>{quizNeon}</span>

            <div className='quiz_creator_title'>
                <Author name={user.name} avatar={user.avatar} />
                <p className='quiz_creator_title_TITLE'>{title}</p>
            </div>

            <span onClick={funcName}>
                <ButtonFIlled text={'Get started!'} link={''} wProp='300px'/>
            </span>
        </>
    )
}

export default QuizCover