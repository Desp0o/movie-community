import { ChangeEvent, useState } from 'react';
import InputComponent from "../components/inputComponent/InputComponent";
import "./CreateQuiz.css";
import axios from 'axios';

interface QuestionProps {
    questionText: string;
    questionImg: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
}

interface QuizDataProps {
    mainTitle: string;
    mainImg: string;
    questions: QuestionProps[];
}

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState<QuizDataProps>({
    mainTitle: '',
    mainImg: '',
    questions: [
      {
        questionText: '',
        questionImg: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      }
    ]
  });

  const handleMainTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuizData({ ...quizData, mainTitle: e.target.value });
  };

  const handleQuestionTextChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index].questionText = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleAnswerChange = (index: number, answerKey: keyof QuestionProps, e: ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index][answerKey] = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };


  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: '', answer1: '', answer2: '', answer3: '', answer4: '', questionImg: '' }
      ]
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = quizData.questions.filter((_, qIndex) => qIndex !== index);
    setQuizData({ ...quizData, questions: newQuestions });
  };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    const token = localStorage.getItem('token')
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_QUIZ_ADD, quizData, {
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      console.log('Quiz data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting quiz data:', error);
    }
  };



  

 

//   const fileHandler = (e) =>{

//   }

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="main_c">
        <InputComponent
          type="text"
          placeholder="main title"
          value={quizData.mainTitle}
          isError={false}
          nameProp="main title"
          onChange={handleMainTitleChange}
        />

        {/* <input type='file' onChange={fileHandler}/> */}

        {quizData.questions.map((question, qIndex) => (
          <div className="q_question" key={qIndex} style={{ position: 'relative' }}>
            <InputComponent
              type="text"
              placeholder="quiz single question"
              value={question.questionText}
              isError={false}
              nameProp={`question ${qIndex + 1}`}
              onChange={(e) => handleQuestionTextChange(qIndex, e)}
            />
            <br />
            <InputComponent
              type="text"
              placeholder="answer 1"
              value={question.answer1}
              isError={false}
              nameProp={`answer 1`}
              onChange={(e) => handleAnswerChange(qIndex, 'answer1', e)}
            />
            <InputComponent
              type="text"
              placeholder="answer 2"
              value={question.answer2}
              isError={false}
              nameProp={`answer 2`}
              onChange={(e) => handleAnswerChange(qIndex, 'answer2', e)}
            />
            <InputComponent
              type="text"
              placeholder="answer 3"
              value={question.answer3}
              isError={false}
              nameProp={`answer 3`}
              onChange={(e) => handleAnswerChange(qIndex, 'answer3', e)}
            />
            <InputComponent
              type="text"
              placeholder="answer 4"
              value={question.answer4}
              isError={false}
              nameProp={`answer 4`}
              onChange={(e) => handleAnswerChange(qIndex, 'answer4', e)}
            />
            <button 
              onClick={() => removeQuestion(qIndex)} 
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              X
            </button>
          </div>
        ))}

        <button onClick={addQuestion}>Add one more question</button>
        <button onClick={handleSubmit}>Submit Quiz</button>
      </div>
    </div>
  );
};

export default CreateQuiz;
