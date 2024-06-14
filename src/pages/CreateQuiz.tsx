import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import "./CreateQuiz.css";
import axios from 'axios';
import { QUIZ } from '../assets/newSvg/QUIZ';
import cover from "../assets/bacToFuture.webp"
import ButtonFIlled from '../components/buttonFIlled/ButtonFilled';
import ButtonOutlined from '../components/buttonFIlled/ButtonOutlined';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import PageLayout from '../components/pageLayout/PageLayout';
import { useDropzone } from 'react-dropzone'
import dropIcon from "../assets/dropIcon.webp"
import { closeSquareIcon } from '../assets/newSvg/closeSquareIcon';
import { useLanguage } from '../hooks/useLanguage';

interface QuestionProps {
  questionText: string;
  questionImg: any;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

interface QuizDataProps {
  mainTitle: string;
  mainImg: File | undefined;
  type: number;
  questions: QuestionProps[];
}

const CreateQuiz = () => {
  const { selectedLanguage } = useLanguage()
  const navigate = useNavigate()
  const [isFaded, setFaded] = useState(true) //nex button active/inactive trigger
  const [isEditBtn, setEditBtn] = useState(false) //swap next and edit buttons trigger
  const [savedQuizIndex, setSavedQuizIndex] = useState(0) //save index fro array fro later update array
  const [restartQuestion, setRestartQuestion] = useState(true)
  const [quizData, setQuizData] = useState<QuizDataProps>({
    mainTitle: '',
    type: 5,
    mainImg: undefined,
    questions: [

    ]
  });
  const [singleQuiz, setSingleQuiz] = useState<QuestionProps>({
    questionText: '',
    questionImg: null,
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  })


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
 
    setQuizData({ ...quizData, mainImg: file });
  };


  // drag n drop func
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const file = acceptedFiles[0]
    
