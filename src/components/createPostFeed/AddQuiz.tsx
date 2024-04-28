import { useDispatch } from "react-redux";
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook";
import CreateTitle from "./addPostComps/CreateTitle";
import { setAddPostModal } from "../../Redux/postModal";
import BackDrop from "../backDrop/BackDrop";
import InputComponent from "../inputComponent/InputComponent";
import LoginModalBtn from "../login/LoginModalBtn";

const AddQuiz = () => {
  const { addPostModalStates } = usePostAddModalHook();
  const dispatch = useDispatch();

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
            <textarea className="question_textarea" />
          </div>

          <div className="quiz_answers">

          </div>

          <div className="quiz_answ_block">
            <p className="Correct_answer">Correct answer</p>
            <p className="answer_desc">Please enter the correct answer in Georgian and English language</p>

            <div className="quiz_answer_inputs">
                <InputComponent type={"text"} autoComplete={""} placeholder={"Georgian"} value={""} isError={false} widthProp="100%"/>
                <InputComponent type={"text"} autoComplete={""} placeholder={"Eglish"} value={""} isError={false} widthProp="100%"/>
            </div>
          </div>

          <div className="quiz_btn_block">
            <LoginModalBtn title={"Post"} funName={''} btnWidth="100%"/>
          </div>
       
        </div>
      </div>
    )
  );
};

export default AddQuiz;
