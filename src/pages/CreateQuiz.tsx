import React, { MouseEventHandler, useEffect, useState } from 'react';
import "./CreateQuiz.css";
import axios from 'axios';
import { QUIZ } from '../assets/newSvg/QUIZ';
import cover from "../assets/bacToFuture.webp"
import ButtonFIlled from '../components/buttonFIlled/ButtonFilled';
import ButtonOutlined from '../components/buttonFIlled/ButtonOutlined';

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
    type: number;
    questions: QuestionProps[];
}

const CreateQuiz = () => {
  const [isFaded, setFaded] = useState(true) //nex button active/inactive indicator
  const [isFadeOverButton, setFadeOverButton] = useState(true)
  const [quizData, setQuizData] = useState<QuizDataProps>({
    mainTitle: '',
    type: 5,
    mainImg: '',
    questions: [
      
    ]
  });


  const [singleQuiz, setSingleQuiz] = useState({
    questionText: '',
        questionImg: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
})

// make buttons active/inactive
useEffect(()=>{
  if(
    singleQuiz.questionText !== '' &&
    singleQuiz.answer1 !== '' &&
    singleQuiz.answer2 !== '' &&
    singleQuiz.answer3 !== '' &&
    singleQuiz.answer4 !== ''
  ){
    setFaded(false)
  }else(
    setFaded(true)
  )
},[singleQuiz])

//fade or not start over btn
useEffect(()=>{
  
    if(quizData.questions.length === 0){
      setFadeOverButton(true)
    }else{
      setFadeOverButton(false)
    }
  
},[quizData.questions])


  //add more question
  const addQuestion = () => {
    if(
      singleQuiz.questionText !== '' &&
      singleQuiz.answer1 !== '' &&
      singleQuiz.answer2 !== '' &&
      singleQuiz.answer3 !== '' &&
      singleQuiz.answer4 !== ''
    ){
      setQuizData({
        ...quizData,
        questions: [
          ...quizData.questions,
          { 
            questionText: singleQuiz.questionText, 
            answer1: singleQuiz.answer1, 
            answer2: singleQuiz.answer2, 
            answer3: singleQuiz.answer3, 
            answer4: singleQuiz.answer4, 
            questionImg: '' 
          }
        ]
      });
  
      setSingleQuiz({
        ...singleQuiz, questionText: '', questionImg: '', answer1: '', answer2: '', answer3:'', answer4:''
      })
    }
    

    console.log(quizData);
    
  };

  //clear quizData
  const startOver = () => {
    setQuizData({
      mainTitle: '',
    type: 5,
    mainImg: '',
    questions: [
      
    ]
    })
  }

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



  


useEffect(()=>{
  console.log(singleQuiz);
  
},[singleQuiz])


  const editQuizCard = (index:number) =>{

    const foundIndex = quizData.questions[index]
    console.log(foundIndex);
    

    setSingleQuiz({
      questionImg: foundIndex.questionImg,
      questionText: foundIndex.questionText,
      answer1: foundIndex.answer1,
      answer2: foundIndex.answer2,
      answer3: foundIndex.answer3,
      answer4: foundIndex.answer4
    })

    console.log(index);
    
  }  

  return (
    <div className='create_quiz'>

          <div className="margin_top_cr_quiz">
            <p>Create a </p>
            {QUIZ}
          </div>

          <div className='cr_quiz_table'>
            
            {/* question section */}
            <div className='cr_quiz_question'>
              <p>Question 1/1 <span className='important_star'>*</span></p>

              <input 
                type='text' 
                name='question' 
                placeholder='Question...' 
                className='cr_quiz_question1'
                value={singleQuiz.questionText}
                onChange={(e)=>setSingleQuiz({...singleQuiz, questionText: e.target.value})}
              />
            </div>

            {/* answers section */}
            <div className='cr_quiz_answers'>
              <p className='answer_options'>4 answer options<span className='important_star'>*</span></p>
              <div className='cr_quiz_answers_inner'>
              <QuizAnwersComp 
                name={'answ1'} 
                value={singleQuiz.answer1}
                placeholder={'Answer 1'} 
                setter={(value) => setSingleQuiz({ ...singleQuiz, answer1: value })}
              /> 

              <QuizAnwersComp 
                name={'answ2'} 
                value={singleQuiz.answer2}
                placeholder={'Answer 2'} 
                setter={(value) => setSingleQuiz({ ...singleQuiz, answer2: value })}
              /> 

              <QuizAnwersComp 
                name={'answ3'} 
                value={singleQuiz.answer3}
                placeholder={'Answer 3'} 
                setter={(value) => setSingleQuiz({ ...singleQuiz, answer3: value })}
              /> 

              <QuizAnwersComp 
                name={'answ1'} 
                value={singleQuiz.answer4}
                placeholder={'Answer 4'} 
                setter={(value) => setSingleQuiz({ ...singleQuiz, answer4: value })}
              /> 
              </div>
            </div>

            {/* buttons */}
            <div className='cr_quiz_buttons'>
              <span onClick={addQuestion}><ButtonFIlled text={'Next'} link={''} faded={isFaded}/></span>
              <span onClick={startOver}><ButtonOutlined text={'start over'} link={''} faded={isFadeOverButton}/></span>
            </div>
          </div>


      <div className='mapping_quizData'>
        {quizData?.questions?.map((item, index)=>{
          return(
            <QuizCard 
              key={index}
              index={index + 1}
              length={quizData?.questions?.length}
              title={item.questionText}
              image={item.questionImg}
              answ1={item.answer1}
              answ2={item.answer2}
              answ3={item.answer3}
              answ4={item.answer4} 
              callBack={()=>editQuizCard(index)}            
            />
          )
        })}
      </div>


      <div className="main_c">
        

        {/* <input type='file' onChange={fileHandler}/> */}

     

        <button onClick={handleSubmit}>Submit Quiz</button>
      </div>
    </div>
  );
};

