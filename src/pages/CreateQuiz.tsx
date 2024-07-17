import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import "./CreateQuiz.css";
import axios from 'axios';
import { QUIZ } from '../assets/newSvg/QUIZ';
import ButtonFIlled from '../components/buttonFIlled/ButtonFilled';
import ButtonOutlined from '../components/buttonFIlled/ButtonOutlined';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import PageLayout from '../components/pageLayout/PageLayout';
import { useDropzone } from 'react-dropzone'
import dropIcon from "../assets/dropIcon.webp"
import { closeSquareIcon } from '../assets/newSvg/closeSquareIcon';
import { useLanguage } from '../hooks/useLanguage';
import { useUserHook } from '../hooks/useUserHook';
import quicDefaultCover from "../assets/quizDefaultCover.webp"
import { smallXicon } from '../assets/newSvg/smallXicon';
import Author from '../components/singlePostComp/Author';
import { noQuizImage } from '../assets/newSvg/noQuizImage';
import { toast } from 'react-toastify';

interface QuestionProps {
  questionText: string;
  //eslint-disable-next-line
  questionImg: any;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  check: number;
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
  const [showQuizTable, setShowQuizTable] = useState(false)
  const [isTitleCover, setTitleCover] = useState(false)
  const [quizData, setQuizData] = useState<QuizDataProps>({
    mainTitle: '',
    type: 5,
    mainImg: undefined,
    questions: [

    ]
  });
  const [singleQuiz, setSingleQuiz] = useState<QuestionProps>({
    questionText: '',
    questionImg: undefined,
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    check: 0,
  })

  const addCoverAndTitle = () => {
    setTitleCover(true)
    setShowQuizTable(true)
  }

  // drag n drop func
  //eslint-disable-next-line
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const file = acceptedFiles[0]

