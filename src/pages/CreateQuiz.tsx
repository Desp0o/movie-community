import { useEffect, useState } from 'react';
import InputComponent from "../components/inputComponent/InputComponent";
import "./CreateQuiz.css";
import axios from 'axios';

const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    mainTitle: '',
    questions: [
      { questionText: '', answers: ['', '', '', ''] }
    ]
  });

  const handleMainTitleChange = (e:any) => {
    setQuizData({ ...quizData, mainTitle: e.target.value });
  };

  const handleQuestionChange = (index: number, e:any) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index].questionText = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, e:any) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].answers[aIndex] = e.target.value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, { questionText: '', answers: ['', '', '', ''] }]
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = quizData.questions.filter((_, qIndex) => qIndex !== index);
    setQuizData({ ...quizData, questions: newQuestions });
  };

  useEffect(()=>{
    console.log(JSON.stringify(quizData));
  }, [quizData]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/your-backend-endpoint', quizData);
      console.log('Quiz data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting quiz data:', error);
    }
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="main_c">
        <InputComponent
          type={"text"}
          placeholder={"main title"}
          value={quizData.mainTitle}
          isError={false}
          nameProp={"main title"}
          onChange={handleMainTitleChange}
        />

        {quizData.questions.map((question, qIndex) => (
          <div className="q_question" key={qIndex} style={{ position: 'relative' }}>
            <InputComponent
              type={"text"}
              placeholder={"quiz single question"}
              value={question.questionText}
              isError={false}
              nameProp={`question ${qIndex + 1}`}
              onChange={(e) => handleQuestionChange(qIndex, e)}
            />
            <br />
            {question.answers.map((answer, aIndex) => (
              <InputComponent
                key={aIndex}
                type={"text"}
                placeholder={`answer ${aIndex + 1}`}
                value={answer}
                isError={false}
                nameProp={`answer ${aIndex + 1}`}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
              />
            ))}
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
