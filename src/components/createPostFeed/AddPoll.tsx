import { useDispatch } from "react-redux";
import { setAddPostModal } from "../../Redux/postModal";
import LoginModalBtn from "../login/LoginModalBtn";
import CreateTitle from "./addPostComps/CreateTitle";
import { usePostAddModalHook } from "../../hooks/usePostAddModalHook";
import { useEffect, useRef, useState } from "react";
import { smileIcon } from "../../assets/svg/smileIcon";
import axios from "axios";
import { optionsAddIcon } from "../../assets/svg/optionsAddIcon";
import InputComponent from "../inputComponent/InputComponent";
import BackDrop from "../backDrop/BackDrop";

const AddPoll = () => {
  const token = localStorage.getItem("token");
  const optionsContainerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();
  const { addPostModalStates } = usePostAddModalHook();
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [divLength, setDivLength] = useState(true)

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

    setDivLength(true)
    setPollOptions(["" ,""])
  };

  const addOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const updateOption = (index:number, value: any) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);    
  };


  const sendPoll = async () => {
    try {
      const response = await axios.post(
        "/api/polls",
        {
          question: pollQuestion,
          options: pollOptions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);      
    }
  };

  useEffect(()=>{
    if(optionsContainerRef.current && optionsContainerRef.current?.children.length >= 4){
      setDivLength(false)
    }
  },[optionsContainerRef.current?.children.length, divLength])

  return (
    addPostModalStates.pollPost && (
      <div style={{ width: "100%" }}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp">
          <CreateTitle title={"Create poll"} funcName={closeDefaultPostAddModal} />

          <div className="quiz_quest_title">
            <p className="your_question">Your question</p>
            <div className="quiz_txtArea_container">
              <span className="quizImgAddIcon">{smileIcon}</span>
              <textarea
                className="question_textarea"
                onChange={(e) => setPollQuestion(e.target.value)}
              />
            </div>
          </div>

          <div className="quiz_answ_block">
            <p className="Correct_answer">Options</p>

            <div className="options_container" ref={optionsContainerRef}>
              {pollOptions.map((option, index) => (
                <InputComponent
                  key={index}
                  type={"text"}
                  placeholder={"Option " + (index + 1)}
                  value={option}
                  isError={false}
                  widthProp="100%"
                  onChange={(e) => updateOption(index, e.target.value)} 
                  nameProp={`option${index+1}`}                
                  />
              ))}
            </div>

              {divLength && <div className="add_option" onClick={addOption}>
                {optionsAddIcon}
                <p>Add option</p>
              </div>}
              
          </div>

          <div className="quiz_btn_block">
            <LoginModalBtn title={"Post"} funName={sendPoll} btnWidth="100%" />
          </div>
        </div>
      </div>
    )
  );
};

export default AddPoll;
