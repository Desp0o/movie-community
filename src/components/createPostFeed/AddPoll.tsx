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
import { setSpinnerState } from "../../Redux/spinnerSlicer";
import { toast } from "react-toastify";
import { closePoll } from "../../assets/svg/closePoll";
import { useRefetchHook } from "../../hooks/useFeedRefetch";
import { setFeedRefetch } from "../../Redux/feedRefetchSlicer";

const AddPoll = () => {
  const token = localStorage.getItem("token");
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const optionsContainerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();
  const { useFeedRefetch } = useRefetchHook()
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
    document.body.style.overflow='auto'

    setDivLength(true)
    setPollOptions(["" ,""])
  };

  const addOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  //eslint-disable-next-line
  const updateOption = (index:number, value: any) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);    
  };

  const removeOption = (index: number) => {
    const newOptions = pollOptions.filter((_, i) => i !== index);
    setPollOptions(newOptions);
  };

  const sendPoll = async () => {

    if(pollOptions[0] === '' && pollOptions[1] === '' && pollQuestion.length < 4){
      toast.error("Fill all fields", { autoClose: 3000, theme: "colored" })
    }else{
      dispatch(setSpinnerState(true))
      try {
        await axios.post(
          import.meta.env.VITE_POLL_ADD,
          {
            text: pollQuestion,
            pollAnswers: pollOptions,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        closeDefaultPostAddModal()
        dispatch(setFeedRefetch(!useFeedRefetch))
      } catch (error) {
        console.error(error);      
      }finally{
        dispatch(setSpinnerState(false))
      }
    }    
  };

  useEffect(()=>{
    if(optionsContainerRef.current && optionsContainerRef.current?.children.length >= 20){
      setDivLength(false)
    }
  },[optionsContainerRef.current?.children.length, divLength])

  useEffect(()=>{
    if(textAreaRef.current){
      textAreaRef.current.style.height = '72px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  },[pollQuestion])

  return (
    addPostModalStates.pollPost && (
      <div style={{ width: "100%" }}>
        <BackDrop funcName={closeDefaultPostAddModal} />
        <div className="AddPostPopUp_parent">
        <div className="AddPostPopUp">
          <CreateTitle title={"Create poll"} funcName={closeDefaultPostAddModal} />

          <div className="quiz_quest_title">
            <p className="your_question">Your question</p>
            <div className="quiz_txtArea_container">
              <span className="quizImgAddIcon">{smileIcon}</span>
              <textarea
                ref={textAreaRef}
                placeholder="Write a question"
                className="question_textarea"
                onChange={(e) => setPollQuestion(e.target.value)}
              />
            </div>
          </div>

          <div className="quiz_answ_block">
            <p className="Correct_answer">Options</p>

            <div className="options_container" ref={optionsContainerRef}>
              {pollOptions.map((option, index) => (
                <div className="poll_single_input" key={index}>
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

                  {index > 1 && (
                    <span className="remove_option" onClick={() => removeOption(index)}>
                      {closePoll}  {/* Add the close icon here */}
                    </span>
                  )}
                </div>
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
      </div>
    )
  );
};

export default AddPoll;