export default CreateQuiz;



interface quizAnwersCompProps {
  name: string;
  placeholder: string;
  setter: (value: string) => void;
  value: string;
}

const QuizAnwersComp: React.FC<quizAnwersCompProps> = ({ name, value, placeholder, setter }) => {
  return (
    <input 
      type='text' 
      name={name}
      value={value}  
      onChange={(e) => setter(e.target.value)} 
      placeholder={placeholder} 
      className='cr_quiz_answer_input' 
    />
  );
};



interface QuizCardProps{
  index: number;
  length: number;
  title: string;
  image: string;
  answ1: string;
  answ2: string;
  answ3: string;
  answ4: string;
  callBack: MouseEventHandler<HTMLDivElement> | undefined;
}

const QuizCard: React.FC<QuizCardProps> = ({index, length, callBack, title, image, answ1, answ2, answ3, answ4}) =>{
  return(
    <div className='cr_quiz_card'>
      
      <div className='cr_quiz_card_questionNum_dots'>
        <p>Question {index}/{length}</p>

        <div className='pannel_dots' onClick={callBack}>
          <span className='panel_single_dot' />
          <span className='panel_single_dot' />
          <span className='panel_single_dot' />
        </div>
      </div>

      {/* title */}
      <p className='cr_quiz_card_title'>{title}</p>

      
      <div className='cr_quiz_image_answers'>
        {/* quiz question image */}
        <img src={image ? image : cover} className='cr_quiz_card_cover' alt='quiz card cover'/>

        {/* quiz answers */}
        <div className='cr_quiz_answers_arr'>
          <div className='cr_quiz_single_answers'>
            <p>{answ1}</p>
          </div>

          <div className='cr_quiz_single_answers'>
            <p>{answ2}</p>
          </div>

          <div className='cr_quiz_single_answers'>
            <p>{answ3}</p>
          </div>

          <div className='cr_quiz_single_answers'>
            <p>{answ4}</p>
          </div>
        </div>
      </div>
    </div>
  )
}