import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Quiz.css";

interface QuestionsType {
    name: string;
    var: string;
    var1: string;
    var2: string;
    var3: string;
}

const Quiz = () => {
    const { id } = useParams();
    const answerDivRef = useRef<HTMLDivElement>(null)
    const questionRef = useRef<HTMLParagraphElement>(null)
    const [questions, setQuestions] = useState<QuestionsType | null>(null);
    const [isCorrect, setCorrect] = useState(0);
    const [isLastQuest, setIsLastQuest] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
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
        
                while(i < array.length){
                    const randomNumber = Math.floor(Math.random() * array.length)
                    if(!usedIndexes.includes(randomNumber)){
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
            event.currentTarget.style.backgroundColor = "green"
        } else {
            setCorrect(0)
        }

        if (quizData.correctAnswer !== event.currentTarget.textContent) {
            event.currentTarget.style.backgroundColor = "red"
        }
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
                alert('was last questuin')
            }

        } catch (error) {
            console.log(error)
        }
    };


    if (!questions) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>{quizData.name}</h3>
            <div className=''>
                {/* quzi numeric */}
                <p> {quizData.questionIndex} / {quizData.quizLength}</p>
                <p>correct answers: {quizData.correctAnswersSum}</p>
                <h4 style={{ color: 'purple', fontWeight: "bolder" }}>{questions.name}</h4>
                <div className='answers' ref={answerDivRef}>
                    {answers.map((item, index) => (
                        <p ref={questionRef} key={index} className='quiz_single_answer' onClick={handleAnswer}>{item}</p>
                    ))}
                </div>
            </div>
            <button onClick={sendAnswer}>NEXT</button>
        </div>
    );
};

export default Quiz;

