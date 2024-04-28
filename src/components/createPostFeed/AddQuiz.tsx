import { useDispatch } from "react-redux";
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook";
import CreateTitle from "./addPostComps/CreateTitle";
import { setAddPostModal } from "../../Redux/postModal";
import BackDrop from "../backDrop/BackDrop";
import InputComponent from "../inputComponent/InputComponent";
import LoginModalBtn from "../login/LoginModalBtn";
import { useRef, useState } from "react";
import axios from "axios";
import { quizImgAddIcon } from "../../assets/svg/quizImgAddIcon";
import ReactPlayer from "react-player";

const AddQuiz = () => {
  const token = localStorage.getItem("token");
  const { addPostModalStates } = usePostAddModalHook();
  const dispatch = useDispatch();
  const quizFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<{
    file: File | undefined;
    question: string;
    geoAnswer: string;
    engAnswer: string;
    }>({
    file: undefined,
    question: "",
    geoAnswer: "",
    engAnswer: "",
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
    setQuizAnswers({...quizAnswers, file: file})
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

  return (
    addPostModalStates.quizPost && (
      <div style={{ width: "100%" }}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp">
          <CreateTitle
            title={"Create quiz"}
            funcName={closeDefaultPostAddModal}
          />

          <div className="quiz_quest_title">
            <p className="your_question">Your question</p>
            <div className="quiz_txtArea_container">
              <span className="quizImgAddIcon" onClick={openFileUploadWindow}>
                {quizImgAddIcon}
              </span>
              <textarea
                className="question_textarea"
                onChange={(e) =>
                  setQuizAnswers({ ...quizAnswers, question: e.target.value })
                }
              />
            </div>
          </div>

          <div className="quiz_answers"></div>

          <div className="quiz_answ_block">
            <p className="Correct_answer">Correct answer</p>
            <p className="answer_desc">
              Please enter the correct answer in Georgian and English language
            </p>

            <div className="quiz_answer_inputs">
              <InputComponent
                type={"text"}
                autoComplete={""}
                placeholder={"Georgian"}
                value={quizAnswers.geoAnswer}
                isError={false}
                widthProp="100%"
                onChange={(e) =>
                  setQuizAnswers({ ...quizAnswers, geoAnswer: e.target.value })
                }
              />

              <InputComponent
                type={"text"}
                autoComplete={""}
                placeholder={"Eglish"}
                value={quizAnswers.engAnswer}
                isError={false}
                widthProp="100%"
                onChange={(e) =>
                  setQuizAnswers({ ...quizAnswers, engAnswer: e.target.value })
                }
              />
            </div>

            <div className="uploaded_image_quiz_container">
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  className="uploaded_image_addPost"
                  alt="quiz img"
                />
              )}
              {uploadedVideo && (
                <ReactPlayer
                  className="video_popupPorst_add"
                  url={`${uploadedVideo}`}
                  muted={true}
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                        playsInline: true,
                      },
                    },
                  }}
                />
              )}
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
      </div>
    )
  );
};

export default AddQuiz;
