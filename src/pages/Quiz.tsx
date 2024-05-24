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
        questionIndex: 0
    })

    const getSingleQuiz = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`https://api.pinky.ge/api/quiz/${id}`, {
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
            setAnswers(fetchedAnswer);
            console.log(res.data);
            
            setQuizData({
                ...quizData,
                name: resQuizData.quiz?.name,
                quizLength: resQuizData.quiz?.questions,
                questionID: resQuizData.question?.id,
                correctAnswer: resQuizData.question?.var,
                questionIndex: resQuizData.question?.question_index
            })
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
        }else{
            setIsLastQuest(0);
        }
    }, [quizData.questionIndex, quizData.quizLength]);

    //handle correct answer
    const handleAnswer = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        if (answerDivRef.current) {
            answerDivRef.current.style.pointerEvents = "none";
          }

        if(quizData.correctAnswer === event.currentTarget.textContent){
            setCorrect(1)
            event.currentTarget.style.backgroundColor = "green"
        }else{
            setCorrect(0)
        }

        if(quizData.correctAnswer !== event.currentTarget.textContent){
            event.currentTarget.style.backgroundColor = "red"
        }
    }
   
    const sendAnswer = async () => {
        const token = localStorage.getItem('token')
        if (answerDivRef.current) {
            answerDivRef.current.style.pointerEvents = "unset";
          }
        
        try {
            await axios.post(`https://api.pinky.ge/api/quizAnswering/${quizData.questionID}`,{
                status: isLastQuest,
                result: isCorrect
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            getSingleQuiz()
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
