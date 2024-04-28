import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../Redux/postModal";
import BackDrop from "../backDrop/BackDrop";
import LoginModalBtn from "../login/LoginModalBtn";
import CreateTitle from "./addPostComps/CreateTitle";
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook";
import { useState } from "react";
import { smileIcon } from "../../assets/svg/smileIcon";
import axios from "axios";
import { optionsAddIcon } from "../../assets/svg/optionsAddIcon";

const AddPoll = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
  const { addPostModalStates } = usePostAddModalHook();
  const [pollQuestion, setPollQuestion] = useState('')

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

  const sendPoll = async () => {
    try {
        const response =  await axios.post('', pollQuestion, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data);
        
    } catch (error) {
        console.error(error)
    }
  }

    return (
        addPostModalStates.pollPost && (
          <div style={{ width: "100%" }}>
            <BackDrop funcName={closeDefaultPostAddModal} />
            <div className="AddPostPopUp">
              <CreateTitle
                title={"Create poll"}
                funcName={closeDefaultPostAddModal}
              />
    
              <div className="quiz_quest_title">
                <p className="your_question">Your question</p>
                <div className="quiz_txtArea_container">
                  <span className="quizImgAddIcon">
                    {smileIcon}
                  </span>
                  <textarea
                    className="question_textarea"
                    onChange={(e) =>
                        setPollQuestion(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="quiz_answ_block">
            <p className="Correct_answer">Options</p>

            <div className="options_poll">
            <div className="add_option">
                {optionsAddIcon}
                <p>Add option</p>
            </div>
          </div>
          </div>

          

    
              <div className="quiz_btn_block">
                <LoginModalBtn title={"Post"} funName={sendPoll} btnWidth="100%" />
              </div>
    
              
            </div>
          </div>
        )
      );
}

export default AddPoll