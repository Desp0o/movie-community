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

interface fetchedDataBaseProps {
    id: number;
    eng: string;
    poster: string;
  }


const AddQuiz = () => {
  const token = localStorage.getItem("token");
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const areaContainerRef = useRef<HTMLDivElement>(null)
  const { addPostModalStates } = usePostAddModalHook();
  const dispatch = useDispatch();
  const quizFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState("");
  const [movie, setMovie] = useState('')
  const [fetchedMovieDb, setFetchedMovieDb] = useState([])
  const [newMovie, setNewMovie] = useState('')
  const [stopFunc, setStopFunc] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{
    file: File | undefined;
    question: string;
    movie: string;
  }>({
    file: undefined,
    question: "",
    movie: "",
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

  const sendQuiz = async () => {
    try {
      const response = await axios.post("", quizAnswers, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data, application/json, text/plain, */*",
        },
      });
      console.log(response?.data);
    } catch (error) {
      console.error(error);
      console.log(quizAnswers);
    }
  };

  const openFileUploadWindow = () => {
    quizFileInputRef.current?.click();
  };

  const handleQuizFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setQuizAnswers({ ...quizAnswers, file: file });
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
    setQuizAnswers({ ...quizAnswers, file: undefined });
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

  const requestMovieDB = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post('https://api.pinky.ge/api/movieDB', {movie:movie}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      setFetchedMovieDb(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{  
    if(movie.length > 0 && !stopFunc){
      requestMovieDB()
    }
      
  },[movie, stopFunc])


  useEffect(()=>{  
    if(movie !== newMovie){
      setStopFunc(false)
    }
      
    if(movie.length < 1){
      setMovie('')
      setNewMovie('')
      setStopFunc(true)
    }
  },[movie])

  const chooseMovieName = (movieName: string) => {
    setMovie(movieName)
    setFetchedMovieDb([])
    setStopFunc(true)
    setNewMovie(movieName)
  }

  useEffect(()=>{
    console.log(fetchedMovieDb);
    
  },[fetchedMovieDb])

  useEffect(()=>{
    if(movie.length === 0){
      setFetchedMovieDb([])
    }
  },[movie])

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
                  nameProp="EnglishAnswer"
                  value={movie}
                  isError={false}
                  widthProp="480px"
                  onChange={(e) =>
                    setMovie(e.target.value)
                  }
                />

                
              </div>
            </div>

            <div className="quiz_btn_block">
              <LoginModalBtn title={"Post"} funName={sendQuiz} btnWidth="100%" />
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