    setSingleQuiz({ ...singleQuiz, questionImg: file, check: 1 })

  }, [singleQuiz])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  //eslint-disable-next-line
  const onDropSecond = useCallback((acceptedFile: any) => {
    const file = acceptedFile[0];
    setQuizData({ ...quizData, mainImg: file });
  }, [quizData]);
  const { getRootProps: getRootPropsSecond, getInputProps: getInputPropsSecond } = useDropzone({ onDrop: onDropSecond })



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
      singleQuiz.questionImg !== undefined ||
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
    if(singleQuiz.questionImg === undefined && singleQuiz.questionText === ''){
      toast.error("Please add title or image", { autoClose: 3000, theme: "colored" })
    }else{
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
              questionImg: singleQuiz.questionImg,
              check: singleQuiz.questionImg ? 1 : 0
            }
          ]
        });
  
        setSingleQuiz({
          ...singleQuiz, questionText: '', questionImg: undefined, answer1: '', answer2: '', answer3: '', answer4: '', check: 0
        })
      }else{
        toast.error("Please fill all answers", { autoClose: 3000, theme: "colored" })
      }
    }

  };

  //reset question
  const resetQuestion = () => {

    if (
      singleQuiz.questionText !== '' ||
      singleQuiz.questionImg !== undefined || singleQuiz.questionImg !== undefined ||
      singleQuiz.answer1 !== '' ||
      singleQuiz.answer2 !== '' ||
      singleQuiz.answer3 !== '' ||
      singleQuiz.answer4 !== ''
    ) {
      setSingleQuiz({
        ...singleQuiz,
        questionImg: undefined,
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

  const deteleCoverImage = () => {
    setQuizData({ ...quizData, mainImg: undefined })
  }

  const clearTitleAndCover = () => {
    setQuizData({ ...quizData, mainImg: undefined, mainTitle: "" })
    setTitleCover(false)
    setShowQuizTable(false)
    startOver()
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

    if (foundIndex) {
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth'
      // });

      setSingleQuiz({
        questionImg: foundIndex.questionImg,
        questionText: foundIndex.questionText,
        answer1: foundIndex.answer1,
        answer2: foundIndex.answer2,
        answer3: foundIndex.answer3,
        answer4: foundIndex.answer4,
        check: foundIndex.check
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
      ...singleQuiz, questionText: '', questionImg: undefined, answer1: '', answer2: '', answer3: '', answer4: ''
    })
    setEditBtn(false)
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(import.meta.env.VITE_QUIZ_ADD, quizData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data, application/json, text/plain, */*",
        },
      });
      console.log(response.data);




      navigate('/')
    } catch (error) {
      console.error('Error submitting quiz data:', error);
    }
  };


  //scrolling with mouse drag
  const itemsRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: { preventDefault: () => void; pageX: number; }) => {
    e.preventDefault();

    if (itemsRef.current) {

      setIsMouseDown(true);
      setStartX(e.pageX - itemsRef.current.offsetLeft);
      setScrollLeft(itemsRef.current.scrollLeft);
    }
  };

  const handleMouseLeaveOrUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: { preventDefault: () => void; pageX: number; }) => {
    if (!isMouseDown) return;
    e.preventDefault();
    if (itemsRef.current) {

      const x = e.pageX - itemsRef.current.offsetLeft / 2;
      const walk = (x - startX) * 1; // Adjust scroll speed as needed
      itemsRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [pRigth, setPRight] = useState(80)
  useEffect(()=>{
    setScreenWidth(window.innerWidth)

    if(window.innerWidth < 768){
      setPRight(10)
    }
  },[])

  return (
    <>
      <PageLayout>
        <div className='create_quiz'>
          <div className="margin_top_cr_quiz">
            <p>{selectedLanguage.createQuiz_page.title}</p>
            {QUIZ}
          </div>


          {/* title and cover image */}
          <div className='title_and_cover_image_cr_quiz'>
            {
              !isTitleCover ?
                <>
                  <div className='cr_quiz_question_titles_container'>
                    <p className='cr_quiz_question_titles'>Quiz Title <span className='important_star'>*</span></p>
                    <input className='cr_quiz_question1' type='text' placeholder='სათაური ჩაწერე აქ' value={quizData.mainTitle} onChange={(e) => setQuizData({ ...quizData, mainTitle: e.target.value })} />
                  </div>

                  <div className='cr_quiz_question_titles_container'>
                    <p className='cr_quiz_question_titles'>Add Cover image <span style={{ fontSize: "14px", color: "gray" }}>(optional)</span></p>
                    <div {...getRootPropsSecond()} className='dragNdrop'>
                      <input {...getInputPropsSecond()} />
                      {
                        isDragActive ?
                          <></>
                          :
                          quizData.mainImg !== undefined
                            ? <DroppedImage img={quizData.mainImg} />
                            : <DragNdropComponent />
                      }
                    </div>
                  </div>
                </>
                :
                <QuizMainCard img={quizData.mainImg} title={quizData.mainTitle} clearTitleAndCover={clearTitleAndCover} />
            }

            {
              quizData.mainTitle !== "" && !isTitleCover &&
              <div style={{ margin: "0 auto", display: "flex", gap: "26px" }}>
                {quizData.mainImg ? <span onClick={deteleCoverImage}><ButtonOutlined text='Delete image' link={''} /></span> : <ButtonOutlined text='Delete image' faded={true} link={''} />}
                <span onClick={addCoverAndTitle}><ButtonFIlled text={'Add cover and title'} link={''} /></span>
              </div>

            }
          </div>

          {/* quiz answers and questions */}
          <div className={showQuizTable ? "cr_quiz_table" : "cr_quiz_table displayNone"}>
            {/* question section */}
            <div className='cr_quiz_question'>
              <p>{selectedLanguage.createQuiz_page.questionNum} {quizData?.questions.length}/{quizData?.questions.length}</p>

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
              <p>{selectedLanguage.createQuiz_page.addImage} <span style={{ fontSize: "12px", color: "gray" }}>(optional)</span></p>
              <div {...getRootProps()} className='dragNdrop'>
                <input {...getInputProps()} />
                {
                  singleQuiz.questionImg
                    ? <DroppedImage img={singleQuiz.questionImg} />
                    : (
                      isDragActive
                        ? <></>
                        : <DragNdropComponent />

                    )
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
            <div className={quizData?.questions.length > 0 ? "mapping_quizData" : "mapping_quizData hidden"}>
              <div className='mapping_quizData_inner' ref={itemsRef} onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}>
                {quizData?.questions?.length > 0 &&
                  quizData.questions.slice().reverse().map((item, index) => (
                    <QuizCard
                      key={index}
                      index={quizData.questions.length - index}
                      length={quizData.questions.length}
                      title={item.questionText}
                      image={item.questionImg}
                      answ1={item.answer1}
                      answ2={item.answer2}
                      answ3={item.answer3}
                      answ4={item.answer4}
                      editCallBack={() => getQuizForEdit(index)}
                      deleteCallback={() => removeQuizCard(index)}
                    />
                  ))}


                {
                  quizData?.questions.length > 0
                  && <div className='apply_reset_btns' style={{ transform: `translateX(calc(${screenWidth / 2}px - ${pRigth}px))` }}>
                    <span onClick={handleSubmit}><ButtonFIlled text={selectedLanguage.createQuiz_page.saveBtn} link={''} /></span>
                    <span onClick={startOver}><ButtonOutlined text={selectedLanguage.createQuiz_page.deleteBtn} link={''} /></span>
                  </div>
                }
              </div>
            </div>


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
  //eslint-disable-next-line
  image: any;
  answ1: string;
  answ2: string;
  answ3: string;
  answ4: string;
  editCallBack: MouseEventHandler<HTMLDivElement> | undefined;
  deleteCallback: MouseEventHandler<HTMLDivElement> | undefined;
}

const QuizCard: React.FC<QuizCardProps> = ({
  index,
  length,
  editCallBack,
  deleteCallback,
  title,
  image,
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


      <div className='cr_quiz_length_answers'>
        <p className='answers_length'>{selectedLanguage.createQuiz_page.questionNum} {index}/{length}</p>

        {/* quiz question image */}
        {
          image
            ? <img src={URL.createObjectURL(image)} className='cr_quiz_card_cover' alt='quiz card cover' />
            : noQuizImage
        }

      </div>

      <p className='cr_quiz_card_title'>{title.length > 34 ? title.substring(0, 34) + '...' : title}</p>
    </div>
  )
}

//quiz mainCard
interface QuizMainCardProps {
  //eslint-disable-next-line
  img: any;
  title: string;
  clearTitleAndCover: () => void
}
const QuizMainCard: React.FC<QuizMainCardProps> = ({ img, title, clearTitleAndCover }) => {
  const { user } = useUserHook()

  return (
    <div className='quizMainCard'>
      <div className='smallXicon' onClick={clearTitleAndCover}>{smallXicon}</div>
      <img src={img ? URL.createObjectURL(img) : quicDefaultCover} className='quizMainCard_cover' />

      <div className='quizMainCard_bottom'>
        <Author avatar={user.avatar} />
        <p>{user.name}</p>
      </div>
      <p className='quizMainCard_bottom_title'>{title}</p>
    </div>
  )
}

//uploaded image or cover
interface droppedImageProps {
  //eslint-disable-next-line
  img: any;
}
const DroppedImage: React.FC<droppedImageProps> = ({ img }) => {
  return (
    <img src={img ? URL.createObjectURL(img) : ""} alt='quiz card cover' className='quzic_acrd_img_in_dropZone' />
  )
}

//drga and drop component's body
const DragNdropComponent = () => {
  const { selectedLanguage } = useLanguage()
  return (
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
  )
}