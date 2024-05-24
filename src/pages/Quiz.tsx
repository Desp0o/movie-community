import axios from 'axios';
import { useEffect, useState } from 'react';
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
    const [questions, setQuestions] = useState<QuestionsType | null>(null);
    const [isCorrect, setCorrect] = useState(0);
    const [questIndex, setQuestIndex] = useState(1);
    const [isLastQuest, setIsLastQuest] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const [quizData, setQuizData] = useState({
        name: '',
        quizLength: 0,
        questionID: 0,
        correctAnswer: ''
    })

    const getSingleQuiz = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(`https://api.pinky.ge/api/quiz/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data);
            console.log('triggered')

            const resQuizData = res.data
            setQuestions(res.data.question);
            const fetchedAnswer: string[] = [
                res.data?.question?.var,
                res.data?.question?.var1,
                res.data?.question?.var2,
                res.data?.question?.var3
            ];
            setAnswers(fetchedAnswer);

            setQuizData({
                ...quizData,
                name: resQuizData.quiz?.name,
                quizLength: resQuizData.quiz?.questions,
                questionID: resQuizData.question?.quiz_id,
                correctAnswer: resQuizData.question?.var
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
        if (questIndex === quizData.quizLength) {
            setIsLastQuest(1);
        }else{
            setIsLastQuest(0)
        }
    }, [questIndex, quizData.quizLength]);


    const handleAnswer = async (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        const token = localStorage.getItem('token')
        const selectedAnswer = event.currentTarget.textContent;
        
        if (selectedAnswer === quizData.correctAnswer) {
            alert("Correct answer!");
            setCorrect(1);
        } else {
            setCorrect(0);
        }

        setQuestIndex(questIndex + 1)
        try {
            const response = await axios.post(`https://api.pinky.ge/api/quizAnswering/${quizData.questionID}`,{
                result: isCorrect,
                status: isLastQuest
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
        console.log(isLastQuest);
        
            // getSingleQuiz()
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
                <div className='answers'>
                    {answers.map((item, index) => (
                        <p key={index} className='quiz_single_answer' onClick={handleAnswer}>{item}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