    setSingleQuiz({ ...singleQuiz, questionImg: file })

  }, [singleQuiz])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  // make buttons active/inactive
  useEffect(() => {
    if (
      singleQuiz.answer1 !== '' &&
      singleQuiz.answer2 !== '' &&
      singleQuiz.answer3 !== '' &&
      singleQuiz.answer4 !== ''
    ) {
      setFaded(false)
    } else (
      setFaded(true)
    )
  }, [singleQuiz])

  //fade or not restart question button
  useEffect(() => {
    if (
      singleQuiz.questionText !== '' ||
      singleQuiz.questionImg !== null||
      singleQuiz.answer1 !== '' ||
      singleQuiz.answer2 !== '' ||
      singleQuiz.answer3 !== '' ||
      singleQuiz.answer4 !== ''
    ) {
      setRestartQuestion(false)
    } else {
      setRestartQuestion(true)
    }
  }, [singleQuiz])

  //add more question
  const addQuestion = () => {
    if (
      singleQuiz.answer1 !== '' &&
      singleQuiz.answer2 !== '' &&
      singleQuiz.answer3 !== '' &&
      singleQuiz.answer4 !== ''
    ) {
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
            questionImg: singleQuiz.questionImg
          }
        ]
      });

      setSingleQuiz({
        ...singleQuiz, questionText: '', questionImg: null, answer1: '', answer2: '', answer3: '', answer4: ''
      })
    }

  };

  //reset question
  const resetQuestion = () => {

    if (
      singleQuiz.questionText !== '' ||
      singleQuiz.questionImg !== null || singleQuiz.questionImg !== null ||
      singleQuiz.answer1 !== '' ||
      singleQuiz.answer2 !== '' ||
      singleQuiz.answer3 !== '' ||
      singleQuiz.answer4 !== ''
    ) {
      setSingleQuiz({
        ...singleQuiz,
        questionImg: null,
        questionText: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: ''
      })
    }
  }

  //clear quizData
  const startOver = () => {
    setQuizData({
      mainTitle: '',
      type: 5,
      mainImg: undefined,
      questions: [

      ]
    })
  }

  const removeQuizCard = (index: number) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);

    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });

  };

  const getQuizForEdit = (index: number) => {
    // find current element in index
    const foundIndex = quizData.questions[index]

    if(foundIndex){
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        setSingleQuiz({
        questionImg: foundIndex.questionImg ? URL.createObjectURL(foundIndex.questionImg) : null,
        questionText: foundIndex.questionText,
        answer1: foundIndex.answer1,
        answer2: foundIndex.answer2,
        answer3: foundIndex.answer3,
        answer4: foundIndex.answer4
      })
    }

    setEditBtn(true)
    setSavedQuizIndex(index)

  }

  const editQuizCard = () => {
    // create new copy
    const updatedQuestions = [...quizData.questions];

    // update on index
    updatedQuestions[savedQuizIndex] = singleQuiz;

    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });

    setSingleQuiz({
      ...singleQuiz, questionText: '', questionImg: null, answer1: '', answer2: '', answer3: '', answer4: ''
    })
    setEditBtn(false)
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    try {
       await axios.post(import.meta.env.VITE_QUIZ_ADD, quizData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data, application/json, text/plain, */*",
        },
      });
      // console.log("ქუი", response.data);
      
      
      navigate('/')
    } catch (error) {
      console.error('Error submitting quiz data:', error);
    }
    console.log(quizData);
  };

  return (
    <>
      <PageLayout>
        <div className='create_quiz'>
          <div className="margin_top_cr_quiz">
            <p>{selectedLanguage.createQuiz_page.title}</p>
            {QUIZ}
          </div>
         
         
          <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

         
                 <div className='cr_quiz_table'>
            <input className='cr_quiz_question1' type='text' placeholder='სათაური ჩაწერე აქ' value={quizData.mainTitle} onChange={(e) => setQuizData({...quizData, mainTitle: e.target.value})} />
            {/* question section */}
            <div className='cr_quiz_question'>
              <p>{selectedLanguage.createQuiz_page.questionNum} 1/1 <span className='important_star'>*</span></p>

              <input
                type='text'
                name='question'
                placeholder={selectedLanguage.createQuiz_page.questionPlaceholder}
                className='cr_quiz_question1'
                value={singleQuiz.questionText}
                onChange={(e) => setSingleQuiz({ ...singleQuiz, questionText: e.target.value })}
              />
            </div>

            {/* answers section */}
            <div className='cr_quiz_answers'>
              <p className='answer_options'>{selectedLanguage.createQuiz_page.answers} <span className='important_star'>*</span></p>
              <div className='cr_quiz_answers_inner'>
                <QuizAnwersComp
                  name={'answ1'}
                  value={singleQuiz.answer1}
                  placeholder={selectedLanguage.createQuiz_page.correct_answer}
                  setter={(value) => setSingleQuiz({ ...singleQuiz, answer1: value })}
                  isCorrect={true}
                />

                <QuizAnwersComp
                  name={'answ2'}
                  value={singleQuiz.answer2}
                  placeholder={selectedLanguage.createQuiz_page.answ2}
                  setter={(value) => setSingleQuiz({ ...singleQuiz, answer2: value })}
                />

                <QuizAnwersComp
                  name={'answ3'}
                  value={singleQuiz.answer3}
                  placeholder={selectedLanguage.createQuiz_page.answ3}
                  setter={(value) => setSingleQuiz({ ...singleQuiz, answer3: value })}
                />

                <QuizAnwersComp
                  name={'answ1'}
                  value={singleQuiz.answer4}
                  placeholder={selectedLanguage.createQuiz_page.answ4}
                  setter={(value) => setSingleQuiz({ ...singleQuiz, answer4: value })}
                />
              </div>
            </div>

            {/* upload image with drag n drop */}
            <div className='cr_quiz_upload_image'>
              <p>{selectedLanguage.createQuiz_page.addImage}</p>
              <div {...getRootProps()} className='dragNdrop'>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <></>
                    :
                    <div className='dragNdrop_block'>
                      <div className='dragNdrop_block1'>
                        <img src={dropIcon} className='dropIcon' alt='dropIcon' />
                        <p>{selectedLanguage.createQuiz_page.dragNdrop}</p>
                      </div>
                      <p>{selectedLanguage.createQuiz_page.or}</p>

                      <div className='dragNdrop_block2'>
                        <p>{selectedLanguage.createQuiz_page.selectFile}</p>
                      </div>
                    </div>
                }
              </div>
            </div>



            {/* buttons */}
            <div className='cr_quiz_buttons'>
              {
                isEditBtn
                  ? <span onClick={editQuizCard}><ButtonFIlled text={selectedLanguage.createQuiz_page.editBtn} link={''} faded={isFaded} /></span>
                  : <span onClick={addQuestion}><ButtonFIlled text={selectedLanguage.createQuiz_page.nextBtn} link={''} faded={isFaded} /></span>
              }
              <span onClick={resetQuestion}><ButtonOutlined text={selectedLanguage.createQuiz_page.startOverQuestion} link={''} faded={restartQuestion} /></span>
            </div>
          </div>



          {/* quiz cards and buttons */}
          <div className='cr_quiz_bottom'>
            <div className='mapping_quizData'>
              {quizData?.questions?.map((item, index) => {
                return (
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
                    editCallBack={() => getQuizForEdit(index)}
                    deleteCallback={() => removeQuizCard(index)}
                  />
                )
              })}
            </div>

            {
              quizData?.questions.length > 0
              && <div className='apply_reset_btns'>
                <span onClick={handleSubmit}><ButtonFIlled text={selectedLanguage.createQuiz_page.saveBtn} link={''} /></span>
                <span onClick={startOver}><ButtonOutlined text={selectedLanguage.createQuiz_page.deleteBtn} link={''} /></span>
              </div>
            }
          </div>
        </div>
      </PageLayout>
      <Footer />
    </>
  );
};

