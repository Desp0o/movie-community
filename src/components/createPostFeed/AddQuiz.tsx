import { useDispatch } from "react-redux";
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook";
import CreateTitle from "./addPostComps/CreateTitle";
import { setAddPostModal } from "../../Redux/postModal";
import BackDrop from "../backDrop/BackDrop";
import InputComponent from "../inputComponent/InputComponent";
import LoginModalBtn from "../login/LoginModalBtn";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { quizImgAddIcon } from "../../assets/svg/quizImgAddIcon";
import ReactPlayer from "react-player";
import { xIcon } from "../../assets/svg/Xicon";
import limitedIMG from "../../assets/limited.webp"
import { movieDataBase } from "./functions/fetchDB";
import { dropDownArrow } from "../../assets/svg/dropDownArrow";
import { useRefetchHook } from "../../hooks/useFeedRefetch";
import { setFeedRefetch } from "../../Redux/feedRefetchSlicer";

interface fetchedDataBaseProps {
    id: number;
    eng: string;
    poster: string;
  }


const AddQuiz = () => {
  const { requestMovieDB } =movieDataBase()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const areaContainerRef = useRef<HTMLDivElement>(null)
  const { addPostModalStates } = usePostAddModalHook();
  const dispatch = useDispatch();
  const quizFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const { useFeedRefetch } = useRefetchHook()
  const [uploadedVideo, setUploadedVideo] = useState("");
  const [fetchedMovieDb, setFetchedMovieDb] = useState([])
  const [newMovie, setNewMovie] = useState('') //ფილმების ბაზის ფეჩინგის შესამომწებლად
  const [stopFunc, setStopFunc] = useState(false)
  const [selectedValue, setSelectedValue] = useState('Choose Question')
  const [quizAnswers, setQuizAnswers] = useState<{
    img: File | undefined;
    question: string;
    answer: string;
    type: string;
  }>({
    img: undefined,
    type: "12",
    question: "",
    answer: "",
  });


  const closeDefaultPostAddModal = () => {
    dispatch(
      setAddPostModal({
        defaultPost: false,
        pollPost: false,
        quizPost: false,
        openImageUpload: false,
        showPostButtons: true,
      })
    );

  document.body.style.overflow='auto'
  };

  const openFileUploadWindow = () => {
    quizFileInputRef.current?.click();
  };

  const handleQuizFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setQuizAnswers({ ...quizAnswers, img: file });
    if (file) {
      if (file.type.includes("image")) {
        setUploadedImage(URL.createObjectURL(file));
        setUploadedVideo("");
      }

      if (file.type.includes("video")) {
        setUploadedVideo(URL.createObjectURL(file));
        setUploadedImage("");
      }
    }
  };

  const clearMedia = () => {
    setUploadedImage("");
    setUploadedVideo("");
    setQuizAnswers({ ...quizAnswers, img: undefined, answer: '', question: '' });
    if (quizFileInputRef.current) {
      quizFileInputRef.current.value = ""; // Reset the file input value
    }
  };

  useEffect(()=>{
    if(textAreaRef.current){
      textAreaRef.current.style.height = '72px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  },[quizAnswers.question])

  useEffect(()=>{
    if(textAreaRef.current){
      if(uploadedImage || uploadedVideo){
        textAreaRef.current.style.height = '32px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }else{
        textAreaRef.current.style.height = '72px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }

      if(areaContainerRef.current){
        if(uploadedImage || uploadedVideo){
          areaContainerRef.current.style.paddingBottom = '12px'
        }else{
          areaContainerRef.current.style.paddingBottom = '0px'
        }
      }
    }
  },[uploadedImage, uploadedVideo, quizAnswers.question])

  useEffect(()=>{  
    if(quizAnswers.answer.length > 0 && !stopFunc){
      //დაიმპორტებული ფუქნცია
      requestMovieDB(setFetchedMovieDb, quizAnswers.answer)
    }
      
  },[quizAnswers.answer, stopFunc])


  useEffect(()=>{  
    if(quizAnswers.answer !== newMovie){
      setStopFunc(false)
    }
      
    if(quizAnswers.answer.length < 1){
      setQuizAnswers({...quizAnswers, answer: ''})
      setNewMovie('')
      setStopFunc(true)
    }
  },[quizAnswers.answer])

  //ფილმების ბაზიდან ფილმების არჩევა და მოქმედებები
  const chooseMovieName = (movieName: string) => {
    setQuizAnswers({...quizAnswers, answer: movieName})
    setFetchedMovieDb([])
    setStopFunc(true)
    setNewMovie(movieName)
  }

  useEffect(()=>{
    if(quizAnswers.answer.length === 0){
      setFetchedMovieDb([])
    }
  },[quizAnswers.answer])


  const sendQuizQuestion = async () => {
    const token = localStorage.getItem('token')

    try {
      await axios.post(import.meta.env.VITE_QUESTION_ADD, quizAnswers,{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type":
          "multipart/form-data, application/json, text/plain, */*",
        }
      })
      dispatch(setFeedRefetch(!useFeedRefetch))
      closeDefaultPostAddModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDropDownValues = (event: any) => {
    setSelectedValue(event.target.textContent)
    // setQuizAnswers({...quizAnswers, question: selectedValue})
  }

  return (
    addPostModalStates.quizPost && (
      <div style={{ width: "100%" }}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp_parent">
          <div className="AddPostPopUp">
            <CreateTitle
              title={"Create quiz"}
              funcName={closeDefaultPostAddModal}
            />

            <div className="quiz_quest_title">

              <div className="dropdwon_seclect_question">
                <span className="selec_arrow">{dropDownArrow}</span>
                <p className="question_value">{selectedValue}</p>

                <div className="for_select">
                  <span onClick={(e) => handleDropDownValues(e)}>გამოიცანი ფილმი</span>
                  <span onClick={(e) => handleDropDownValues(e)}>გამოიცანი მსახიობი</span>
                  <span onClick={(e) => handleDropDownValues(e)}>შენი კითხვა</span>
                </div>
              </div>

              <p className="your_question">Your question</p>
              <div ref={areaContainerRef} className="quiz_txtArea_container">
                {uploadedImage === "" && uploadedVideo === "" && (
                  <span className="quizImgAddIcon" onClick={openFileUploadWindow}>
                    {quizImgAddIcon}
                  </span>
                )}
                <textarea
                  ref={textAreaRef}
                  className="question_textarea"
                  placeholder="Write a question"
                  onChange={(e) =>
                    setQuizAnswers({ ...quizAnswers, question: e.target.value })
                  }
                />

                {uploadedImage || uploadedVideo ? (
                  <div className="uploaded_image_quiz_container">
                    {uploadedImage && (
                      <>
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                          }}
                          className="quiz_media_close_icon"
                          onClick={clearMedia}
                        >
                          {xIcon}
                        </span>
                        <img
                          src={uploadedImage}
                          className="uploaded_image_addPost"
                          alt="quiz img"
                        />
                      </>
                    )}
                    {uploadedVideo && (
                      <>
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                          }}
                          className="quiz_media_close_icon"
                          onClick={clearMedia}
                        >
                          {xIcon}
                        </span>
                        <ReactPlayer
                          className="video_popupPorst_add"
                          url={`${uploadedVideo}`}
                          muted={true}
                          width="100%"
                          height=""
                          config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload",
                                playsInline: true,
                              },
                            },
                          }}
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="quiz_answ_block">
              <p className="Correct_answer">Correct answer</p>
              <p className="answer_desc">
                Please enter the correct answer in Georgian and English language
              </p>

              <div className="quiz_answer_inputs">
                <InputComponent
                  type={"text"}
                  placeholder={"Eglish"}
                  nameProp="quesionAnswer"
                  value={quizAnswers.answer}
                  isError={false}
                  widthProp="480px"
                  onChange={(e) =>
                    setQuizAnswers({...quizAnswers, answer: e.target.value})
                  }
                />

                
              </div>
            </div>

            <div className="quiz_btn_block">
              <LoginModalBtn title={"Post"} funName={sendQuizQuestion} btnWidth="100%" />
            </div>

            <input
              type="file"
              style={{ display: "none" }}
              ref={quizFileInputRef}
              onChange={handleQuizFileChange}
            />
          </div>

          {
            fetchedMovieDb.length !== 0 ?
            <div className="move_db_dropdown">
            {fetchedMovieDb?.map((movie:fetchedDataBaseProps)=>{
              return(
                <div className="dropdown_item" key={movie.id} onClick={()=> chooseMovieName(movie.eng)}>
                  <img src={limitedIMG} alt="/" className="movie_dropdown_image" />
                  <p>{movie.eng}</p>
                </div>
              )
            })}       
          </div>
          :<></>
          }

        </div>
      </div>
    )
  );
};

export default AddQuiz;
