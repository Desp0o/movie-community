import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Quiz.css";
import PageLayout from '../components/pageLayout/PageLayout';
import QuizCover from './singleQuizComponents/QuizCover';
import QuizGameComp from './singleQuizComponents/QuizGameComp';
import QuizFinalScoreBoard from './singleQuizComponents/QuizFinalScoreBoard';

interface QuestionsType {
    name: string;
    var: string;
    var1: string;
    var2: string;
    var3: string;
    img: string;
}

const Quiz = () => {
    const { id } = useParams();
    const answerDivRef = useRef<HTMLDivElement>(null)
    const questionRef = useRef<HTMLParagraphElement>(null)
    const [questions, setQuestions] = useState<QuestionsType | null>(null);
    const [isCorrect, setCorrect] = useState(0);
    const [isLastQuest, setIsLastQuest] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showMeQuiz, setShowMeQuiz] = useState(false)
    const [showMeFinal, setShowMeFinal] = useState(false)
    const [quizData, setQuizData] = useState({
        name: '',
        quizLength: 0,
        questionID: 0,
        correctAnswer: '',
        questionIndex: 0,
        correctAnswersSum: 0
    })


    const getSingleQuiz = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`${import.meta.env.VITE_SINGLE_QUIZ}${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const resQuizData = res.data
            setQuestions(res.data.question);
            const fetchedAnswer: string[] = [
                res.data?.question?.var,
                res.data?.question?.var1,
                res.data?.question?.var2,
                res.data?.question?.var3
            ];

            const shuffleAnswers = (array: string[]): string[] => {
                const shuffleArray: string[] = []
                const usedIndexes: number[] = []

                let i = 0;

                while (i < array.length) {
                    const randomNumber = Math.floor(Math.random() * array.length)
                    if (!usedIndexes.includes(randomNumber)) {
                        shuffleArray.push(array[randomNumber])
                        usedIndexes.push(randomNumber)
                        i++;
                    }
                }
                return shuffleArray;
            }

            setAnswers(shuffleAnswers(fetchedAnswer)) //set randomized array to answers
            console.log(res.data);

            setQuizData({
                ...quizData,
                name: resQuizData.quiz?.name,
                quizLength: resQuizData.quiz?.questions,
                questionID: resQuizData.question?.id,
                correctAnswer: resQuizData.question?.var,
                questionIndex: resQuizData.question?.question_index,
                correctAnswersSum: 0
            })

            //clear pointer event prevent and background on answers
            if (answerDivRef.current) {
                answerDivRef.current.style.pointerEvents = "unset";
                Array.from(answerDivRef.current.children).forEach((item) => {
                    if (item instanceof HTMLElement) {
                        item.style.backgroundColor = "unset";
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    };

    // get quiz onload
    useEffect(() => {
        getSingleQuiz();
    }, []);


    //თუ კითხვის ინდექსი უნდრის სიგრძეს მაშინ
    //მაშინ ბოლო კითხვას ვაგზავნით
    useEffect(() => {
        if (quizData.questionIndex === quizData.quizLength) {
            setIsLastQuest(1);
        } else {
            setIsLastQuest(0);
        }
    }, [quizData.questionIndex, quizData.quizLength]);

    //handle correct answer
    const handleAnswer = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        if (answerDivRef.current) {
            answerDivRef.current.classList.add("no-cursor")
            answerDivRef.current.style.pointerEvents = "none"
        }

        if (quizData.correctAnswer === event.currentTarget.textContent) {
            setCorrect(1)
            //update correct answers sum
            setQuizData({ ...quizData, correctAnswersSum: quizData.correctAnswersSum + 1 })
            event.currentTarget.classList.add('correct')
        } else {
            setCorrect(0)
        }

        if (quizData.correctAnswer !== event.currentTarget.textContent) {
            event.currentTarget.classList.add("incorrect")
        }
        console.log(quizData.correctAnswersSum);
        
    }

    const sendAnswer = async () => {
        const token = localStorage.getItem('token')

        try {
            await axios.post(`${import.meta.env.VITE_QUIZ_ANSWERING}${quizData.questionID}`, {
                status: isLastQuest,
                result: isCorrect
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (isLastQuest === 0) {
                getSingleQuiz()
            } else {
                setShowMeFinal(true)
                setShowMeQuiz(false)
            }

            const correctElements = document.querySelectorAll('.correct');
            correctElements.forEach(el => el.classList.remove('correct'));

            const incorrectElements = document.querySelectorAll('.incorrect');
            incorrectElements.forEach(el => el.classList.remove('incorrect'));
            
        } catch (error) {
            console.log(error)
        }
    };

    const showMeQuizHandler = () => {
        setShowMeQuiz(true)
    }

    return (
        <PageLayout>
            <div className='single_quiz'>
                <div className='quiz_popUp'>

                    {/* quiz cover */}
                    <div className={showMeQuiz || showMeFinal ? "quiz_cover display_none" : "quiz_cover"}>
                        <QuizCover title={quizData.name} funcName={showMeQuizHandler} />
                    </div>

                    <div className={showMeQuiz ? "quiz_game_component active" : "quiz_game_component"}>
                        <QuizGameComp 
                            questionIndex={quizData.questionIndex}
                            quizLength={quizData.quizLength}
                            name={questions?.name}
                            answers={answers}
                            answerDivRef={answerDivRef}
                            questionRef={questionRef}
                            funcName={handleAnswer} 
                            img={questions?.img} 
                            sendAnswerFunc={sendAnswer}
                            />
                    </div>

                    <div className={showMeFinal ? "quiz_final active" : "quiz_final"}>
                        <QuizFinalScoreBoard 
                        title={quizData.name} 
                        correctAnswers={quizData.correctAnswersSum} 
                        questionSum={quizData.quizLength} 
                        />
                    </div>
                </div>
            </div>

        </PageLayout>

    );
};

export default Quiz;