export default CreateQuiz;


//Quiz answer component
interface quizAnwersCompProps {
  name: string;
  placeholder: string;
  setter: (value: string) => void;
  value: string;
  isCorrect?: boolean;
}

const QuizAnwersComp: React.FC<quizAnwersCompProps> = ({ name, value, placeholder, setter, isCorrect }) => {
  return (
    <input
      type='text'
      name={name}
      value={value}
      onChange={(e) => setter(e.target.value)}
      placeholder={placeholder}
      className={isCorrect ? "cr_quiz_answer_input correct" : "cr_quiz_answer_input"}
    />
  );
};


//Quiz card component
interface QuizCardProps {
  index: number;
  length: number;
  title: string;
  image: any;
  answ1: string;
  answ2: string;
  answ3: string;
  answ4: string;
  editCallBack: MouseEventHandler<HTMLDivElement> | undefined;
  deleteCallback:MouseEventHandler<HTMLDivElement> | undefined;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  index, 
  length, 
  editCallBack, 
  deleteCallback, 
  title, 
  image, 
  answ1, 
  answ2, 
  answ3, 
  answ4 
}) => {
  
  const { selectedLanguage } = useLanguage()
  const editPanelRef = useRef<HTMLDivElement>(null)
  const [isOpened, setOpen] = useState(false)

  const editPannelHandler = () => {
    setOpen(!isOpened)
  }
  

  //close editpanel when is clicked out of box
  useEffect(() => {
    const editPanelOutsideClick = (event: MouseEvent) => {
      if (
        editPanelRef.current &&
        event.target instanceof Node &&
        !editPanelRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
    }

    document.addEventListener("click", editPanelOutsideClick);

    return () => {
        document.removeEventListener("click", editPanelOutsideClick);
    };
}, [isOpened]);

  return (
    <div className='cr_quiz_card'>

      <div className='cr_quiz_card_questionNum_dots'>
        <p>{selectedLanguage.createQuiz_page.questionNum} {index}/{length}</p>

        <div className='pannel_dots' onClick={editPannelHandler} ref={editPanelRef}>
          <span className='panel_single_dot' />
          <span className='panel_single_dot' />
          <span className='panel_single_dot' />
        </div>

        {
          isOpened 
            && <div className='cr_quiz_card_editPanel'>
                 <span onClick={editPannelHandler}>{closeSquareIcon}</span>
  
                 <p className='cr_quiz_card_editPanel_p' onClick={deleteCallback}>{selectedLanguage.createQuiz_page.deleteQuestion}</p>
                  <p className='cr_quiz_card_editPanel_p' onClick={editCallBack}>{selectedLanguage.createQuiz_page.editQuestion}</p>
               </div>
          
        }
      </div>

      {/* title */}
      <p className='cr_quiz_card_title'>{title}</p>


      <div className='cr_quiz_image_answers'>
        {/* quiz question image */}
        <img src={image ? URL.createObjectURL(image) : cover} className='cr_quiz_card_cover' alt='quiz card cover' />

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


