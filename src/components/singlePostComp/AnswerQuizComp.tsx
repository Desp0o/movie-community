import React, { useState } from "react";
import InputComponent from "../inputComponent/InputComponent";
import axios from "axios";

interface AnswerQuizCompProps{
  id: number;
}

const AnswerQuizComp:React.FC<AnswerQuizCompProps> = ({id}) => {
  const [answerValue, setAnswerValue] = useState("");

  const sendAnswer = async () => {
    const token = localStorage.getItem('token')

    try {
      const response =  await axios.post(`${import.meta.env.VITE_SEND_ANSWER}${id}`, {answer: answerValue}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="quiz_answer_input_container">
      <InputComponent
      nameProp="correctAnswerquiz"
        widthProp={window.innerWidth > 430 ? "538px" : "280px"}
        heightProp={"44px"}
        type={"text"}
        placeholder={"Enter the correct answer"}
        value={answerValue}
        isError={false}
        onChange={(e) => setAnswerValue(e.target.value)}
      />

      <div className="post_quiz_answer_text" onClick={sendAnswer}>
        <p>Post</p>
      </div>
    </div>
  );
};

export default AnswerQuizComp;
